<template>
  <div class="container">
    <app-header />
    <div class="content-container">
      <div class="layout-left-side">
        <h2 class="art-title">
          Centos7下安装mysql数据库
        </h2>
        <div class="author-info-block">
          <div class="avatar-wrapper">
            <img src="https://poile-img.nos-eastchina1.126.net/1568536623338.png" class="avatar">
          </div>
          <div class="author-info-box">
            <p class="nickename">小姚同学</p>
            <div class="meta-box">
              <span class="time">2020年03月09日</span>
              <span class="views-count">浏览&ensp;100</span>
            </div>
          </div>
        </div>
        <div class="text-container markdown-body" v-html="artilce.htmlContent" />
        <copy-right />
        <comment-list />
      </div>
    </div>
  </div>
</template>

<script>
import './styles/github.css'
import AppHeader from '@/components/Header/index'
import { viewArtilce } from '@/api/article.js'
import CommentList from './components/CommentList'
import CopyRight from './components/CopyRight'
export default {
  components: {
    AppHeader,
    CommentList,
    CopyRight
  },
  data() {
    return {
      artilce: ''
    }
  },

  mounted() {
    this.initArticle()
  },
  methods: {
    // 加载文章数据
    initArticle() {
      const id = 5
      viewArtilce(id).then(
        res => {
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
    max-width: 800px;
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
      width: 800px;
      flex: 1;
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
            font-weight: 700;
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
    }
  }
}
</style>
