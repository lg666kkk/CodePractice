<template>
  <div id="articleDetail">
    <side-bar></side-bar>
    <div id="content">
      <div class="article_warp">
        <div class="article_title article_detail_title">{{ article.title }}</div>
        <div class="article_info">
          <span class="article_info_date">发表于: {{ article.date }}</span>
          <span class="article_info_label">标签:</span>
          <span v-if ="Length">未分类</span>
          <el-tag v-else size="mini" class="tag_margin" v-for="(tag, key) in article.labels" :key="key">{{ tag }}</el-tag>
        </div>
        <div class="article_content" v-html="compiledMarkdown()" v-highlight></div>
      </div>
    </div>
  </div>
</template>

<script>
  import SideBar from 'views/common/SideBar';
  import { request } from 'network/request';
  import marked from 'marked';
  import hightlight from 'highlight.js';
  import 'highlight.js/styles/atom-one-dark.css';
  // import javascript from 'highlight.js/lib/languages/javascript'
  // import 'highlight.js/styles/github.css'
  marked.setOptions({
    renderer: new marked.Renderer(),
    hightlight: function (code) {
      return hightlight.hightlightAuto(code).value
    },
    pedantic: false,
    gfm: true,
    tables: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
  })

  export default {
      name:'ArticleDetail',
      components: {
        SideBar
      },
      data () {
        return {
          article: {}
        }
      },
      created() {
        let id = this.$route.params.id
        request({
          method: 'get',
          url: `/api/articleDetail/${id}`
        })
        .then(res => {
          this.article = res.data
          this.article.content = marked(this.article.content || '')
        })
      },
      computed: {
        // 由于this.article.labels是一个对象，不能直接使用length方法
        Length() {
          for (let key in this.article.labels) {
            if (key) {
              return false
            }
            return true
          }
        }
      },
      methods: {
        compiledMarkdown: function () {
          return marked(this.article.content || '')
        }
      }
  }
</script>

<style scoped>
  @import '../../assets/css/article.css';
  .article_content {
    text-align: left;
    padding: 60px 0;
    margin-left: 340px;
    font-size: 18px;
    text-align: left;;
  }
  .article_detail_title {
    cursor: default;
    margin: 40px 0 0;
  }
</style>
