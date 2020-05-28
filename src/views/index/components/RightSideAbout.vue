<template>
  <div class="container">
    <div class="avatar-wrapper">
      <img class="user-avatar" src="https://poile-img.nos-eastchina1.126.net/me.png">
    </div>
    <router-link to="/about">偶咧?我是谁?我怎么会这?[<span class="btn" style="color: #007fff;">关于</span>]</router-link>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 160px;
  background: #fff;
  border-radius: 2px;
  margin-bottom: 10px;
  text-align: center;
  box-sizing: border-box;
  padding-top: 40px;
  color: #2e3135;

  .avatar-wrapper {
    position: relative;

    .user-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
