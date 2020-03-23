<template>
  <div class="container">
    <app-header :nav-item-active="3" />
    <div class="content-container">
      <ul class="list">
        <li class="item">
          <a href="/" target="_blank">
            <div class="logo-box">
              <img src="https://poile-img.nos-eastchina1.126.net/friend-link/cunjieweixiao.ico">
            </div>
            <div class="content-box">纯洁的微笑</div>
          </a>
        </li>

        <li class="item">
          <div class="logo-box">
            <img src="https://poile-img.nos-eastchina1.126.net/friend-link/spring4all.ico">
          </div>
          <div class="content-box">spring4all</div>
        </li>

        <li class="item">
          <div class="logo-box">
            <img src="https://poile-img.nos-eastchina1.126.net/friend-link/chengxunyuandd.ico">
          </div>
          <div class="content-box">程序员DD</div>
        </li>

        <li class="item">
          <div class="logo-box">
            <img src="https://poile-img.nos-eastchina1.126.net/friend-link/cunjieweixiao.ico">
          </div>
          <div class="content-box">纯洁的微笑</div>
        </li>

        <li class="item">
          <div class="logo-box">
            <img src="https://poile-img.nos-eastchina1.126.net/friend-link/spring4all.ico">
          </div>
          <div class="content-box">spring4all</div>
        </li>

        <li class="item">
          <div class="logo-box">
            <img src="https://poile-img.nos-eastchina1.126.net/friend-link/jc.ico">
          </div>
          <div class="content-box">南城往事</div>
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
