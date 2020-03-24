<template>
  <div id="live2d-container">
    <canvas
      id="live2d"
      :style="!visible?'visibility:hidden':''"
      width="220"
      height="300"
      class="live2d"
    />
    <div class="btn visible-btn" @click="visible=!visible">
      <img src="https://poile-img.nos-eastchina1.126.net/1584865141362.png">
      <svg-icon v-show="visible" icon-class="line" class="line-icon" />
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
// 拖动
$(function() { $('#live2d').draggable() })
export default {
  data() {
    return {
      visible: true
    }
  },

  mounted() {
    setTimeout(() => {
      loadlive2d('live2d', 'https://poile-img.nos-eastchina1.126.net/live2d/model.json')
    }, 500)
  }
}
</script>

<style lang="scss" scoped>
#live2d-container {
  position: fixed;
  right: 0;
  bottom: -15px;
  z-index: 9999;

  .message-box {
    opacity: 0;
    color: #fff;
    box-sizing: border-box;
    width: 200px;
    height: auto;
    margin: 0;
    padding: 2px;
    top: -25px;
    text-align: center;
    border: 2px solid rgba(75, 127, 199, 0.9);
    border-radius: 5px;
    background-color: rgba(74, 59, 114, 0.9);
    font-size: 12px;
    text-overflow: ellipsis;
    text-transform: uppercase;
    overflow: hidden;
    position: absolute;

    .live2d-msg {
      display: block;
      line-height: 20px;
      padding: 0 20px;
      color: #fff;
      font-size: 13px;
      word-wrap: break-spaces;
      font-weight: 400;
      user-select: none;
      position: relative;
    }
  }

  .visible-btn {
    position: fixed;
    right: 10px;
    bottom: 10px;
    background:  rgba(74, 59, 114, 0.9);
    font-size: 12px;
    color: #fff;
    border-radius: 5px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #ccc;
    overflow: hidden;

    &::after {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: rgba(0,0,0,.3);
      border-radius: 50%;
      z-index: 9;
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }

    .line-icon {
      position: absolute;
      z-index: 99;
      top: 50%;
      left: 50%;
      width: 50px;
      height: 50px;
      transform: translate(-50%,-50%);
      opacity: .6;
    }
  }

  @media screen and (max-width: 960px) {
    display: none;
  }
}
</style>
