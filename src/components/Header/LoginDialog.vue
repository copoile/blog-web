<!-- 登录弹框组件 -->
<template>
  <el-dialog top="25vh" width="318px" custom-class="login-dialog" :close-on-click-modal="false" :show-close="false" :visible="login_visible" :lock-scroll="false">
    <span slot="title">
      <span v-for="(item, index) in tabs" :key="index" class="btn tab" :class="{ active: active === index }" @click="tabClick(index)">{{ item }}</span>
      <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click="bClose"><i class="el-dialog__close el-icon el-icon-close" /></button>
    </span>

    <el-input v-if="active === 0" v-model="username" placeholder="用户名或手机号" />
    <el-input v-else v-model="mobile" placeholder="手机号" />
    <el-input v-if="active === 0" v-model="password" placeholder="密码" />
    <el-input v-else v-model="code" placeholder="验证码">
      <span v-show="!codeCount" slot="suffix" class="code-btn btn" @click="sendCode">获取验证码</span>
      <el-button
        v-show="codeCount"
        slot="suffix"
        type="primary"
        size="mini"
        disabled
        style="margin-top: 6px;"
      >{{ codeCount }}s</el-button>
    </el-input>
    <el-button type="primary" size="medium" :loading="loading" @click="login">登录</el-button>
    <p class="tip">
      <el-checkbox v-if="active === 0" v-model="checked">记住密码</el-checkbox>
      <span class="active btn" :class="{ right: active === 0 }" @click="forgetClick">忘记密码^_^?</span>
    </p>
    <p style="clear: both;">
      注册登录即表示同意
      <a href="#" style="color: #007fff;">用户协议、隐私政策</a>
    </p>
  </el-dialog>
</template>

<script>
import { validMobile } from '@/utils/validate.js'
import { mapGetters } from 'vuex'
import { setRemember, getRemember } from '@/utils/auth.js'
import { sendCode } from '@/api/code.js'
export default {
  data() {
    return {
      username: '',
      password: '',
      mobile: '',
      code: '',
      tabs: ['密码登录', '免密登录'],
      active: 0,
      checked: false,
      loading: false,
      codeCount: 0,
      timer: null
    }
  },
  computed: {
    ...mapGetters(['login_visible', 'login_username', 'login_password'])
  },

  mounted() {
    this.username = this.login_username || ''
    this.password = this.login_password || ''
    this.checked = getRemember() === '1'
  },

  methods: {
    // 关闭弹框事件
    bClose() {
      this.code = ''
      this.active = 0
      this.$store.commit('login/CHANGE_VISIBLE', false)
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
      const params = {
        username: username,
        password: password
      }
      new Promise(async(resolve, reject) => {
        try {
          await this.$store.dispatch('user/accountLogin', params)
          const { roles } = await this.$store.dispatch('user/getUserInfo')
          const accessRoutes = await this.$store.dispatch('permission/generateRoutes', roles)
          this.$router.addRoutes(accessRoutes)
          const checked = this.checked
          setRemember(checked ? '1' : '0')
          if (checked) {
            this.$store.dispatch('login/setUsernameAndPassword', params)
          } else {
            this.$store.dispatch('login/clearUsernameAndPassword')
          }
          this.loading = false
          this.bClose()
          resolve()
        } catch (error) {
          this.loading = false
          console.error(error)
          reject(error)
        }
      })
    },

    // 验证码登录
    codeLogin() {
      const mobile = this.mobile
      const code = this.code
      if (mobile === '') {
        this.$message('请输入手机号')
        return
      }
      if (!validMobile(mobile)) {
        this.$message('手机号格式不正确')
        return
      }
      if (code === '') {
        this.$message('请输入验证码')
        return
      }
      const params = {
        mobile: mobile,
        code: code
      }
      new Promise(async(resolve, reject) => {
        try {
          await this.$store.dispatch('user/codeLogin', params)
          const { roles } = await this.$store.dispatch('user/getUserInfo')
          const accessRoutes = await this.$store.dispatch('permission/generateRoutes', roles)
          this.$router.addRoutes(accessRoutes)
          this.loading = false
          this.bClose()
          resolve()
        } catch (error) {
          this.loading = false
          console.error(error)
          reject(error)
        }
      })
    },

    // 发送验证码
    sendCode() {
      const mobile = this.mobile
      if (mobile === '') {
        this.$message('请输入手机号')
        return
      }
      if (!validMobile(mobile)) {
        this.$message('手机号格式不正确')
        return
      }

      // 120倒数计时
      const TIME_COUNT = 120
      if (!this.timer) {
        this.codeCount = TIME_COUNT
        this.timer = setInterval(() => {
          if (this.codeCount > 0 && this.codeCount <= TIME_COUNT) {
            this.codeCount--
          } else {
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
      const params = { mobile: mobile }
      sendCode(params).then(
        res => {
          this.$message({
            message: '发送成功',
            type: 'success'
          })
        }
      )
    },

    // 忘记密码点击
    forgetClick() {
      this.$store.commit('login/CHANGE_VISIBLE', false)
      this.$router.push('/reset-password')
    }
  }
}
</script>

<style lang="scss" scoped>
.login-dialog {
  font-size: 14px;

  .tab {
    padding-right: 10px;
    font-weight: bold;
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
    padding: 0 2px;

    .right {
      float: right;
    }
  }
}
</style>
