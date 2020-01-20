<template>
  <div class="container">
    <div class="head">标签
      <router-link class="right btn" to="/tag">全部标签</router-link>
    </div>
    <ul class="tag-list">
      <li v-for="item in tags" :key="item.id" class="list-item btn">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
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
  font-size: 14px;
  width: 100%;
  background: #fff;
  border-radius: 2px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  box-sizing: border-box;
  color: #2e3135;
  overflow: hidden;

  .head {
    border-bottom: 1px solid hsla(0,0%,59.2%,.2);
    padding: 12px 10px;

    .right {
      float: right;
      font-size: 12px;
      color: #007fff;
    }
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
</style>
