<template>
  <div class="post-container">
    <p class="info">如对文本章有疑问欢迎在评论区指出哦。同时，也欢迎正在阅读的你入驻本站，一起分享！</p>
    <div class="post-copyright">
      <p><span class="bold">{{ original === 1? '本' : '原' }}文链接：</span>{{ url }}</p>
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
    original: {
      type: Number,
      default: 1
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
    padding: 4px 10px;
    border-left: 3px solid #ff1700;
    background-color: #f9f9f9;
    list-style: none;
    font-size: 12px;
    line-height: 15px;

    p {
      padding: 0;
      margin: 8px 0;
    }

    .bold {
      font-weight: bold;
    }
  }
}

</style>
