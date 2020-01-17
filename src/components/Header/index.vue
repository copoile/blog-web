<template>
  <div class="main-header-box">
    <header class="main-header">
      <div class="container">
        <a href="#" class="logo">
          <svg-icon icon-class="logo" class="logo-svg" />
          <span class="logo-title">个人阅读分享</span>
        </a>

        <nav class="main-nav">
          <!-- 导航栏目 -->
          <ul class="main-nav-list">
            <li class="main-nav-item">首页</li>
            <li class="main-nav-item">分类</li>
            <li class="main-nav-item">归档</li>
            <li class="main-nav-item">友链</li>
            <li class="main-nav-item">留言</li>
          </ul>
          <!-- 搜索框 -->
          <div class="search-box">
            <el-input
              v-model="content"
              size="medium"
              placeholder="搜索文章"
              @focus="inputFocus"
              @blur="inputBlur"
            >
              <i slot="suffix" class="el-input__icon el-icon-search" :style="'color:' + inputIconColor" />
            </el-input>
          </div>
          <!-- 右边box -->
          <div class="right-box">

            <!-- 登录·注册 -->
            <div class="nologin">
              <div class="login-btn" @click="showLogin=true">登录</div><div class="reg-btn">注册</div>
            </div>
          </div>

        </nav>
      </div>
    </header>
    <el-dialog
      title="注册"
      top="30vh"
      width="318px"
      custom-class="login-dialog"
      :close-on-click-modal="false"
      :visible.sync="showLogin"
      :before-close="loginClose"
    >
      <el-input v-model="reForm.username" placeholder="用户名字母开头, 允许2-16字节" />
      <el-input v-model="reForm.mobile" placeholder="请输入手机号" />
      <el-input
        v-model="reForm.code"
        placeholder="手机验证码"
      >
        <span slot="suffix" class="code-btn">获取验证码</span>
      </el-input>
      <el-input v-model="reForm.password" placeholder="密码不能少于6位数" />
       <el-button type="primary">注册</el-button>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: '',
      inputIconColor: '',
      showLogin: false,
      reForm: {
        username: '',
        mobile: '',
        code: '',
        password: ''
      }
    }
  },
  methods: {
    inputFocus() {
      this.inputIconColor = '#1989fa'
    },
    inputBlur() {
      this.inputIconColor = ''
    },
    loginClose() {
      this.showLogin = false
    }
  }
}

</script>

<style lang="scss" scoped>
.main-header-box {
  height: 60px;
  width: 100%;
  position: relative;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);

  .main-header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    border-bottom: 1px solid #f1f1f1;
    color: #909090;
    height: 60px;
    z-index: 250;

    .container {
      height: 100%;
      max-width: 960px;
      margin: auto;
      display: flex;
      align-items: center;
      overflow: hidden;

      .logo {
        min-width: 80px;
        color: #007fff;
        display: flex;
        align-items: center;

        @media screen and (max-width: 450px){
          display: none;
        }

        .logo-svg {
          width: 32px;
          height: 32px;
        }

        .logo-title {
          font-size: 20px;
          display: inline-block;
          font-weight: bold;
        }
      }

      .main-nav {
        flex: 1;
        height: 100%;
        align-items: center;
        display: flex;
        flex-wrap: nowrap;

        .main-nav-list {
          margin: 0;
          display: flex;
          align-items: center;
          cursor: pointer;

          .main-nav-item {
            list-style: none;
            line-height: 60px;
            padding-right: 18px;
            transition: all .3s;

            &:hover {
              color: #007fff;
            }
          }
        }

        .search-box {
          display: flex;
          align-items: center;
          flex-direction: row-reverse;
          width: 290px;
          box-sizing: border-box;
          padding-left: 130px;

          /deep/ .el-input__inner {
            background: #f4f5f5;
          }

          .el-icon-search {
            font-size: 18px;
            cursor: pointer;
          }

          @media screen and (max-width: 700px){
            display: none;
          }
        }

        .right-box {
          display: flex;
          align-items: center;
          width: 150px;
          flex-direction: row-reverse;

          @media screen and (max-width: 850px){
            display: none;
          }

          .nologin {
            height: 100%;
            color: #007fff;
            display: flex;
            align-items: center;

            .login-btn {
              cursor: pointer;
              line-height: 60px;

              &:after {
                content: "·";
                font-weight: bold;
                margin: 0 5px;
              }
            }

            .reg-btn {
              cursor: pointer;
              line-height: 60px;
            }
          }
        }
      }
    }
  }

  /deep/ .el-dialog__body {
    padding-left: 25px;
    padding-right: 25px;
    padding-top: 10px;
  }

  /deep/ .el-dialog__title {
    font-weight: bold;
  }

  .login-dialog {
    font-size: 14px;

    .el-input {
      margin-bottom: 10px;
    }

    .code-btn {
      color: #007fff;
      position: relative;
      top: 10px;
      right: 5px;
    }
  }
}
</style>
