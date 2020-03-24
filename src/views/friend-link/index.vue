<template>
  <div class="container">
    <app-header :nav-item-active="3" />
    <div class="content-container">
      <transition name="fade">
        <ul class="list">
          <li v-for="(item, index) in list" :key="index" class="item">
            <a :href="item.url" target="_blank">
              <div class="logo-box">
                <img :src="item.icon">
              </div>
              <div class="content-box">{{ item.name }}</div>
            </a>
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
import { listFriendLink } from '@/api/friend-link.js'
import AppHeader from '@/components/Header/index'
export default {
  components: {
    AppHeader
  },

  data() {
    return {
      list: []
    }
  },

  mounted() {
    this.init()
  },

  methods: {

    init() {
      listFriendLink().then(
        res => {
          this.list = res.data
        }
      )
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
  background: #fff;

  .content-container {
    max-width: 820px;
    margin: 0 auto;
    margin-top: 15px;
    border-radius: 2px;

    .list {
      width: 100%;
      padding: 0;
      margin: 0;
      margin-top: 10vh;
      box-sizing: border-box;
      padding: 10px;
      display: flex;
      flex-wrap: wrap;

      @media screen and (max-width: 960px){
        justify-content: space-around;
        margin-top: 0;
      }

      .item {
        list-style: none;
        margin: 10px;
        margin-bottom: 25px;
        position: relative;

        .logo-box {
          width: 48px;
          height: 48px;
          overflow: hidden;
          border-radius: 50%;
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          background: #fff;
          border: 1px solid #f1f1f1;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .content-box {
          color: #333;
          font-weight: 600;
          font-size: 15px;
          text-align: center;
          width: 180px;
          height: 80px;
          box-sizing: border-box;
          padding-top: 40px;
          border: 1px solid #f1f1f1;

          @media screen and (max-width: 960px){
            width: 150px;
          }
        }
      }
    }
  }
}
</style>
