<template>
  <div class="container">
    <app-header :nav-item-active="-1" />
    <div class="content-container">
      <h3>绑定邮箱</h3>
      <el-form v-show="!success" :model="form">
        <el-form-item>
          <el-input v-model="form.email" placeholder="输入邮箱" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%;" :loading="loading" @click="submit">确定</el-button>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <router-link to="/" type="text" style="width: 100%;text-align: center;color: #007fff;">返回首页</router-link>
        </el-form-item>
      </el-form>
      <div v-show="success" class="success-content">
        <p>验证邮件已发送至{{ form.email }}</p>
        <p>请至你的邮箱查收，点击邮件里的确认链接，进行邮箱确认操作。</p>
      </div>
    </div>
    <div v-show="success" class="tip-content">
      若你没有收到邮件可以：检查你的垃圾邮件，是否包含验证邮件；或者&ensp;
      <span style="color: #007fff;font-size: 12px;" class="btn" @click="success = 0">重新发送验证邮件</span>
    </div>
  </div>
</template>

<script>
import { validateEmail } from '@/api/user.js'
import { validEmail } from '@/utils/validate.js'
import AppHeader from '@/components/Header/index'
export default {
  components: {
    AppHeader
  },
  data() {
    return {
      loading: false,
      form: {
        email: ''
      },
      success: false
    }
  },

  methods: {

    // 提交
    submit() {
      const email = this.form.email
      if (email === '') {
        this.$message('请输入邮箱')
        return
      }
      if (!validEmail(email)) {
        this.$message('邮箱格式不正确')
        return
      }
      this.loading = true
      const params = { email: email }
      validateEmail(params).then(
        res => {
          this.loading = false
          this.success = true
        },
        () => {
          this.loading = false
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

    h3 {
      font-weight: 700;
      font-size: 20px;
      text-align: center;
      margin: 0;
      padding: 0;
      margin-bottom: 25px;
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

    .success-content {
      text-align: center;
      color: #6cc046;
      padding-bottom: 30px;
      font-size: 14px;

      p {
        padding: 0;
        margin: 0;
        line-height: 24px;
      }
    }
  }

  .tip-content {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    font-size: 13px;
    color: #999;
    text-align: center;
    margin-top: 30px;
  }
}
</style>
