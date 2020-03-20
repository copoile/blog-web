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
    <el-input v-model="code" placeholder="验证码">
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
    <el-input v-model="password" placeholder="密码不能少于6位数" />
    <el-button type="primary" size="medium" :loading="loading" @click="submit">注册</el-button>
    <p>注册登录即表示同意<a href="#" style="color: #007fff;">用户协议、隐私政策</a></p>
  </el-dialog>
</template>

<script>
import { sendCode } from '@/api/code.js'
import { register } from '@/api/user.js'
import { validMobile } from '@/utils/validate.js'
export default {
  data() {
    return {
      username: '',
      mobile: '',
      code: '',
      password: '',
      codeCount: 0,
      timer: null,
      loading: false,
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
    },

    submit() {
      if (!this.vsubmit()) {
        const data = {
          username: this.username,
          password: this.password,
          mobile: this.mobile,
          code: this.code
        }
        this.loading = true
        register(data).then(
          res => {
            const params = { username: this.username, password: this.password }
            new Promise(async(resolve, reject) => {
              try {
                await this.$store.dispatch('user/accountLogin', params)
                const { roles } = await this.$store.dispatch('user/getUserInfo')
                const accessRoutes = await this.$store.dispatch('permission/generateRoutes', roles)
                this.$router.addRoutes(accessRoutes)
                this.$message({
                  message: '注册成功',
                  type: 'success'
                })
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
          error => {
            console.error(error)
            this.loading = false
          }
        )
      }
    },

    vsubmit() {
      const username = this.username
      if (username === '') {
        this.$message('请输入用户名')
        return false
      }
      if (!(/^[a-zA-Z][a-zA-Z0-9_]{1,15}$/.test(username))) {
        this.$message('用户名格式不正确')
        return false
      }

      const mobile = this.mobile
      if (mobile === '') {
        this.$message('请输入手机号')
        return false
      }
      if (!validMobile(mobile)) {
        this.$message('手机号格式不正确')
        return false
      }

      const code = this.code
      if (code === '') {
        this.$message('请输入验证码')
        return false
      }

      const password = this.password
      if (password === '') {
        this.$message('请输入密码')
        return false
      }

      if (password.length < 6) {
        this.$message('密码不能少于6位数')
        return false
      }
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
