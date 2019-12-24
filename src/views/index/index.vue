<template>
  <div class="home-container">
    <home-header />
    <div class="conents">
      asdfasdf
    </div>
  </div>
</template>

<script>
import HomeHeader from './components/Header'
export default {
  name: 'Index',
  components: { HomeHeader },
  data() {
    return {
      name: '名称'
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
@import "~@/styles/variables.scss";
  .conents {
    z-index: 3;
    position: relative;
    // top: $homeHeadHeight;
    width: 1358px;
    height: auto;
    margin: 0 auto;
    padding: 40px 0 80px 0;
  }
}
</style>
