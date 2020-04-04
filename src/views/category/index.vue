<template>
  <div ref="container" class="container">
    <app-header :nav-item-active="1" />
    <div class="content-container">

      <ul v-if="device === 'desktop'" class="left-list">
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
        <ul v-if="device !== 'desktop'" class="list-header">
          <li
            v-for="(category,index) in categorys"
            :key="index"
            class="list-header-item"
            :class="{ 'header-item-active': categoryId === category.id }"
            @click="chageTab(category.id)"
          >{{ category.name }}</li>
        </ul>
        <article-list :list="artList" :loading="loading" />

        <el-pagination
          background
          layout="prev, pager, next"
          hide-on-single-page
          :page-size="size"
          :current-page="current"
          :total="total"
          @current-change="currentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { categoryList } from '@/api/category.js'
import AppHeader from '@/components/Header/index'
import ArticleList from '@/components/ArticleList'
import { pagePublishedArticle } from '@/api/article.js'
export default {
  name: 'Category',
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

  computed: {
    ...mapGetters([
      'device'
    ])
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
          this.total = res.data.total
          this.artList = res.data.records
          this.loading = false
          this.$refs.container.scrollTop = 0
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

      .list-header {
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        width: 100vw;
        white-space: nowrap;
        overflow-x: scroll;
        font-size: 14px;
        border-bottom: 1px solid hsla(0,0%,59.2%,.1);

        &:first-child {
          margin-left: 5px;
        }

        .list-header-item {
          list-style: none;
          cursor: pointer;
          padding: 15px;
          margin-right: 5px;
        }

        .header-item-active {
          color: #007fff;
        }
      }

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
