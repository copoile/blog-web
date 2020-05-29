<template>
  <div class="container">
    <div class="head">文章评论</div>
    <ul
      v-loading="loading"
      class="content-list"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="#fff"
    >

      <li v-for="(item, index) in list" :key="index" class="list-item">
        <div class="avatar-wrapper">
          <img class="user-avatar" :src="item.fromUser.avatar || defaultAvatar">
        </div>
        <div class="content-box">
          <p class="content-row text-ellipsis">{{ item.fromUser.nickname }}&emsp;<span style="float: right;">{{ parseDate(item.commentTime) }}</span></p>
          <router-link
            class="content-row text text-ellipsis"
            :to="'/article/' + item.article.id"
            v-html="item.content"
          />
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { parseDate } from '@/utils/index.js'
import { latestCommentList } from '@/api/comment.js'
export default {
  data() {
    return {
      loading: true,
      list: []
    }
  },

  computed: {
    ...mapGetters([
      'defaultAvatar'
    ])
  },

  mounted() {
    this.init()
  },

  methods: {

    init() {
      const params = { limit: 10 }
      latestCommentList(params).then(
        res => {
          this.loading = false
          this.list = res.data
        }
      )
    },

    // 日期转换
    parseDate(str) {
      // ios 兼容性问题
      str = str.replace(/-/g, '/')
      return parseDate(new Date(str))
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  background: #fff;
  border-radius: 2px;
  margin-bottom: 10px;
  padding-bottom: 5px;
  color: #2e3135;
  position: relative;

  .head {
    border-bottom: 1px solid hsla(0,0%,59.2%,.2);
    padding: 12px 10px;
  }

  .content-list {
    width: 100%;
    padding: 0;
    margin: 0px;
    box-sizing: border-box;
    padding: 10px;
    min-height: 120px;

    .list-item {
      width: 100%;
      list-style: none;
      display: flex;
      margin-bottom: 5px;

      .avatar-wrapper {
        position: relative;

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }
      }

      .content-box {
        flex: 1;
        overflow: hidden;
        font-size: 12px;
        height: 40px;
        padding-left: 5px;
        padding-top: 3px;
        padding-bottom: 2px;
        line-height: 18px;
        color: #909090;

        .content-row {
          padding: 0;
          margin: 0;
        }

        .text {
          color: #2e3135;
          cursor: pointer;

          &:hover {
            color: #007fff;
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
