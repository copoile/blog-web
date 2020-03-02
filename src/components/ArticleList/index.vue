<template>
  <ul class="note-list">
    <li v-for="(item, index) in list" :key="index" class="list-item">
      <router-link to="/" class="wrap-img">
        <el-image src="https://poile-img.nos-eastchina1.126.net/1582879163511.jpg" />
      </router-link>
      <div class="wrapper-meta">
        <div class="avatar-wrapper">
          <img class="user-avatar" src="https://poile-img.nos-eastchina1.126.net/me.png">
        </div>
        <span class="right-solt">小姚同学</span>
        <span class="right-solt">02月23</span>
        <span class="active">程序员日常</span>
      </div>

      <div class="content">
        <router-link to="/" class="title">程序员过年如何向亲戚朋友介绍自己的职业</router-link>
        <p class="abstract"> 文/元气宜 学校这两天刚开学，能在大四最后一个学期开学来学校的人寥寥无几，刚好一个朋友出去忘了带钥匙，回来的时候进不去，就来我宿舍坐坐，结果凳子... </p>
        <div class="tags-wrapper">
          <span class="tag active btn">SpringBoot</span>
          <span class="tag active btn">测试</span>
        </div>

        <div class="meta">
          <span>57&ensp;评论</span>
          <span>57&ensp;点赞</span>
          <span>89&ensp;收藏</span>
          <span>100&ensp;浏览</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  }
}
</script>

<style lang="scss" scoped>
.note-list {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: #999;

  .list-item {
    list-style: none;
    position: relative;
    min-height: 200px;
    width: 100%;
    border-bottom: 1px solid #f0f0f0;
    padding: 15px 2px 15px 30px;
    margin-top: 5px;

    .active {
      cursor: pointer;

      &:hover {
        color: #007fff;
      }
    }

    .wrap-img {
      position: absolute;
      width: 150px;
      height: 100px;
      top: 50%;
      margin-top: -55px;
      right: 18px;
      cursor: pointer;
      // el-image 有个bug，点击图片滚动失效，所以给一层透明顶层
      &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        opacity: 0;
      }

      .el-image {
        border-radius: 4px;
        border: 1px solid #f0f0f0;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }

    .wrapper-meta {
      font-size: 13px;
      font-weight: 700;
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      .avatar-wrapper {
        position: relative;
        display: inline-block;
        margin-right: 5px;

        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }
      }

      .right-solt:after{
        content: "·";
        margin: 0 5px;
        color: #b2bac2;
      }
    }

    .content {
      width: 100%;
      padding-right: 170px;

      .title {
        margin: -7px 0 4px;
        display: inline-block;
        font-size: 18px;
        font-weight: 700;
        line-height: 1.5;
        color: #2f2f2f;

        &:hover {
          text-decoration: underline;
        }
      }

      .abstract {
        margin: 0;
        font-size: 13px;
        line-height: 24px;
        color: #999;
        margin-bottom: 5px;
      }

      .tags-wrapper {
        font-size: 11px;
        margin-bottom: 15px;

        .tag {
          border: 1px #999 solid;
          border-radius: 14px;
          padding: 5px 12px;
          margin-right: 3px;

          &:hover {
            border: 1px #007fff solid;
          }
        }
      }

      .meta {
        padding-right: 0!important;
        font-size: 12px;
        font-weight: normal;
        line-height: 20px;

        span {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
