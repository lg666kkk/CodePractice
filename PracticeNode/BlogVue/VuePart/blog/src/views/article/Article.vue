<template>
  <div>
    <side-bar></side-bar>
    <div id="content">
      <div class="article_wrap" v-for="(item, key) in articleList" :key="key">
        <div class="article_title" @click="articleDetail( item._id )">{{ item.title }}</div>
        <div class="article_info">
          <span class="article_info_date">发表于:{{ item.date }}</span>
          <span class="article_info_label">标签:
          <span v-if="item.labels.length === 0">未分类</span>
          <el-tag v-else size="mini" class="tag_margin" type="primary" v-for="(tag, key) in item.labels" :key="key">{{ tag }}</el-tag>
          </span>
        </div>
        <div class="article_gist">{{ item.gist }}</div>
        <div @click="articleDetail( item._id )" class="article_button article_all">阅读全文 ></div>
        <div class="article_underline"></div>
      </div>
    </div>
    <side-bar-right></side-bar-right>
    <footer></footer>
  </div>
</template>

<script>
  import { request } from 'network/request'
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
          //console.log(res);
        })
      },
      methods: {
        articleDetail(id) {
          this.$router.push('/articleDetail/'+id)
        }
      }
  }
</script>

<style scoped>
  @import '../../assets/css/article.css';
</style>
