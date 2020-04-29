<template>
  <div>
    <div class="black_line"></div>
    <side-bar></side-bar>
    <div id="content">
      <div class="article_wrap" v-for="(item, key) in  articleList" :key="key">
        <div class="article_title" @click="Click( item._id )">{{ item.title }}</div>
        <div class="article_info">
          <span class="article_info_date">发表于: {{ item.date }}</span>
          <span class="article_info_tag">标签:</span>
          <span v-if="item.labels.length === 0">未分类</span>
          <el-tag v-else size="mini" v-for="(tag, key) in item.labels" :key="key">{{ tag }} </el-tag>
        </div>
        <div class="article_gist">
          {{ item.gist }}
        </div>
        <div class="article_button article_all" @click="updateArticle( item._id )">修改 ></div>
        <div class="article_button article_all" @click="deleteArticle( item._id )">删除 ></div>
        <div class="article_underline"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { request } from 'network/request'
  import qs from 'qs'
  import SideBar from 'components/common/SideBar'
  export default {
      name:'ArticleList',
      components: {
        SideBar
      },
      data() {
        return {
          articleList: []
        }
      },
      mounted() {
        let self = this
        request({
          method: 'get',
          url: '/api/articleList'
        })
        .then(res => {
          res.data.forEach(function (item, index) {
            self.articleList.unshift(item)
          })
        })
      },
      methods: {
        Click(id) {
          this.$router.push(`/articleDetail/${id}`)
        },
        updateArticle(id) {
          this.$router.push('/admin/articleEdit/'+ id)
        },
        deleteArticle(id) {
          let self = this
          let data_id = {
            _id: id
          }
          let data = qs.stringify(data_id) 
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            request({
              method: 'post',
              url : '/api/admin/deleteArticle',
              data,
              headers:{'Content-Type':'application/x-www-form-urlencoded'}
            }).then(res => {
              self.$message({
                type: 'success',
                message: '删除成功!'
              })
              self.fetchData()
            })
          }).catch((error) => {
            self.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
        },
        // 更新数据
        fetchData: function () {
          request({
            method: 'get',
            url: '/api/articleList'
          }).then(
            response => this.articleList = response.data.reverse(),
            response => console.log(response)
          )
        }
      }
  }
</script>

<style scoped>
  @import '../../assets/css/article.css';
  #content {
    height: 536px;
    overflow: hidden;
    overflow-y: scroll;
    text-align: center;
    background-color: blue;
  }
</style>
