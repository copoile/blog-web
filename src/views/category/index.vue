<template>
  <div class="container">
    <app-header :nav-item-active="1" />
    <div class="content-container">
      <ul class="left-list">
        <li
          v-for="(category,index) in categorys"
          :key="index"
          class="left-list-item"
          :class="{'left-list-item-active': tabActive === index}"
          @click="chageTab(index,category.id)"
        >
          <span class="item-content">{{ category.name }}</span>
        </li>
      </ul>
      <ul class="content-list">
        <li class="content-list-item">
          asdf
        </li>
        <li class="content-list-item">
          asdf
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/Header/index'
import { categoryList } from '@/api/category.js'
export default {
  components: {
    AppHeader
  },
  data() {
    return {
      tabActive: 0,
      categorys: []
    }
  },

  mounted() {
    this.initCategoryList()
  },

  methods: {

    // 获取分类列表
    initCategoryList() {
      categoryList().then(
        res => {
          this.categorys = res.data
        }
      )
    },

    // tab更改
    chageTab(index, categoryId) {
      this.tabActive = index
      console.log(categoryId)
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
    max-width: 822px;
    margin: 0 auto;
    margin-top: 15px;
    border-radius: 2px;
    display: flex;
    align-items: flex-start;

    .left-list {
      background: #fff;
      width: 112px;
      margin: 0;
      margin-right: 10px;
      padding: 0;
      text-align: center;
      box-sizing: border-box;
      color: #909090;
      border-radius: 2px;

      .left-list-item {
        font-size: 14px;
        list-style: none;
        cursor: pointer;
        position: relative;
        margin-top: 10px;

        &:last-child {
          margin-bottom: 10px;
        }

        .item-content {
          padding: 7px 0;
          display: inline-block;
          min-width: 86px;
          cursor: pointer;
          border-radius: 3px;

          &:hover {
            color: #007fff;
            background: #f4f5f5;
          }
        }
      }

      .left-list-item-active {
        color: #fff;
        font-weight: 700;

        .item-content {
          background: #007fff;

          &:hover {
            color: #fff;
            background: #007fff;
          }
        }
      }
    }

    .content-list {
      background: #fff;
      flex: 1;
      margin: 0;
      box-sizing: border-box;
      padding: 10px;
      border-radius: 2px;

      .content-list-item {
        list-style: none;
        padding: 10px 0;
      }
    }
  }
}
</style>
