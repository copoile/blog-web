<template>
  <div class="post-container">
    <p class="info">如对文本章有疑问欢迎在评论区指出，也可私聊我哦。同时，也欢迎正在阅读的你入驻本站，一起分享！</p>
    <div class="post-copyright">
      <p><span class="bold">本文作者：</span>{{ authorNickname }}</p>
      <p><span class="bold">原文链接：</span>{{ url }}</p>
      <p><span class="bold">版权声明：</span> 本站点所有文章除特别声明外，均采用 CC BY 3.0 CN协议进行许可。转载请署名作者且注明文章出处。</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: ''
    },
    authorNickname: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.post-container {
  margin-top: 50px;

  .info {
    color: #999;
    font-size: 12px;
  }

  .post-copyright {
    padding: 0.5em 1em;
    border-left: 3px solid #ff1700;
    background-color: #f9f9f9;
    list-style: none;
    font-size: 12px;
    line-height: 22px;

    .bold {
      font-weight: bold;
    }
  }
}

</style>
