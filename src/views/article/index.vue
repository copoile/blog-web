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
      </div>
      <div class="layout-right-side">
        sss
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/Header/index'
import { viewArtilce } from '@/api/article.js'
import 'mavon-editor/dist/css/index.css'
export default {
  components: {
    AppHeader
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
    max-width: $ContentContainerW;
    margin: 0 auto;
    margin-top: 15px;
    border-radius: 2px;
    display: flex;
    align-items: flex-start;

    .layout-left-side {
      background: #fff;
      flex: 1;
      padding: 0 24px 24px 24px;

      .art-title {
        font-size: 28px;
        font-weight: 700;
        color: #222;
      }

      .author-info-block {
        display: flex;

        .avatar-wrapper {
          width: 40px;
          height: 40px;
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
          flex-grow: 1;

          .nickename {
            font-weight: 700;
            font-size: 14px;
            display: inline-block;
            margin: 5px;
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
        font-size: 14px;
        margin-top: 24px;
      }
    }

    .layout-right-side {
      width: $ContentRightSideW;
      background: #fff;
      box-sizing: border-box;
      margin-left: 15px;
      font-size: 14px;
      position: relative;

      @media screen and (max-width: 960px){
        display: none;
      }
    }
  }
}
</style>
