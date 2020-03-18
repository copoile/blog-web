<template>
  <div class="container">
    <app-header :nav-item-active="-1" />
    <div v-if="!loading" class="content-container">
      <div class="layout-left-side">
        <h2 class="art-title">
          {{ article.title }}
        </h2>
        <div class="author-info-block">
          <div class="avatar-wrapper">
            <img :src="article.user.avatar || defaultAvatar" class="avatar">
          </div>
          <div class="author-info-box">
            <p class="nickename">{{ article.user.nickname }}</p>
            <div class="meta-box">
              <span class="time">2020年03月09日</span>
              <span class="views-count">浏览&ensp;{{ article.viewCount }}</span>
            </div>
          </div>
        </div>
        <div class="text-container markdown-body" v-html="article.htmlContent" />
        <copy-right :url="url" :author-nickname="article.user.nickname" />
        <art-tags :tags="article.tagList" />
        <ul class="pre-next">
          <li v-if="article.previous">
            <router-link :to="'/article/' + article.previous.id">
              上一篇&ensp;:&ensp;{{ article.previous.title }}
            </router-link>
          </li>
          <li v-if="article.next">
            <router-link :to="'/article/' + article.next.id">
              下一篇&ensp;:&ensp;{{ article.next.title }}
            </router-link>
          </li>
        </ul>
        <comment-list :article-id="id" :author-id="article.user.id" />
      </div>

      <div class="layout-right-side">
        <interrelated-list :article-id="id" />
      </div>
    </div>
    <suspended-panel
      ref="spanel"
      :title="article.title"
      :like-count="article.likeCount"
      :collect-count="article.collectCount"
      @likeCountChanges="likeCountChanges"
      @collectCountChanges="collectCountChanges"
    />
  </div>
</template>

<script>
import './styles/github.css'
import { mapGetters } from 'vuex'
import AppHeader from '@/components/Header/index'
import { viewArtilce } from '@/api/article.js'
import CommentList from './components/CommentList'
import CopyRight from './components/CopyRight'
import ArtTags from './components/ArtTags'
import InterrelatedList from './components/InterrelatedList'
import SuspendedPanel from './components/SuspendedPanel'

export default {
  components: {
    AppHeader,
    CommentList,
    CopyRight,
    ArtTags,
    InterrelatedList,
    SuspendedPanel
  },
  data() {
    return {
      article: '',
      loading: true,
      id: 0,
      url: ''
    }
  },

  computed: {
    ...mapGetters([
      'defaultAvatar'
    ])
  },

  mounted() {
    this.id = this.$route.params && this.$route.params.id
    this.initArticle()
    this.url = window.location.href
  },

  // 路由变化，用于当前页进当前页
  beforeRouteUpdate(to, from, next) {
    this.id = to.params && to.params.id
    this.loading = true
    this.url = 'http://www.poile.cn/article/' + this.id
    this.$refs.spanel.changeUrl(this.url)
    this.$refs.spanel.changeId(this.id)
    this.$refs.spanel.isLiked()
    this.$refs.spanel.isCollected()
    viewArtilce(this.id).then(
      res => {
        this.loading = false
        this.article = res.data
      }
    )
    next()
  },

  methods: {

    // 加载文章数据
    initArticle() {
      viewArtilce(this.id).then(
        res => {
          this.loading = false
          this.article = res.data
        }
      )
    },

    // 点赞数自增、自减
    likeCountChanges(val) {
      this.article.likeCount = this.article.likeCount + val
    },

    // 收藏数自增、自减
    collectCountChanges(val) {
      this.article.collectCount = this.article.collectCount + val
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
  overflow-y: auto;
  overflow-y: -webkit-overlay;
  overflow-y: overlay;

  .content-container {
    width: 100%;
    max-width: 960px;
    box-sizing: border-box;
    margin: 0 auto;
    position: relative;
    margin-top: 15px;
    display: flex;
    color: #909090;
    align-items: flex-start;

    @media screen and (max-width: 960px){
      margin-top: 0;
    }

    .layout-left-side {
      background: #fff;
      border-radius: 2px;
      width: 750px;
      margin-right: 170px;
      box-sizing: border-box;
      padding: 0 15px 0 15px;
      margin-bottom: 25px;

      @media screen and (max-width: 960px){
        width: 100%;
        margin-right: 0;
        margin-bottom: 0;
      }

      .art-title {
        font-size: 28px;
        font-weight: 700;
        color: #222;
      }

      .author-info-block {
        display: flex;

        .avatar-wrapper {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          border: 1px solid rgba(0,0,0,.1);
          overflow: hidden;
          margin-right: 5px;

          .avatar {
            width: 100%;
            height: 100%;
          }
        }

        .author-info-box {

          .nickename {
            font-weight: 500;
            font-size: 15px;
            display: inline-block;
            margin: 5px;
            color: #000;
          }

          .meta-box {
            font-size: 12px;
            color: #909090;

            .views-count {
              margin-left: 5px;
            }
          }
        }
      }

      .text-container {
        font-size: 15px;
        margin-top: 24px;
      }

      .pre-next {
        padding: 0;
        margin: 0;
        margin-top: 15px;
        font-size: 14px;
        font-weight: 400;
        color: #007fff;

       li {
         list-style: none;
         margin: 5px;

         a:hover {
           text-decoration: underline;
         }
       }
      }
    }

    .layout-right-side {
      width: 240px;
      background: #fff;
      margin-left: 15px;
      border-radius: 2px;
      position: fixed;
      top: 75px;
      left: calc(100% - 680px);
      right: calc(calc(100% - 1060px)/2);

      @media screen and (max-width: 960px) {
        display: none;
      }
    }
  }
}
</style>
