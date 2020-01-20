<template>
  <div class="container">
    <app-header :nav-item-active="1" />
    <div class="content-container">
      <ul class="head-list">
        <li
          v-for="(tab,index) in firstTabs"
          :key="index"
          class="head-list-item"
          :class="{'head-list-item-active':tabActive === index}"
          @click="tabClick(index,tab)"
        >前端工程狮</li>
        <li v-if="secondTabs.length !=0 " class="head-list-item">
          <el-dropdown placement="bottom" @command="handleCommand">
            <span>
              更多<i class="el-icon-caret-bottom" />
            </span>
            <el-dropdown-menu slot="dropdown" split-button>
              <el-dropdown-item v-for="(tab,index) in secondTabs" :key="index" :command="tab">猪酱的日常</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
export default {
  components: {
    AppHeader
  },
  data() {
    return {
      tabActive: 0,
      categorys: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  },
  computed: {
    // 数组拆分
    firstTabs() {
      const len = this.categorys.length
      if (len > 7) {
        return this.categorys.slice(0, 6)
      }
      return this.categorys
    },
    secondTabs() {
      const len = this.categorys.length
      if (len > 7) {
        return this.categorys.slice(7, len + 1)
      }
      return []
    }
  },
  methods: {
    // tab点击事件
    tabClick(index, tab) {
      console.log(tab)
      this.tabActive = index
    },
    // 下拉列表点击事件
    handleCommand(tab) {
      this.tabClick(-1, tab)
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
    background: #fff;
    max-width: $ContentContainerW;
    margin: 0 auto;
    margin-top: 15px;
    border-radius: 2px;

    .head-list {
      margin: 0;
      padding: 0;
      padding-left: 10px;
      display: flex;
      border-bottom: 1px solid hsla(0,0%,59.2%,.1);

      .head-list-item {
        font-size: 14px;
        list-style: none;
        padding: 15px 0px;
        margin: 0 15px;
        cursor: pointer;
        position: relative;
        color: #333;

        &:first-child {
          margin-left: 0;
        }

        &:hover {
          color: #007fff;
        }
      }

      .head-list-item-active {
        color: #007fff;
        font-weight: 600;
        &:after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          height: 2px;
          background: #007fff;
          width: 100%;
        }
      }
    }

    .content-list {
      margin: 0;
      box-sizing: border-box;
      padding: 10px;

      .content-list-item {
        list-style: none;
        padding: 10px 0;
      }
    }
  }
}
</style>
