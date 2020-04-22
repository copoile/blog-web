<template>
  <div class="container">
    <app-header :nav-item-active="-1" />
    <div class="content-container animated fadeInUp">
      <h3>重置密码</h3>
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input v-model="form.mobile" placeholder="输入手机号" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.code" placeholder="验证码">
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
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" placeholder="密码至少6位数" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password2" placeholder="确认密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%;" :loading="loading" @click="submit">确定</el-button>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <router-link to="/" type="text" style="width: 100%;text-align: center;color: #007fff;">返回首页</router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { sendCode } from '@/api/code.js'
import { resetPassword } from '@/api/user.js'
import AppHeader from '@/components/Header/index'
import { validMobile } from '@/utils/validate.js'
export default {
  components: {
    AppHeader
  },
  data() {
    return {
      loading: false,
      form: {
        mobile: '',
        name: '',
        code: '',
        password: '',
        password2: ''
      },
      timer: null,
      codeCount: 0
    }
  },

  methods: {

    // 提交
    submit() {
      if (this.vsubmit()) {
        console.log('xxx')
        this.loading = true
        const parmas = { mobile: this.form.mobile, code: this.form.code, password: this.form.password }
        resetPassword(parmas).then(
          res => {
            this.loading = false
            this.$message({
              message: '重置成功',
              type: 'success'
            })
          },
          error => {
            console.error(error)
            this.loading = false
          }
        )
      }
    },

    // 提交验证
    vsubmit() {
      const mobile = this.form.mobile
      if (mobile === '') {
        this.$message('请输入手机号')
        return false
      }
      if (!validMobile(mobile)) {
        this.$message('手机号格式不正确')
        return false
      }
      const code = this.form.code
      if (code === '') {
        this.$message('请输入验证码')
        return false
      }
      const password = this.form.password
      if (password === '') {
        this.$message('请输入新密码')
        return false
      }
      if (password.length < 6) {
        this.$message('密码不能少于6位数')
        return false
      }
      if (password !== this.form.password2) {
        this.$message('两次密码不一致')
        return false
      }
      return true
    },

    // 发送验证码
    sendCode() {
      const mobile = this.form.mobile
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
.container {
  @import '~@/styles/variables';
   width: 100%;
   height: 100vh;
   overflow-x: hidden;
   overflow-y: -webkit-overlay;
   overflow-y: overlay;

   @media screen and (max-width: 922px){
     background: #fff;
   }

  .content-container {
    width: 100%;
    max-width: 470px;
    box-sizing: border-box;
    margin: 0 auto;
    margin-top: 7%;
    background: #fff;
    border-radius: 4px;
    padding: 30px;
    padding-bottom: 5px;

    @media screen and (max-width: 922px){
      margin-top: 0;
    }

    h3 {
      font-weight: 700;
      font-size: 20px;
      text-align: center;
      margin: 0;
      padding: 0;
      margin-bottom: 30px;
    }

    .el-form {
      width: 80%;
      margin: 0 auto;

      .code-btn {
        color: #007fff;
        position: relative;
        right: 10px;
      }
    }
  }
}
</style>
