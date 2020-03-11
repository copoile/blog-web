<template>
  <div class="container">
    <app-header :nav-item-active="-1" />
    <div v-if="!loading" class="content-container">

      <div class="layout-left-side">
        <h2 class="art-title">
          {{ artilce.title }}
        </h2>
        <div class="author-info-block">
          <div class="avatar-wrapper">
            <img :src="artilce.user.avatar || defaultAvatar" class="avatar">
          </div>
          <div class="author-info-box">
            <p class="nickename">小姚同学</p>
            <div class="meta-box">
              <span class="time">2020年03月09日</span>
              <span class="views-count">浏览&ensp;{{ artilce.viewCount }}</span>
            </div>
          </div>
        </div>
        <div class="text-container markdown-body" v-html="artilce.htmlContent" />
        <copy-right />
        <art-tags />
        <ul class="pre-next">
          <li><a href="/">上一篇:程序员的日常是怎么样的</a></li>
          <li><a href="/">下一篇:Centos7环境安装Mysql</a></li>
        </ul>
        <comment-list />
      </div>

      <div class="layout-right-side">
        <interrelated-list />
      </div>
    </div>
    <suspended-panel />
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
      artilce: '',
      loading: true,
      id: 0
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
  },
  methods: {
    // 加载文章数据
    initArticle() {
      viewArtilce(this.id).then(
        res => {
          this.loading = false
          this.artilce = res.data
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
      flex: 1;
      width: 750px;
      margin-right: 170px;
      box-sizing: border-box;
      padding: 0 15px 0 15px;

      @media screen and (max-width: 960px){
        width: 100%;
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
      right: calc(calc(100% - 1145px)/2);

      @media screen and (max-width: 960px) {
        display: none;
      }
    }
  }
}
</style>
