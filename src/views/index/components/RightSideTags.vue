<template>
  <div class="container">
    <div class="head">标签
      <router-link class="right btn" to="/tag">全部标签</router-link>
    </div>
    <ul
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="#fff"
      class="tag-list"
    >
      <li v-for="(tag, index) in tags" :key="index" class="list-item btn" @click="tagClick(tag.id)">{{ tag.name }}</li>
    </ul>
  </div>
</template>

<script>
import { tagList } from '@/api/tag.js'
export default {
  data() {
    return {
      tags: [],
      loading: true
    }
  },

  mounted() {
    this.init()
  },

  methods: {

    init() {
      tagList().then(
        res => {
          this.loading = false
          this.tags = res.data.slice(0, 10)
        },
        error => {
          console.error(error)
          this.loading = false
        }
      )
    },

    tagClick(id) {
      this.$router.push(
        {
          path: '/tag',
          query: { id: id }
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  font-size: 14px;
  width: 100%;
  background: #fff;
  border-radius: 2px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  box-sizing: border-box;
  color: #2e3135;
  overflow: hidden;

  .head {
    border-bottom: 1px solid hsla(0,0%,59.2%,.2);
    padding: 12px 10px;

    .right {
      float: right;
      font-size: 12px;
      color: #007fff;
    }
  }

  .tag-list {
    min-height: 120px;
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
  }
}
</style>
