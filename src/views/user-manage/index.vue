<template>
  <div class="app-container">
    <div
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="#fff"
      class="card-container"
    >
      <el-card v-for="(item, index) in userList" :key="index" :body-style="{ padding: '0px' }" shadow="hover">
        <img :src="item.avatar||defaultAvatar" class="avatar">
        <div class="content-box">
          <div class="row">昵称:&ensp;{{ item.nickname }}</div>
          <div class="row">用户名:&ensp;{{ item.username }}</div>
          <div class="row">手机号:&ensp;{{ item.mobile }}<span v-if="!item.mobile" style="color: #999;">未绑定</span></div>
          <div class="row">邮箱:&ensp;{{ item.email }}<span v-if="!item.email" style="color: #999;">未绑定</span></div>
          <div class="row">性别:&ensp;{{ item.gender===1?'男':'女' }}</div>
          <div class="row">用户状态:&ensp;
            <el-switch
              v-model="item.enable"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="启用"
              inactive-text="禁用"
              @change="enableChange(item)"
            />
          </div>
          <div class="content-item">角色:&ensp;
            <el-tag type="success" size="small">{{ item.admin===1?'管理员':'游客' }}</el-tag>
          </div>
          <div class="content-item">注册时间:&ensp;{{ item.createTime }}</div>
        </div>
      </el-card>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="size"
      :current-page="current"
      :total="total"
      :hide-on-single-page="true"
      @current-change="currentChange"
    />
  </div>
</template>

<script>
import { formatDate } from '@/utils/index.js'
import { mapGetters } from 'vuex'
import { pageUser, updateStatus } from '@/api/user.js'
export default {
  data() {
    return {
      loading: true,
      current: 1,
      size: 15,
      total: 0,
      value2: true,
      userList: []
    }
  },

  computed: {
    ...mapGetters([
      'defaultAvatar'
    ])
  },

  mounted() {
    this.pageUser()
  },

  methods: {

    // 分页获取数据
    pageUser() {
      this.loading = true
      const params = { current: this.current, size: this.size }
      pageUser(params).then(
        res => {
          this.loading = false
          const records = res.data.records
          records.forEach(ele => {
            ele.createTime = formatDate(new Date(ele.createTime), 'yyyy-MM-dd')
            ele.enable = ele.status === 0
          })
          this.total = res.data.total
          this.userList = records
        }
      )
    },

    // 分页变化
    currentChange(val) {
      this.current = val
      this.pageUser()
    },

    // 禁用启用开关
    enableChange(item) {
      const status = item.enable ? 0 : 2
      const params = { userId: item.id, status: status }
      updateStatus(params)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  margin: 10px;
  position: relative;

  @media screen and (max-width: 922px){
    padding: 0;
    margin: 0;
  }

  .card-container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;

    @media screen and (max-width: 922px){
      padding-top: 15px;
      justify-content: space-around;
    }

    .el-card {
      position: relative;
      margin: 0;
      padding: 0;
      min-width: 300px;
      min-height: 260px;
      margin-bottom: 20px;
      margin-right: 20px;
      text-align: center;

      @media screen and (max-width: 922px){
        max-width: 46%;
        margin: 0px;
        margin-bottom: 15px;
      }

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 1px solid #ccc;
        margin: 0 auto;
        margin-top: 30px;
      }

      .content-box {
        font-weight: 500;
        text-align: left;
        padding: 15px;
        line-height: 30px;
        color: #409EFF;
        padding-top: 20px;
      }
    }
  }
}
</style>
