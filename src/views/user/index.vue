<template>
  <div class="app-container">
    <div class="setting-box">
      <h1>个人信息</h1>
      <ul class="setting-list">
        <li class="item">
          <span class="label">头像</span>
          <div class="avatar-wrapper">
            <img :src="userInfo.avatar || defaultAvatar" class="user-avatar">
          </div>
          <div class="action-box">
            <div class="hint">支持 jpg、png 格式大小 200KB 以内的图片</div>
            <el-button type="primary" size="mini" style="padding: 5px 7px;">点击上传</el-button>
          </div>
        </li>
        <li class="item">
          <span class="label">用户名</span>
          <div class="input-wrapper">
            <el-input v-model="userInfo.username" disabled placeholder="填写你的用户名" />
          </div>
          <div class="action-box">
            <el-button type="text" disabled style="color: #C0C4CC;">
              <span><i class="el-icon-edit" />修改</span>
            </el-button>
          </div>
        </li>
        <li class="item">
          <span class="label">昵称</span>
          <div class="input-wrapper">
            <el-input v-model="form.nickname" placeholder="填写你的昵称" />
          </div>
          <div class="action-box">
            <span><i class="el-icon-edit" />修改</span>
          </div>
        </li>
        <li class="item">
          <span class="label">手机号</span>
          <div class="input-wrapper">
            <el-input v-model="form.mobile" disabled placeholder="绑定你的手机号" />
          </div>
          <div class="action-box">
            <el-button type="text">
              <span><i class="el-icon-mobile-phone" />更改绑定</span>
            </el-button>
          </div>
        </li>
        <li class="item">
          <span class="label">邮箱</span>
          <div class="input-wrapper">
            <el-input v-model="form.email" disabled placeholder="未绑定邮箱" />
          </div>
          <div class="action-box">
            <el-button type="text">
              <span><i class="el-icon-message" />立即绑定</span>
            </el-button>
          </div>
        </li>
        <li class="item">
          <span class="label">生日</span>
          <div class="input-wrapper">
            <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期" />
          </div>
          <div class="action-box">
            <el-button type="text">
              <span><i class="el-icon-date" />修改</span>
            </el-button>
          </div>
        </li>
        <li class="item">
          <span class="label">性别</span>
          <div class="input-wrapper">
            <el-select v-model="form.gender" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="form.gender"
              />
            </el-select>
          </div>
          <div class="action-box">
            <el-button type="text">
              <span><i class="el-icon-female" />修改</span>
            </el-button>
          </div>
        </li>

        <li class="item">
          <span class="label">简介</span>
          <div class="input-wrapper">
            <el-input v-model="form.brief" type="textarea" :rows="2" placeholder="填写你的简介" />
          </div>
          <div class="action-box">
            <el-button type="text">
              <span><i class="el-icon-edit" />修改</span>
            </el-button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'User',
  data() {
    return {
      options: [
        {
          value: 1,
          label: '男'
        },
        {
          value: 0,
          label: '女'
        }
      ],
      userInfo: '',
      form: {
        nickname: '',
        mobile: '',
        email: '',
        gender: 0,
        birthday: '',
        brief: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'defaultAvatar'
    ])
  },
  mounted() {
    const userInfo = this.$store.getters.userInfo
    this.userInfo = userInfo
    this.username = userInfo.username
    this.form.nickname = userInfo.nickname
    this.form.mobile = userInfo.mobile
    this.form.email = userInfo.email
    this.form.gender = userInfo.gender
    this.originalGender = userInfo.gender
    this.form.birthday = userInfo.birthday
    this.originalBirthday = userInfo.birthday
    this.form.brief = userInfo.brief
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 10px;
  box-sizing: border-box;
  background: #eee;
  min-height: calc(100vh - 50px);
  position: relative;

  .setting-box {
    margin-top: 2vh;
    margin-left: 50%;
    transform: translateX(-50%);
    width: 600px;
    max-width: 100%;
    background: #fff;

    padding: 20px;
    padding-top: 10px;

    h1 {
      font-size: 20px;
      font-weight: 700;
      padding: 0;
      padding-bottom: 10px;
    }

    .setting-list {
      margin: 0;
      padding: 0;

      .item {
        list-style: none;
        border-top: 1px solid #f1f1f1;
        padding: 20px 0;
        line-height: 24px;
        display: flex;
        align-items: center;

        .label {
          min-width: 60px;
        }

        .input-wrapper {
          flex: 1;
          & /deep/ .el-input__inner {
            border: none;
            border-bottom: none;
            border-radius: 0;
            background: #fff!important;
          }

          & /deep/ .el-textarea__inner {
            border: none;
            border-bottom: none;
            border-radius: 0;
          }
        }

        .action-box {
          font-size: 12px;
          color: #007fff;
          margin-right: 10px;
          margin-left: 10px;

          .hint {
              color: #909090;
              font-size: 12px;
          }
        }

        .el-button--text {
          font-weight: 400;
          font-size: 12px;
          color: #007fff;
        }

        .avatar-wrapper {
          position: relative;
          margin-right: 10px;

          .user-avatar {
            cursor: pointer;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 1px solid rgba(0, 0, 0, 0.1);
          }
        }
      }
    }
  }
}
</style>
