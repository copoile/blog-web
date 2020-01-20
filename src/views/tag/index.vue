<!-- 标签页面 -->
<template>
  <div class="container">
    <app-header :nav-item-active="-1" />
    <div class="content-container">
      <!-- 左边 -->
      <div class="left-side">
        <div class="content-head">
          <p class="content-row"><span style="color: #00a4ff;">#</span>Mysql</p>
          <p class="content-row content-des">Mysql标签共计36篇文章。</p>
        </div>
        <ul class="content-list">
          <li class="content-list-item">
            asdf
          </li>
          <li class="content-list-item">
            asdf
          </li>
        </ul>
      </div>
      <!-- 右边 -->
      <div class="right-side">
        <div class="tag-box">
          <div class="box-head">
            全部标签
          </div>
          <ul class="tag-list">
            <li v-for="item in tags" :key="item.id" class="list-item btn">{{ item.name }}</li>
          </ul>
        </div>
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
      tags: [
        {
          id: 1,
          name: '程序员'
        },
        {
          id: 2,
          name: '程序员'
        },
        {
          id: 3,
          name: '程序员'
        },
        {
          id: 4,
          name: '程序员'
        },
        {
          id: 5,
          name: '程序员'
        },
        {
          id: 6,
          name: '程序员'
        }
      ]
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
    max-width: $ContentContainerW;
    margin: 0 auto;
    margin-top: 15px;
    box-sizing: border-box;
    display: flex;

    .left-side {
      flex: 1;
      background: #fff;
      border-radius: 2px;
      padding: 10px;

      .content-head {
        padding: 50px 0;
        font-weight: 700;
        font-size: 25px;
        border-bottom: 1px solid hsla(0,0%,59.2%,.1);

        .content-row {
          padding: 0;
          margin: 0;
        }

        .content-des {
          font-size: 14px;
          font-weight: normal;
          color: #909090;
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

    .right-side {
      background: #fff;
      width: $ContentRightSideW;
      margin-left: 20px;
      font-size: 14px;
      .tag-box {
        width: 100%;
        border-radius: 2px;

        .box-head {
          border-bottom: 1px solid hsla(0,0%,59.2%,.2);
          padding: 12px 10px;
        }

        .tag-list {
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

      @media screen and (max-width: 960px){
        display: none;
      }
    }

  }
}
</style>
