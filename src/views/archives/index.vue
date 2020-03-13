<!-- 文章归档页面 -->
<template>
  <div class="container">
    <app-header :nav-item-active="2" />
    <div class="content-container">
      <div class="left-side">
        <p class="left-side-title">Archives</p>
        <ul class="tab-list">
          <li
            v-for="(tab,index) in leftTabs"
            :key="index"
            class="list-tab"
            :class="{'tab-active':tabActive === index}"
            @click="tabClick(index,tab)"
          >2019年01月</li>
        </ul>
        <el-button type="text">
          <i class="el-icon-arrow-left el-icon" />
        </el-button>
        <el-button type="text">
          <i class="el-icon-arrow-right el-icon" />
        </el-button>
      </div>

      <div class="right-side">
        <el-timeline>
          <el-timeline-item
            id="first"
            color="#0bbd87"
            icon="el-icon-date"
            size="large"
            timestamp="#很好！目前共计35篇文章,继续加油!"
            placement="top"
          />
          <el-timeline-item
            v-for="(item,index) in dataList"
            :key="index"
            color="#0bbd87"
            :timestamp="temp"
            placement="top"
          >
            <el-card>
              <h4>程序员如何向自己的亲戚朋友介绍自己的职业?</h4>
              <p>小姚同学 发表于 2020-01-15</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
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
      temp: '2019-09-03',
      leftTabs: [1, 2, 3, 4, 5],
      dataList: [1, 2, 3, 4, 5]
    }
  },
  methods: {
    // 左边tab点击事件
    tabClick(index, tab) {
      this.tabActive = index
      console.log(tab)
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

  @media screen and (max-width: 960px){
    background: #fff;
  }

  .content-container {
    max-width: $ContentContainerW;
    margin: 0 auto;
    margin-top: 50px;
    box-sizing: border-box;
    display: flex;

    @media screen and (max-width: 960px){
      margin-top: 20px;
    }

    .left-side {
      position: fixed;
      top: 110px;
      left: calc(calc(100% - 850px)/2);
      z-index: 999;
      padding: 20px;
      padding-bottom: 5px;
      background: #fff;
      text-align: center;

      .left-side-title {
        margin: 0;
        font-weight: 700;
        font-size: 20px;
        color: #303133;
        text-align: center;
        padding-bottom: 20px;
      }

      .tab-list {
        margin: 0;
        padding: 0;
        font-size: 18px;
        text-align: center;
        color: #616161;

        .list-tab {
          list-style: none;
          position: relative;
          margin: 12px 0;
          cursor: pointer;

          &:hover {
            color: #007fff;
          }
        }

        .tab-active {
          color: #007fff;

          &:after {
            content: '';
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 0;
            height: 1px;
            background: #007fff;
            width: 95px;
          }
        }
      }

      .el-icon {
        cursor: pointer;

        &:hover {
          color: #007fff;
        }
      }
    }

    .right-side {
      margin-left: 200px;
      flex: 1;

      @media screen and (max-width: 960px){
        margin-left: 0;
      }

      #first {
        width: 100%;
        height: 70px;

        /deep/ .el-timeline-item__timestamp {
          color: #303133;
          font-size: 16px;
          font-weight: bold;
        }

        /deep/ .el-timeline-item__node--large {
          left: -8px;
          width: 23px;
          height: 23px;
        }
      }

      @media screen and (max-width: 960px){
        /deep/ .el-timeline {
          padding: 15px;
        }
      }

      // 左边连线的样式
      @media screen and (min-width: 960px){
        /deep/ .el-timeline-item__tail {
          border-left: 2px solid #C0C4CC;
        }
      }

      // 右边日期的样式
      @media screen and (min-width: 960px){
        /deep/ .el-timeline-item__timestamp {
          color: #444;
          font-weight: 700;
        }
      }
    }
  }

}
</style>
