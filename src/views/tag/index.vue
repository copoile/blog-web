<!-- 标签页面 -->
<template>
  <div ref="container" class="container">
    <app-header :nav-item-active="-1" />
    <ul v-if="device !== 'desktop'" class="list-header">
      <li
        v-for="(tag, index) in tags"
        :key="index"
        class="list-header-item"
        :class="{'header-item-active': tagId === tag.id}"
        @click="tagClick(tag.id)"
      >{{ tag.name }}</li>
    </ul>
    <div class="content-container">
      <!-- 左边 -->
      <div class="left-side">
        <div class="content-head">
          <p class="content-row"><span style="color: #00a4ff;">#</span>{{ tagName }}</p>
          <p class="content-row content-des">当前标签共计{{ total }}篇文章。</p>
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
      <!-- 右边 -->
      <div v-if="device === 'desktop'" class="right-side">
        <div class="tag-box">
          <div class="box-head">
            全部标签
          </div>
          <ul class="tag-list">
            <li
              v-for="(tag, index) in tags"
              :key="index"
              class="list-item btn"
              :class="{'active': tagId === tag.id}"
              @click="tagClick(tag.id)"
            >
              {{ tag.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { tagList } from '@/api/tag.js'
import AppHeader from '@/components/Header/index'
import ArticleList from '@/components/ArticleList'
import { pagePublishedArticle } from '@/api/article.js'
export default {
  name: 'Tag',
  components: {
    AppHeader,
    ArticleList
  },
  data() {
    return {
      tagId: 0,
      current: 1,
      size: 5,
      tags: [],
      artList: [],
      total: 0,
      loading: false
    }
  },

  computed: {
    tagName() {
      const tag = this.tags.find(ele => ele.id === this.tagId)
      return tag ? tag.name : null
    },
    ...mapGetters([
      'device'
    ])
  },

  mounted() {
    this.init()
  },

  methods: {

    init() {
      tagList().then(
        res => {
          this.tags = res.data
          const id = this.$route.query && this.$route.query.id
          if (id && this.tags.some(ele => ele.id === id)) {
            this.tagClick(id)
          } else {
            this.tagClick(this.tags[0].id)
          }
        }
      )
    },

    tagClick(id) {
      this.tagId = id
      this.current = 1
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
        tagId: this.tagId
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
    max-width: $ContentContainerW;
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
      margin-right: 260px;

      @media screen and (max-width: 922px){
        margin-right: 0;
      }

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

    .right-side {
      position: fixed;
      top: 75px;
      right: calc(calc(100% - 950px)/2);
      z-index: 999;
      background: #fff;
      width: $ContentRightSideW;
      margin-left: 20px;
      font-size: 14px;
      min-height: 190px;

      .tag-box {
        width: 100%;
        border-radius: 2px;

        .box-head {
          border-bottom: 1px solid hsla(0,0%,59.2%,.2);
          padding: 12px 10px;
        }

        .tag-list {
          width: 100%;
          margin: 10px;
          padding: 0;
          font-size: 12px;

          .list-item {
            list-style: none;
            float: left;
            color: inherit;
            background-color: #f3f6f3;
            margin-right: 12px;
            margin-bottom: 12px;
            padding: 10px 22px;
            border-radius: 30px;

            &:hover {
              background-color: #00CC00;
              color: #fff;
            }
          }

          .active {
            background-color: #00CC00;
            color: #fff;
          }
        }
      }

      @media screen and (max-width: 922px){
        display: none;
      }
    }

  }

  .list-header {
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    width: 100vw;
    white-space: nowrap;
    overflow-x: scroll;
    font-size: 14px;
    background: #fff;
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
}
</style>
