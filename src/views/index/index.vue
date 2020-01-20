<template>
  <div class="home-container">
    <app-header />
    <div class="content-container">
      <div class="side-left">
        <ul class="list-header">
          <li
            v-for="(item, index) in mainTabs"
            :key="index"
            class="list-header-item"
            :class="{ 'main-active': mainActive === index }"
            @click="mainTabClick(index)"
          >{{ item }}</li>
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

      <div class="content-right-side-container">
        <right-side-about />
        <right-side-tags />
        <right-side-comment />
        <right-side-recommend />
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/Header/index'
import RightSideAbout from './components/RightSideAbout'
import RightSideTags from './components/RightSideTags'
import RightSideComment from './components/RightSideComment'
import RightSideRecommend from './components/RightSideRecommend'
export default {
  name: 'Index',
  components: {
    AppHeader,
    RightSideAbout,
    RightSideTags,
    RightSideComment,
    RightSideRecommend
  },
  data() {
    return {
      mainTabs: ['最新', '热门'],
      mainActive: 0
    }
  },
  methods: {
    mainTabClick(index) {
      this.mainActive = index
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  @import '~@/styles/variables';
	width: 100%;
	overflow-x: hidden;

  .content-container {
    width: 100%;
    max-width: $ContentContainerW;
    box-sizing: border-box;
    margin: 0 auto;
    position: relative;
    margin-top: 15px;
    display: flex;
    color: #909090;
    align-items: flex-start;

    .side-left {
      flex: 1;
      background: #fff;
      border-radius: 2px;

      .list-header {
        margin: 0;
        box-sizing: border-box;
        padding: 15px 12px;
        display: flex;
        align-items: center;
        font-size: 14px;
        border-bottom: 1px solid hsla(0,0%,59.2%,.1);

        .list-header-item {
          list-style: none;
          padding: 0 15px;
          border-right: 1px solid hsla(0,0%,59.2%,.2);
          cursor: pointer;

          &:last-child {
            border-right: none;
          }

          &:hover {
            color: #007fff;
          }
        }

        .main-active {
          color: #007fff;
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

    .content-right-side-container {
      width: $ContentRightSideW;
      box-sizing: border-box;
      margin-left: 20px;
      font-size: 14px;

      @media screen and (max-width: 960px){
        display: none;
      }
    }
  }
}
</style>
