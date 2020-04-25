<template>
  <div>
    <div class="black_line"></div>
    <side-bar></side-bar>
    <div id="content">
      <div class="article_wrap" v-for="(item, key) in articleList" :key="key">
        <div class="article_title" @click="articleDetail( item._id )">{{ item.title }}</div>
        <div class="article_info">
          <span class="article_info_date">发表于:{{ item.date }}</span>
          <span class="article_info_label">标签:
          <span v-if="item.labels.length === 0">未分类</span>
          <el-tag v-else size="mini" class="tag_margin" type="primary" v-for="(tag, key) in item.labels" :key="key">{{ tag }}</el-tag>
          <span class="el-icon-view views"></span>
          <span>{{ item.views }}</span>
          </span>
        </div>
        <div class="article_gist">{{ item.gist }}</div>
        <div @click="articleDetail( item._id, item.views )" class="article_button article_all">阅读全文 ></div>
        <div class="article_underline"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { request } from 'network/request'
  import qs from 'qs'
  import SideBar from '../common/SideBar'
  export default {
      name:'Article',
      components: {
        SideBar,
      },
      data() {
        return {
          articleList: []
        }
      },
      mounted() {
        request({
          method: "get",
          url: "/api/articleList"
        })
        .then(res => {
          this.articleList = res.data.reverse()
          console.log(res);
        })
      },
      methods: {
        articleDetail(id, views) {
          let view = views+1
          let data = {
            id: id,
            views: view
          }
          console.log(view);
          data = qs.stringify(data)
          request({
            method: 'post',
            url:'/api/admin/updateRead',
            data,
            headers:{'Content-Type':'application/x-www-form-urlencoded'}
          })
          .then((data) => {
            this.$router.push('/articleDetail/'+id)
          })
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
  }
  .views {
    margin-left: 5px;
    margin-right: 4px;
  }
</style>
