<template>
  <div class="panel">
    <ul class="extra-act">
      <li :class="{ 'like-warpper': liked }" @click="likeClick">
        <el-badge :value="likeCount" :max="99">
          <svg-icon icon-class="like" class="svg-icon" />
        </el-badge>
      </li>
      <li :class="{ 'collect-warpper': collected }" @click="collectClick">
        <el-badge :value="collectCount" :max="99">
          <svg-icon icon-class="collect" class="svg-icon" />
        </el-badge>
      </li>
    </ul>

    <ul class="extra-cnt">
      <li>
        <a
          slot="reference"
          target="_blank"
          class="item"
          :href="'https://connect.qq.com/widget/shareqq/index.html?url=' + codedUrl + '&title=' + codedTitle + '&summary=&style=101&width=96&height=24'"
        >

          <svg-icon icon-class="qq" class="svg-icon" /></a></li>

      <li class="wx-warpper">
        <el-popover placement="left" trigger="hover">
          <img
            style="width:90px;height:90px;margin-left: 15px;"
            :src="'https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=' + codedUrl"
          >
          <svg-icon slot="reference" icon-class="wx" class="svg-icon" />
        </el-popover>
      </li>

      <li
        v-clipboard:copy="url"
        v-clipboard:success="copySuccess"
        class="cp-warpper"
      ><svg-icon icon-class="copy" class="svg-icon" /></li>
      <ul />
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { isLiked, addLike, cancelLiked } from '@/api/like.js'
import { isCollected, addCollect, cancelCollected } from '@/api/collect.js'
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    likeCount: {
      type: [Number, String],
      default: 0
    },
    collectCount: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      url: '',
      id: 0,
      testLiked: false,
      testCollected: false
    }
  },

  computed: {

    ...mapGetters([
      'token'
    ]),

    liked() {
      return this.token && this.testLiked
    },

    collected() {
      return this.token && this.testCollected
    },

    codedUrl() {
      return encodeURIComponent(this.url)
    },

    codedTitle() {
      return encodeURIComponent(this.title)
    }
  },

  watch: {
    token(newValue) {
      if (newValue) {
        this.isLiked()
        this.isCollected()
      }
    }
  },

  mounted() {
    this.url = window.location.href
    this.id = this.$route.params && this.$route.params.id
    this.isLiked()
    this.isCollected()
  },

  methods: {

    // 拷贝成功
    copySuccess() {
      this.$message({
        message: '复制成功',
        type: 'success'
      })
    },

    // 点赞点击
    likeClick() {
      if (!this.token) {
        this.$store.commit('login/CHANGE_VISIBLE', true)
        return
      }
      const liked = this.liked
      const params = { articleId: this.id }
      if (!liked) {
        addLike(params).then(
          res => {
            this.$emit('likeCountChanges', 1)
            this.testLiked = true
          }
        )
      } else {
        cancelLiked(params).then(
          res => {
            this.$emit('likeCountChanges', -1)
            this.testLiked = false
          }
        )
      }
    },

    // 收藏点击
    collectClick() {
      if (!this.token) {
        this.$store.commit('login/CHANGE_VISIBLE', true)
        return
      }
      const collected = this.collected
      const params = { articleId: this.id }
      if (!collected) {
        addCollect(params).then(
          res => {
            this.$emit('collectCountChanges', 1)
            this.testCollected = true
          }
        )
      } else {
        cancelCollected(params).then(
          res => {
            this.$emit('collectCountChanges', -1)
            this.testCollected = false
          }
        )
      }
    },

    // 是否已点赞
    isLiked() {
      if (this.token) {
        isLiked(this.id).then(
          res => {
            this.testLiked = res.data === 1
          }
        )
      }
    },

    // 是否已收藏
    isCollected() {
      if (this.token) {
        isCollected(this.id).then(
          res => {
            this.testCollected = res.data === 1
          }
        )
      }
    },

    // 更改url
    changeUrl(url) {
      this.url = url
    },

    // 更改id
    changeId(id) {
      this.id = id
    }
  }
}
</script>

<style lang="scss" scoped>
.panel {
  position: fixed;
  width: 45px;
  top: 200px;
  left: calc(calc(100% - 1145px) / 2);
  text-align: center;
  margin: 0;
  padding: 0;

  .extra-act {
    margin: 0;
    padding: 0;
    margin-bottom: 20px;

    /deep/ .el-badge__content.is-fixed {
      right: 10px;
      top: -5px;
    }

    li {
      list-style: none;
      background: #fff;
      border-radius: 50%;
      width: 42px;
      height: 42px;
      text-align: center;
      margin-top: 10px;
      color: #b2bac2;
      box-sizing: border-box;
      padding-top: 10px;

      /deep/ .el-badge__content {
        background: #b2bac2;
      }

      .svg-icon {
        width: 18px;
        height: 18px;
        cursor: pointer;
        fill: currentcolor;
        margin: 0 auto;
      }
    }

    .like-warpper {
      color: #007fff;

      /deep/ .el-badge__content {
        background: #007fff;
      }
    }

    .collect-warpper {
      color: #007fff;

      /deep/ .el-badge__content {
        background: #007fff;
      }
    }
  }

  .extra-cnt {
    margin: 0;
    padding: 0;
    color: #b2bac2;
    background: #fff;

    li {
      list-style: none;
      padding: 10px 0;
      position: relative;

      &:before {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 20px;
        height: 1px;
        background-color: #e5e5e5;
        margin-left: -10px;
      }

      &:hover {
        color: #007fff;
      }

      .svg-icon {
        width: 24px;
        height: 24px;
        cursor: pointer;
        fill: currentcolor;
      }
    }

    .wx-warpper:hover {
      color: #26aa09;
    }

    .cp-warpper {
      &:before {
        display: none;
      }

      &:hover {
        color: #007fff;
      }
    }
  }
}
</style>
