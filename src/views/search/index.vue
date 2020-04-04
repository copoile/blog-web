<!-- 标签页面 -->
<template>
  <div class="container">
    <app-header :nav-item-active="-1" />
    <div class="content-container">
      <!-- 左边 -->
      <div class="left-side">
        <div class="content-head">
          <p class="content-row"><span style="color: #00a4ff;">#</span>{{ keyword }}</p>
          <p class="content-row content-des">当前关键字搜索共计{{ total }}篇文章。</p>
        </div>
        <div />
        <div class="content-list">
          <article-list :list="artList" :loading="loading" />
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="size"
            :current-page="current"
            :total="total"
            :hide-on-single-page="true"
            @current-change="currentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/Header/index'
import ArticleList from '@/components/ArticleList'
import { pagePublishedArticle } from '@/api/article.js'
export default {
  name: 'Search',
  components: {
    AppHeader,
    ArticleList
  },
  data() {
    return {
      current: 1,
      size: 5,
      artList: [],
      total: 0,
      loading: false,
      keyword: ''
    }
  },

  watch: {
    $route(route) {
      this.keyword = route.query && route.query.keyword
      this.getArtList()
    }
  },

  mounted() {
    this.init()
  },

  methods: {

    init() {
      this.keyword = this.$route.query && this.$route.query.keyword
      this.getArtList()
    },

    // 分页监控
    currentChange(current) {
      this.current = current
      this.getArtList()
    },

    // 获取文章列表
    getArtList() {
      this.loading = true
      const params = {
        current: this.current,
        size: this.size,
        title: this.keyword
      }
      pagePublishedArticle(params).then(
        res => {
          this.total = res.data.total
          this.artList = res.data.records
          this.loading = false
        },
        error => {
          console.error(error)
          this.loading = false
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
   @import '~@/styles/variables';
   width: 100%;
   height: 100vh;
   overflow-x: hidden;
   overflow-y: -webkit-overlay;
   overflow-y: overlay;

  .content-container {
    max-width: 720px;
    margin: 0 auto;
    margin-top: 15px;
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;

    @media screen and (max-width: 922px){
      margin-top: 0;
      width: 100%;
    }

    .left-side {
      flex: 1;
      background: #fff;
      border-radius: 2px;

      .content-head {
        padding: 45px 30px;
        font-weight: 700;
        font-size: 25px;
        border-bottom: 1px solid hsla(0,0%,59.2%,.1);

        .content-row {
          padding: 0;
          margin: 0;
        }

        .content-des {
          font-size: 14px;
          font-weight: normal;
          color: #909090;
        }
      }

      .content-list {
        margin: 0;
        box-sizing: border-box;

        .el-pagination {
          text-align: center;
          padding: 30px;
          background: #eee;
        }
      }
    }
  }

}
</style>
