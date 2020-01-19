<template>
  <div class="container">
    <div class="head">推荐阅读</div>
    <ul class="content-list">
      <li class="list-item">
        <p class="content-row title">Centos7系统安装mysql教程</p>
        <p class="content-row">阅读&ensp;100</p>
      </li>
      <li class="list-item">
        <p class="content-row title">程序员过年如何向亲戚朋友介绍自己的职业？</p>
        <p class="content-row">阅读&ensp;120</p>
      </li>
      <li class="list-item">
        <p class="content-row title">彻底弄懂Session、Cookie、Token看这篇文章就够了！！！</p>
        <p class="content-row">阅读&ensp;190</p>
      </li>
      <li class="list-item">
        <p class="content-row title">程序员过年如何向亲戚朋友介绍自己的职业？</p>
        <p class="content-row">阅读&ensp;120</p>
      </li>
      <li class="list-item">
        <p class="content-row title">彻底弄懂Session、Cookie、Token看这篇文章就够了！！！</p>
        <p class="content-row">阅读&ensp;190</p>
      </li>
    </ul>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  background: #fff;
  border-radius: 2px;
  margin-bottom: 10px;
  padding-bottom: 10px;

  .head {
    color: #2e3135;
    border-bottom: 1px solid hsla(0,0%,59.2%,.2);
    padding: 12px 10px;
  }

  .content-list {
    margin: 10px;
    padding: 0;
    .list-item {
      list-style: none;
      line-height: 15px;
      margin-bottom: 10px;

      .content-row {
        margin: 0;
        padding: 0;
        font-size: 12px;
        margin-bottom: 5px;
      }

      .title {
        font-size: 13px;
        color: #2e3135;
        cursor: pointer;
        line-height: 18px;

        &:hover {
          color: #007fff;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
