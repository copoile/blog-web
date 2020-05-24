<template>
  <div
    v-loading="loading"
    class="container"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
  >
    <app-header :nav-item-active="-1" />
    <div v-if="!loading && !success" class="content-box">
      <h3 class="name">登录失败</h3>
      <p class="content">{{ content }}</p>
      <router-link to="/" type="text" style="width: 100%;text-align: center;color: #007fff;">返回首页</router-link>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/Header/index'
export default {
  name: 'Oauth',
  components: {
    AppHeader
  },
  data() {
    return {
      loading: true,
      success: true,
      content: '第三方登录失败，请联系管理员。'
    }
  },
  created() {
    this.oauth()
  },
  methods: {
    oauth() {
      const code = this.$route.query.code || null
      const state = this.$route.query.state || null
      if (!code || !state) {
        this.loading = false
        this.success = false
        this.content = '参数缺失，第三方登录失败'
        return
      }
      const params = { type: state, code: code }
      new Promise(async(resolve, reject) => {
        try {
          await this.$store.dispatch('user/thirdLogin', params)
          const { roles } = await this.$store.dispatch('user/getUserInfo')
          const accessRoutes = await this.$store.dispatch('permission/generateRoutes', roles)
          this.$router.addRoutes(accessRoutes)
          this.loading = false
          this.$router.push('/')
          resolve()
        } catch (error) {
          this.content = error
          this.success = false
          this.loading = false
          reject(error)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  position: relative;

  .content-box {
    text-align: center;
    width: 100%;
    max-width: 470px;
    box-sizing: border-box;
    background: #fff;
    border-radius: 4px;
    padding: 30px;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%,-50%);

    .content {
      color: #f56c6c;
    }
  }
}
</style>
