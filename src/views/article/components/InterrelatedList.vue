<template>
  <div class="v-container">
    <div class="head">相关阅读</div>
    <ul
      v-loading="loading"
      class="content-list"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="#fff"
    >
      <li v-for="(item, index) in list" :key="index" class="list-item">
        <p class="content-row title">{{ item.title }}</p>
        <p class="content-row">阅读&ensp;{{ item.viewCount }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { recommendList } from '@/api/article.js'
export default {
  data() {
    return {
      loading: true,
      list: []
    }
  },

  mounted() {
    this.init()
  },

  methods: {

    init() {
      recommendList().then(
        res => {
          this.loading = false
          this.list = res.data
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.v-container {
  width: 100%;
  background: #fff;
  border-radius: 2px;
  margin-bottom: 10px;
  padding-bottom: 10px;

  .head {
    color: #2e3135;
    border-bottom: 1px solid hsla(0,0%,59.2%,.2);
    padding: 12px 10px;
    font-size: 14px;
  }

  .content-list {
    margin: 10px;
    padding: 0;
    min-height: 120px;

    .list-item {
      list-style: none;
      line-height: 15px;
      margin-bottom: 10px;

      .content-row {
        margin: 0;
        padding: 0;
        font-size: 12px;
        margin-bottom: 5px;
      }

      .title {
        font-size: 14px;
        color: #000;
        cursor: pointer;
        line-height: 18px;

        &:hover {
          color: #007fff;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
