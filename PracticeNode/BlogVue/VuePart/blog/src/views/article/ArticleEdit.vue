<template>
  <div class="edit">
    <div class="return_button">
      <el-button size="medium" icon="el-icon-back" @click="goBack">返回</el-button>
    </div>
    <div class="edit_head">
      <h3>标题</h3>
    </div>
    <el-input v-model="title" placeholder="请输入标题"></el-input>
    <div class="edit_tag">
      <span>
        <h3>标签：</h3>
      </span>
      <el-tag
        :key="tag"
        v-for="tag in labels"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)">
        {{tag}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm">
      </el-input>
      <span v-else>
        <el-tooltip class="item" effect="dark" content="标签重复将导致博客发表失败" placement="top">
          <el-button class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </el-tooltip>
      </span>
      
    </div>
    <div class="edit_introduce">
      <h3>简介</h3>
    </div>
    <el-input
      type="textarea"
      :rows="4"
      placeholder="请输入博文简介"
      v-model="gist">
    </el-input>
    
    <div class="edit_content">
      <h3>内容 (Markdown编辑器)</h3>
    </div>
    <div class="markdown">
      <div class="markdown_menu">
          <el-tooltip class="item" effect="dark" content="预览模式" placement="top-end">
            <span class="el-icon-view" @click="previewClick"></span>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="编辑模式" placement="left">
            <span class="el-icon-edit" @click="editClick"></span>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分栏模式" placement="bottom-end">
            <span class="el-icon-reading" @click="subfieldClick"></span>
          </el-tooltip>
      </div>
      <textarea class="markdown_input" v-model="content" @input="update" :class="{editHidden: editHidden, editShow: editShow,subfieldEdit: subfieldEdit}"></textarea>
      <div class="markdown_compiled" :class="{fullScreeView:fullScreeView, subfieldView: subfieldView}" v-html="compiledMarkdown()"></div>
      <div class="clear"></div>
    </div>
    <div class="save_button">
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import marked from 'marked'
  import hightlight from 'highlight.js'
  import 'highlight.js/styles/atom-one-light.css'
  
  import {request} from 'network/request'

  marked.setOptions({
    hightlight: function (code) {
      return hightlight.hightlightAuto(code).value
    }
  })
  export default {
      name:'ArticleEdit',
      data(){
        return {
          title: "",
          gist: '',
          content: "",
          data: '',
          labels: [],
          inputVisible: false,
          inputValue: '',
          fullScreeView: false,
          editHidden: false,
          subfieldView: false,
          subfieldEdit: false,
          editShow: false
        }
      },
      mounted() {
        if (this.$route.params.id) {
          request({
            method: 'get',
            url: `/api/articleDetail/${this.$route.params.id}`
          })
          .then(res => {
            let article = res.body
            this.title = article.title
            this.date = article.date
            this.content = article.content
            this.gist = article.gist
            this.labels = article.labels
          })
        }
      },

      methods: {
        // 编译Markdown
        compiledMarkdown: function () {
          return marked(this.content, {sanitize: true})
        },
        // 延时赋值给content
        update: _.debounce(function (e) {
          this.content = e.target.value
        }, 300),
        // 获取发表时间
        getDate: function () {
          let mydate, y, m, d, hh, mm, ss;
          mydate = new Date()
          y = mydate.getFullYear()
          m = mydate.getMonth()+1
          d = mydate.getDate()
          hh = mydate.getHours()
          mm = mydate.getMinutes()
          ss = mydate.getSeconds()
          if (m < 10) m = '0' + m
          if (d < 10) d = '0' + d
          if (hh < 10) hh = '0' + hh
          if (mm < 10) mm = '0' + mm
          if (ss < 10) ss = '0' + ss
          this.date = y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
        },
        save () {
          let self = this
          if (this.title.length === 0) {
            this.$notify({
              title: '警告',
              message: '标题不能为空',
              type: 'warning',
            });
          }else if (this.labels.length === 0) {
            this.$notify({
              title: "警告",
              message: "标签不能为空",
              type: "warning",
              offset: 100
            })
            
          } else if (this.gist.length === 0) {
            this.$notify({
              title: "警告",
              message: "简介不能为空",
              type: "warning",
              offset: 100
            })
          } else if (this.content.length === 0) {
            this.$notify({
              title: '警告',
              message: '内容不能为空',
              type: 'warning',
              offset: 100
            })
          } else if (this.$route.params.id) {
            // 若id存在则更新文章
            //console.log(this.labels);
            let data = {
              _id: this.$route.params.id,
              title: this.title,
              date: this.date,
              gist: this.gist,
              content: this.content,
              labels: this.labels
            }
            request({
              method: 'post',
              url: '/api/admin/updateArticle',
              data,
              params
            })
            .then(res => {
              self.$message({
                message: "文章更新成功",
                type: "success"
              })
            })
            // 更新完跳转至详情页
            self.$router.push('/articleDetail/' + self.$route.params.id)
          } else {
            // 新建文章
            console.log(this.labels);
            this.getDate()
            let data = {
              title: this.title,
              date: this.date,
              gist: this.gist,
              content: this.content,
              labels: this.labels
            }
            request({
              method: 'post',
              url: '/api/admin/saveArticle',
              data
            })
            .then(res => {
              self.$message({
                message: '文章发表成功',
                type: "success"
              })
            })
            self.$router.push('/articleList')
          }
        },
        goBack: function () {
          this.$router.go(-1)
        },
        previewClick() {
          this.editHidden = true
          this.fullScreeView = true
          this.subfieldView = false
          this.subfieldEdit = false
          this.editShow = false
        },
        subfieldClick() {
          this.subfieldView = true
          this.subfieldEdit = true
          this.editHidden = false
          this.fullScreeView = false
          this.editShow = false
        },
        editClick() {
          this.editShow = true
          this.editHidden = false
          this.fullScreeView = false
          this.subfieldView = false
          this.subfieldEdit = false
        },
        // 标签相关方法
        handleClose(tag) {
          this.labels.splice(this.labels.indexOf(tag), 1);
        },
        showInput() {
          this.inputVisible = true;
          this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
          });
        },
        handleInputConfirm() {
          let inputValue = this.inputValue;
          if (inputValue) {
              this.labels.push(inputValue);
          }
          this.inputVisible = false;
          this.inputValue = '';
        }
      }
  }
</script>

<style scoped>
  @import '../../assets/css/articleEdit.css';
</style>
