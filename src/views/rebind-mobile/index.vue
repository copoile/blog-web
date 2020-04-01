<template>
  <div class="container">
    <app-header :nav-item-active="-1" />
    <div class="content-container">
      <h3>更换手机号</h3>
      <el-steps :active="active" align-center>
        <el-step title="验证身份" icon="el-icon-unlock" />
        <el-step title="更换手机号" icon="el-icon-mobile-phone" />
      </el-steps>

      <el-form>
        <el-form-item>
          <el-input v-model="mobile" placeholder="输入手机号" />
        </el-form-item>
        <el-form-item>
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
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="width: 100%;"
            :loading="loading"
            @click="submit"
          >{{ active === 1 ? '下一步' : '提交' }}</el-button>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <router-link to="/" type="text" style="width: 100%;text-align: center;color: #007fff;">返回首页</router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validateMobile, bindMobile } from '@/api/user.js'
import AppHeader from '@/components/Header/index'
import { validMobile } from '@/utils/validate.js'
import { sendCode } from '@/api/code.js'
export default {
  components: {
    AppHeader
  },
  data() {
    return {
      loading: false,
      code: '',
      mobile: '',
      codeCount: 0,
      timer: null,
      active: 1
    }
  },
  methods: {

    // 按钮点击
    submit() {
      if (this.vsubmit()) {
        this.loading = true
        const params = { mobile: this.mobile, code: this.code }
        const active = this.active
        if (active === 1) {
          validateMobile(params).then(
            res => {
              this.loading = false
              this.active = 2
              this.mobile = ''
              this.code = ''
              this.timer = null
              this.codeCount = 0
            },
            error => {
              console.error(error)
              this.loading = false
            }
          )
        } else {
          bindMobile(params).then(
            res => {
              this.$message({
                message: '更换成功',
                type: 'success'
              })
              this.$store.dispatch('user/getUserInfo').then(res => this.$router.push('/user/info'))
            },
            error => {
              console.error(error)
              this.loading = false
            }
          )
        }
      }
    },

    // 提交校验
    vsubmit() {
      const mobile = this.mobile
      if (mobile === '') {
        this.$message('请输入手机号')
        return false
      }
      if (!validMobile(mobile)) {
        this.$message('手机号格式不正确')
        return false
      }
      if (this.code === '') {
        this.$message('请输入验证码')
        return false
      }
      return true
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
.container {
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

    .el-steps {
      width: 100%;
      margin: 0 auto;
    }

    .el-form {
      width: 70%;
      margin: 0 auto;
      margin-top: 30px;

      .code-btn {
        color: #007fff;
        position: relative;
        right: 10px;
      }
    }

    /deep/ .el-step__title.is-process {
      font-weight: normal;
    }
  }
}
</style>
