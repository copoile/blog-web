<template>
  <ul class="note-list">
    <li v-for="(item, index) in list" :key="index" class="list-item">
      <router-link to="/" class="wrap-img">
        <el-image :src="item.cover">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline" />
          </div>
        </el-image>
      </router-link>
      <div class="wrapper-meta">
        <div class="avatar-wrapper">
          <img class="user-avatar" :src="item.user.avatar">
        </div>
        <span class="right-solt">{{ item.user.nickname }}</span>
        <span class="right-solt">02月23</span>
        <span class="active" @click="categoryClick(item.categoryId)">{{ item.categoryName }}</span>
      </div>

      <div class="content">
        <router-link to="/" class="title">{{ item.title }}</router-link>
        <p class="abstract multi-ellipsis--l3">{{ item.summary }}</p>
        <div class="tags-wrapper">
          <span
            v-for="(tag, index2) in item.tagList"
            :key="index2"
            class="tag active btn"
            @click="tagClick(tag.id)"
          >
            {{ tag.name }}
          </span>
        </div>
        <div class="meta">
          <span>{{ item.commentCount }}&ensp;评论</span>
          <span>{{ item.likeCount }}&ensp;点赞</span>
          <span>{{ item.collectCount }}&ensp;收藏</span>
          <span>{{ item.viewCount }}&ensp;浏览</span>
        </div>
      </div>
    </li>
    <div v-show="list.length === 0 && !loading" class="list-empty">列表为空</div>
  </ul>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {

    // 分类点击
    categoryClick(id) {
      if (this.$route.path !== '/category') {
        this.$router.push(
          {
            path: '/category',
            query: { id: id }
          }
        )
      }
    },

    // 标签点击
    tagClick(id) {
      if (this.$route.path !== '/tag') {
        this.$router.push(
          {
            path: '/tag',
            query: { id: id }
          }
        )
      }
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
      overflow: hidden;
      border-radius: 4px;

      // el-image 有个bug，点击图片滚动失效，所以给一层透明顶层
      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 99;
        opacity: 0;
      }

      .el-image {
        border-radius: 4px;
        border: 1px solid #f0f0f0;

        /deep/ .image-slot {
          width: 150px;
          height: 100px;
          background: #f5f7fa;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          border-radius: 4px;
          overflow: hidden;
        }
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

  .list-empty {
    background: #fff;
    width: 100%;
    height: 100px;
    line-height: 100px;
    border-bottom: 1px solid #f0f0f0;
    text-align: center;
  }
}
</style>
