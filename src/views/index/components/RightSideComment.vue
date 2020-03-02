<template>
  <div class="container">
    <div class="head">最近评论</div>
    <ul class="content-list">
      <li class="list-item">
        <div class="avatar-wrapper">
          <img class="user-avatar" src="https://poile-img.nos-eastchina1.126.net/me.png">
        </div>
        <div class="content-box">
          <p class="content-row text-ellipsis">爱江山不爱美人&emsp;1天前(6月18日)</p>
          <p class="content-row text text-ellipsis">小伙子，来玩下啊！！！尼玛的，来玩下啊！！！尼玛的，来玩下啊！！！</p>
        </div>
      </li>

      <li class="list-item">
        <div class="avatar-wrapper">
          <img class="user-avatar" src="https://poile-img.nos-eastchina1.126.net/me.png">
        </div>
        <div class="content-box">
          <p class="content-row">校园同学&emsp;1天前(6月18日)</p>
          <p class="content-row text">小伙子，来玩下啊！！！</p>
        </div>
      </li>

      <li class="list-item">
        <div class="avatar-wrapper">
          <img class="user-avatar" src="https://poile-img.nos-eastchina1.126.net/me.png">
        </div>
        <div class="content-box">
          <p class="content-row">校园同学&emsp;1天前(6月18日)</p>
          <p class="content-row text">小伙子，来玩下啊！！！</p>
        </div>
      </li>

      <li class="list-item">
        <div class="avatar-wrapper">
          <img class="user-avatar" src="https://poile-img.nos-eastchina1.126.net/me.png">
        </div>
        <div class="content-box">
          <p class="content-row">校园同学&emsp;1天前(6月18日)</p>
          <p class="content-row text">小伙子，来玩下啊！！！</p>
        </div>
      </li>

      <li class="list-item">
        <div class="avatar-wrapper">
          <img class="user-avatar" src="https://poile-img.nos-eastchina1.126.net/me.png">
        </div>
        <div class="content-box">
          <p class="content-row">校园同学&emsp;1天前(6月18日)</p>
          <p class="content-row text">小伙子，来玩下啊！！！</p>
        </div>
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
  padding-bottom: 5px;
  color: #2e3135;

  .head {
    border-bottom: 1px solid hsla(0,0%,59.2%,.2);
    padding: 12px 10px;
  }

  .content-list {
    width: 100%;
    padding: 0;
    margin: 0px;
    box-sizing: border-box;
    padding: 10px;

    .list-item {
      width: 100%;
      list-style: none;
      display: flex;
      margin-bottom: 5px;

      .avatar-wrapper {
        position: relative;

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }
      }

      .content-box {
        flex: 1;
        overflow: hidden;
        font-size: 12px;
        height: 40px;
        padding-left: 5px;
        padding-top: 3px;
        padding-bottom: 2px;
        line-height: 18px;
        color: #909090;

        .content-row {
          padding: 0;
          margin: 0;
        }

        .text {
          color: #2e3135;
          cursor: pointer;

          &:hover {
            color: #007fff;
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
