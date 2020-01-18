/**
 * 登录弹框组件
 */
<template>
  <el-dialog
    top="25vh"
    width="318px"
    custom-class="login-dialog"
    :close-on-click-modal="false"
    :visible.sync="show"
    :before-close="bClose"
  >
    <span slot="title">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        class="btn tab"
        :class="{ 'active': active === index }"
        @click="tabClick(index)"
      >{{ item }}</span>
    </span>
    <el-input v-model="username" placeholder="用户名" />
    <el-input v-if="active === 0" v-model="password" placeholder="密码" />
    <el-input
      v-else
      v-model="code"
      placeholder="手机验证码"
    >
      <span slot="suffix" class="code-btn btn">获取验证码</span>
    </el-input>
    <el-button type="primary" size="medium" :loading="loading" @click="login">登录</el-button>
    <p class="tip">
      <span class="active tab right">忘记密码^_^?</span>
    </p>
    <p>注册登录即表示同意<a href="#" style="color: #007fff;">用户协议、隐私政策</a></p>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      username: '',
      password: '',
      code: '',
      tabs: ['密码登录', '免密登录'],
      active: 0,
      loading: false
    }
  },
  methods: {
    // 关闭弹框事件
    bClose() {
      this.username = ''
      this.password = ''
      this.code = ''
      this.active = 0
      this.show = false
    },
    // 打开弹框，父组件调用
    open() {
      this.show = true
    },
    // tab切换
    tabClick(index) {
      this.active = index
    },
    // 登录
    login() {
      this.loading = true
      this.$store.commit('user/SET_TOKEN', null)
      if (this.active === 0) {
        this.passwordLogin()
      } else {
        this.codeLogin()
      }
    },
    // 密码登录
    passwordLogin() {
      const username = this.username
      const password = this.password
      if (username === '') {
        this.$message('请输入用户名')
        return
      }
      if (this.password === '') {
        this.$message('请输入密码')
        return
      }
      const form = {
        username: username,
        password: password
      }
      this.$store.dispatch('user/accountLogin', form).then(() => {
        this.$store.dispatch('user/getUserInfo')
        this.$router.push({ path: '/' })
        this.loading = false
        this.show = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 验证码登录
    codeLogin() {
      console.log('验证码登录')
    }
  }
}
</script>

<style lang="scss" scoped>
.login-dialog {
  font-size: 14px;

  .tab {
    padding-right: 5px;
  }

  .active {
    color: #007fff;
  }

  .el-input {
    margin-bottom: 10px;
  }

  .el-button {
    width: 100%;
  }

  .code-btn {
    color: #007fff;
    position: relative;
    top: 10px;
    right: 5px;
  }

  .tip {
    margin-bottom: 20px;
  }

}
</style>
