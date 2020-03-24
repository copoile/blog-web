<template>
  <div class="app-container">
    <div class="setting-box">
      <h1>个人信息</h1>
      <ul class="setting-list">
        <li class="item">
          头像
        </li>
        <li class="item">
          <span class="label">用户名</span>
          <div class="input-wrapper">
            <el-input v-model="title" placeholder="填写你的用户名" />
          </div>
          <div class="action-box">
            <span><i class="el-icon-edit" />修改</span>
          </div>
        </li>
        <li class="item">
          <span class="label">昵称</span>
          <div class="input-wrapper">
            <el-input v-model="title" placeholder="填写你的昵称" />
          </div>
          <div class="action-box">
            <span><i class="el-icon-edit" />修改</span>
          </div>
        </li>
        <li class="item">
          <span class="label">手机号</span>
          <div class="input-wrapper">
            <el-input v-model="title" placeholder="绑定你的手机号" />
          </div>
          <div class="action-box">
            <span><i class="el-icon-edit" />更改绑定</span>
          </div>
        </li>
        <li class="item">
          <span class="label">邮箱</span>
          <div class="input-wrapper">
            <el-input v-model="title" placeholder="未绑定邮箱" />
          </div>
          <div class="action-box">
            <span><i class="el-icon-edit" />立即绑定</span>
          </div>
        </li>
        <li class="item">
          <span class="label">生日</span>
          <div class="input-wrapper">
            <el-input v-model="title" placeholder="选择你的生日" />
          </div>
          <div class="action-box">
            <span><i class="el-icon-edit" />修改</span>
          </div>
        </li>
        <li class="item">
          <span class="label">性别</span>
          <div class="input-wrapper">
            <el-input v-model="title" placeholder="选择你的性别" />
          </div>
          <div class="action-box">
            <span><i class="el-icon-edit" />修改</span>
          </div>
        </li>

        <li class="item">
          <span class="label">简介</span>
          <div class="input-wrapper">
            <el-input v-model="title" placeholder="填写你的简介" />
          </div>
          <div class="action-box">
            <span><i class="el-icon-edit" />修改</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      title: ''
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'roles'
    ])
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 10px;
  box-sizing: border-box;
  background: #eee;
  min-height: calc(100vh - 50px);
  position: relative;

  .setting-box {
    margin-top: 5vh;
    margin-left: 30vw;
    width: 600px;
    max-width: 100%;
    background: #fff;

    padding: 20px 20px;

    h1 {
      font-size: 20px;
      font-weight: 700;
      padding: 0;
      padding-bottom: 15px;
      border-bottom: 1px solid #f1f1f1;
    }

    .setting-list {
      margin: 0;
      padding: 0;

      .item {
        list-style: none;
        border-bottom: 1px solid #f1f1f1;
        padding: 24px 0;
        line-height: 24px;
        display: flex;
        align-items: center;

        .label {
          min-width: 60px;
        }

        .input-wrapper {
          flex: 1;
          & /deep/ .el-input__inner {
            border: none;
            border-bottom: none;
            border-radius: 0;
          }
        }

        .action-box {
          font-size: 12px;
          color: #007fff;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
