<!-- 文章归档页面 -->
<template>
  <div class="container">
    <app-header :nav-item-active="2" />
    <div class="content-container">
      <div class="left-side">
        <p class="left-side-title">Archives</p>
        <ul class="tab-list">
          <li
            v-for="(tab,index) in tabs"
            :key="index"
            class="list-tab"
            :class="{'tab-active':tabActive === index}"
            @click="tabClick(index,tab)"
          >{{ tab.date }}</li>
        </ul>
        <el-button type="text" :disabled="tabCurrent === 1" @click="tabPageChange(-1)">
          <i class="el-icon-arrow-left el-icon" />
        </el-button>
        <el-button type="text" :disabled="tabPages === tabCurrent" @click="tabPageChange(1)">
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
            :timestamp="'# 继续加油啊！当前月份一共' + total +'篇文章！'"
            placement="top"
          />
          <transition-group name="fade">
            <el-timeline-item
              v-for="(item,index) in artList"
              :key="index"
              color="#0bbd87"
              :timestamp="item.date"
              placement="top"
            >
              <el-card shadow="hover">
                <router-link :to="'/article/' + item.id" class="title">{{ item.title }}</router-link>
                <div class="content">
                  <p class="abstract multi-ellipsis--l3">
                    {{ item.summary }}
                  </p>
                  <div class="wrap-img">
                    <img :src="item.cover">
                  </div>
                </div>
              </el-card>
            </el-timeline-item>
          </transition-group>
        </el-timeline>
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="size"
          :current-page="current"
          :total="total"
          :hide-on-single-page="true"
          @current-change="currentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { pageArchives } from '@/api/archives.js'
import AppHeader from '@/components/Header/index'
import { formatDate } from '@/utils/index.js'
import { pagePublishedArticle } from '@/api/article.js'
export default {
  components: {
    AppHeader
  },
  data() {
    return {
      tabActive: 0,
      loading: true,
      temp: '2019-09-03',
      tabs: [],
      tabSize: 12,
      tabCurrent: 1,
      tabPages: 1,
      yearMonth: '',
      current: 1,
      size: 8,
      total: 0,
      artList: []
    }
  },

  mounted() {
    this.pageArchives()
  },

  methods: {

    pageArchives() {
      this.loading = true
      const params = { size: this.tabSize, current: this.tabCurrent }
      pageArchives(params).then(
        res => {
          const records = res.data.records
          records.forEach(
            ele => {
              const arr = ele.yearMonth.split('-')
              ele.date = arr[0] + '年' + arr[1] + '月'
            }
          )
          this.tabs = records
          this.tabPages = res.data.pages
          this.tabClick(0, this.tabs[0])
        }
      )
    },

    // 获取文章列表
    pageArticle() {
      this.loading = true
      const params = {
        current: this.current,
        size: this.size,
        yearMonth: this.yearMonth
      }
      pagePublishedArticle(params).then(
        res => {
          const records = res.data.records
          records.forEach(ele => { ele.date = formatDate(new Date(ele.publishTime), 'yyyy-MM-dd') })
          this.artList = records
          this.total = res.data.total
          this.loading = false
        },
        error => {
          console.error(error)
          this.loading = false
        }
      )
    },

    // 文章分页
    currentChange(current) {
      this.current = current
      this.pageArticle()
    },

    // 归档tab分页
    tabPageChange(val) {
      this.tabCurrent = this.tabCurrent + val
      this.pageArchives()
    },

    // 左边tab点击事件
    tabClick(index, tab) {
      this.tabActive = index
      this.yearMonth = tab.yearMonth
      this.current = 1
      this.pageArticle()
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
  overflow-y: -webkit-overlay;
  overflow-y: overlay;

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
        font-size: 15px;
        text-align: center;
        color: #909090;;

        .list-tab {
          list-style: none;
          position: relative;
          padding: 5px;
          border-radius: 3px;
          cursor: pointer;
          margin-top: 5px;

          &:hover {
            color: #007fff;
            background: #f4f5f5;
          }
        }

        .tab-active {
          color: #fff;
          background: #007fff;

          &:hover {
            color: #fff;
            background: #007fff;
          }
        }
      }

      .el-icon {
        font-weight: 700;
      }
    }

    .right-side {
      margin-left: 200px;
      flex: 1;

      .el-card {
        position: relative;

        @media screen and (max-width: 922px){
          width: 80vw;
        }

        .title {
          margin: 0;
          font-size: 14px;
          font-weight: 700;
          color: #2f2f2f;

          &:hover {
            text-decoration: underline;
          }
        }

        .content {
          display: flex;

          .abstract {
            flex: 1;
            margin: 0;
            margin-top: 8px;
            padding-right: 200px;
            line-height: 20px;
            color: #999;

            @media screen and (max-width: 960px){
              padding-right: 0;
            }
          }

          .wrap-img {
            position: absolute;
            right: 30px;
            top: 50%;
            transform: translateY(-50%);
            width: 150px;
            height: 90px;
            border-radius: 4px;
            border: 1px solid #f3f7fa;
            overflow: hidden;

            @media screen and (max-width: 960px){
              display: none;
            }

            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }

      .el-pagination {
        text-align: center;
      }

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
