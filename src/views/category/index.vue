<template>
  <div class="container">
    <app-header :nav-item-active="1" />
    <div class="content-container">
      <ul class="left-list">
        <li
          v-for="(category,index) in categorys"
          :key="index"
          class="left-list-item"
          :class="{'left-list-item-active': categoryId === category.id}"
          @click="chageTab(category.id)"
        >
          <span class="item-content">{{ category.name }}</span>
        </li>
      </ul>
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
</template>

<script>
import { categoryList } from '@/api/category.js'
import AppHeader from '@/components/Header/index'
import ArticleList from '@/components/ArticleList'
import { pagePublishedArticle } from '@/api/article.js'
export default {
  components: {
    AppHeader,
    ArticleList
  },
  data() {
    return {
      categoryId: 0,
      categorys: [],
      loading: true,
      artList: [],
      current: 1,
      size: 10,
      total: 0
    }
  },

  mounted() {
    this.init()
  },

  methods: {

    // 获取分类列表
    init() {
      categoryList().then(
        res => {
          this.categorys = res.data
          const id = this.$route.query && this.$route.query.id
          if (id && this.categorys.some(ele => ele.id === id)) {
            this.chageTab(id)
          } else {
            this.chageTab(this.categorys[0].id)
          }
        }
      )
    },

    // tab更改
    chageTab(categoryId) {
      this.artList = []
      this.total = 0
      this.current = 1
      this.categoryId = categoryId
      this.getArtList()
    },

    // 分页监听
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
        categoryId: this.categoryId
      }
      pagePublishedArticle(params).then(
        res => {
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
    position: relative;
    max-width: 822px;
    margin: 0 auto;
    margin-top: 15px;
    border-radius: 2px;
    display: flex;
    align-items: flex-start;

    @media screen and (max-width: 960px){
      margin-top: 0;
    }

    .left-list {
      background: #fff;
      width: 112px;
      margin: 0;
      margin-right: 10px;
      padding: 0;
      text-align: center;
      box-sizing: border-box;
      color: #909090;
      border-radius: 2px;
      position: fixed;
      left: calc(calc(100% - 845px)/2);
      top: 75px;
      background: #fff;
      z-index: 999;

      .left-list-item {
        font-size: 14px;
        list-style: none;
        cursor: pointer;
        position: relative;
        margin-top: 10px;

        &:last-child {
          margin-bottom: 10px;
        }

        .item-content {
          padding: 7px 0;
          display: inline-block;
          min-width: 86px;
          cursor: pointer;
          border-radius: 3px;

          &:hover {
            color: #007fff;
            background: #f4f5f5;
          }
        }
      }

      .left-list-item-active {
        color: #fff;
        font-weight: 700;

        .item-content {
          background: #007fff;

          &:hover {
            color: #fff;
            background: #007fff;
          }
        }
      }
    }

    .content-list {
      background: #fff;
      width: 700px;
      margin: 0;
      box-sizing: border-box;
      border-radius: 2px;
      margin-left: 122px;

      @media screen and (max-width: 960px){
        margin-left: 0;
      }

      .el-pagination {
        text-align: center;
        padding: 30px;
        background: #eee;
      }
    }
  }
}
</style>
