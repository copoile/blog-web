<template>
  <div class="container">
    <app-header :nav-item-active="-1" />
    <div class="content-container">
      <h3>更换手机号</h3>
      <el-steps :active="active" align-center>
        <el-step title="验证身份" icon="el-icon-unlock" />
        <el-step title="更换" icon="el-icon-mobile-phone" />
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
          <el-button type="primary" style="width: 100%;" :loading="loading" @click="submit">下一步</el-button>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <router-link to="/" type="text" style="width: 100%;text-align: center;color: #007fff;">返回首页</router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/Header/index'
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
      active: 1
    }
  },
  methods: {

    // 按钮点击
    submit() {
      this.active = 2
    },

    // 发送验证码
    sendCode() {
      console.log('sending')
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
