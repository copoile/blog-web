<!-- 注册弹框组件 -->
<template>
  <el-dialog
    title="注册"
    top="25vh"
    width="318px"
    custom-class="register-dialog"
    :visible.sync="visible"
    :close-on-click-modal="false"
    :lock-scroll="false"
  >
    <el-input v-model="username" placeholder="用户名字母开头, 允许2-16字节" />
    <el-input v-model="mobile" placeholder="手机号用于登录和找回密码" />
    <el-input
      v-model="code"
      placeholder="验证码"
    >
      <span slot="suffix" class="code-btn btn">获取验证码</span>
    </el-input>
    <el-input v-model="password" placeholder="密码不能少于6位数" />
    <el-button type="primary" size="medium">注册</el-button>
    <p>注册登录即表示同意<a href="#" style="color: #007fff;">用户协议、隐私政策</a></p>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      mobile: '',
      code: '',
      password: '',
      visible: false
    }
  },
  methods: {
    bClose() {
      this.visible = false
      this.username = ''
      this.mobile = ''
      this.code = ''
      this.password = ''
    },

    open() {
      this.visible = true
    }
  }
}
</script>

<style lang="scss" scoped>

.register-dialog {
  font-size: 14px;

  .el-input {
    margin-bottom: 10px;
  }

  .el-button {
    width: 100%;
    margin-bottom: 20px;
  }

  .login-tip {
    text-align: center;
    color: #007fff;
    margin-bottom: 10px;
  }

  .code-btn {
    color: #007fff;
    position: relative;
    top: 10px;
    right: 5px;
  }
}
</style>
