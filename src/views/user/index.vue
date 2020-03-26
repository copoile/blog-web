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
            <div class="hint">支持 jpg、png 格式大小 300KB 以内的图片</div>
            <el-upload
              ref="upload"
              :action="path"
              :file-list="files"
              :multiple="false"
              :limit="1"
              :headers="headers"
              :auto-upload="true"
              :name="'file'"
              :on-exceed="onExceed"
              :before-upload="beforeUpload"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :show-file-list="false"
            >
              <el-button
                :loading="loading"
                type="primary"
                size="mini"
                style="padding: 5px 7px;"
              >点击上传</el-button>
            </el-upload>
          </div>
        </li>
        <li class="item">
          <span class="label">用户名</span>
          <div class="input-wrapper">
            <el-input v-model="userInfo.username" disabled placeholder="填写你的用户名" />
          </div>
          <div class="action-box">
            <el-button type="text" disabled style="color: #C0C4CC;">
              <span><i class="el-icon-lock" />不可修改</span>
            </el-button>
          </div>
        </li>
        <li class="item">
          <span class="label">昵称</span>
          <div class="input-wrapper">
            <el-input
              ref="nicknameIput"
              v-model="form.nickname"
              placeholder="填写你的昵称"
              @focus="nicknameIputFocus"
            />
          </div>
          <div class="action-box">
            <el-button v-show="!opVisible.nickname" type="text" @click="nicknameIputFocus">
              <span><i class="el-icon-edit" />修改</span>
            </el-button>
            <span v-show="opVisible.nickname">
              <el-button type="text" style="color: #999;" @click="cancelNickname">取消</el-button>
              <el-button type="text" @click="saveNickname">保存</el-button>
            </span>
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
            <el-date-picker
              ref="birthdayIput"
              v-model="form.birthday"
              type="date"
              :prefix-icon="''"
              placeholder="选择日期"
              :clearable="false"
              @focus="birthdayIputFocus"
            />
          </div>
          <div class="action-box">
            <el-button v-show="!opVisible.birthday" type="text" @click="birthdayIputFocus">
              <span><i class="el-icon-date" />修改</span>
            </el-button>
            <span v-show="opVisible.birthday">
              <el-button type="text" style="color: #999;" @click="cancelBirthday">取消</el-button>
              <el-button type="text" @click="saveBirthday">保存</el-button>
            </span>
          </div>
        </li>
        <li class="item">
          <span class="label">性别</span>
          <div class="input-wrapper">
            <el-select
              ref="genderIput"
              v-model="form.gender"
              placeholder="请选择"
              @focus="genderIputFocus"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="action-box">
            <el-button v-show="!opVisible.gender" type="text" @click="genderIputFocus">
              <span><i class="el-icon-female" />修改</span>
            </el-button>
            <span v-show="opVisible.gender">
              <el-button type="text" style="color: #999;" @click="cancelGender">取消</el-button>
              <el-button type="text" @click="saveGender">保存</el-button>
            </span>
          </div>
        </li>

        <li class="item">
          <span class="label">简介</span>
          <div class="input-wrapper">
            <el-input
              ref="briefIput"
              v-model="form.brief"
              type="textarea"
              :rows="2"
              placeholder="填写你的简介"
              @focus="briefIputFocus"
            />
          </div>
          <div class="action-box">
            <el-button v-show="!opVisible.brief" type="text" @click="briefIputFocus">
              <span><i class="el-icon-edit" />修改</span>
            </el-button>
            <span v-show="opVisible.brief">
              <el-button type="text" style="color: #999;" @click="cancelBrief">取消</el-button>
              <el-button type="text" @click="saveBrief">保存</el-button>
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getAccessToken } from '@/utils/auth'
import { updateUser } from '@/api/user.js'
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
      opVisible: {
        nickname: false,
        birthday: false,
        gender: false,
        brief: false
      },
      path: 'http://127.0.0.1:9090/user/avatar/update',
      files: [],
      loading: false,
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
    ]),
    headers() {
      var val = {
        Authorization: 'Bearer ' + getAccessToken()
      }
      return val
    }
  },

  mounted() {
    this.init()
  },

  methods: {

    // 初始化
    init() {
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
    },

    // 昵称输入框焦点事件
    nicknameIputFocus() {
      this.$refs.nicknameIput.focus()
      this.opVisible.nickname = true
    },

    // 昵称取消保存
    cancelNickname() {
      this.form.nickname = this.userInfo.nickname
      this.opVisible.nickname = false
    },

    // 昵称保存
    saveNickname() {
      const data = { nickname: this.form.nickname, userId: this.userInfo.id }
      this.updateUser(data, 0)
    },

    // 生日栏聚焦
    birthdayIputFocus() {
      this.opVisible.birthday = true
    },

    // 生日取消保存
    cancelBirthday() {
      this.form.birthday = this.userInfo.birthday
      this.opVisible.birthday = false
    },

    // 保存生日
    saveBirthday() {
      const data = { birthday: this.form.birthday, userId: this.userInfo.id }
      this.updateUser(data, 1)
    },

    // 性别栏聚焦
    genderIputFocus() {
      this.$refs.genderIput.focus()
      this.opVisible.gender = true
    },

    // 性别取消保存
    cancelGender() {
      this.form.gender = this.userInfo.gender
      this.opVisible.gender = false
    },

    // 性别保存
    saveGender() {
      const data = { gender: this.form.gender, userId: this.userInfo.id }
      this.updateUser(data, 2)
    },

    // 简介聚焦
    briefIputFocus() {
      this.$refs.briefIput.focus()
      this.opVisible.brief = true
    },

    // 简介取消保存
    cancelBrief() {
      this.form.brief = this.userInfo.brief
      this.opVisible.brief = false
    },

    // 保存简介
    saveBrief() {
      const data = { brief: this.form.brief, userId: this.userInfo.id }
      this.updateUser(data, 3)
    },

    // 更新用户信息
    updateUser(data, index) {
      return new Promise(async(resolve, reject) => {
        await updateUser(data).then(
          res => {
            switch (index) {
              case 0:
                this.opVisible.nickname = false
                break
              case 1:
                this.opVisible.birthday = false
                break
              case 2:
                this.opVisible.gender = false
                break
              case 3:
                this.opVisible.brief = false
                break
            }
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            resolve()
          },
          error => {
            reject(error)
          }
        )
        await this.$store.dispatch('user/getUserInfo')
        this.init()
      })
    },

    // 超出个数限制
    onExceed() {
      this.loading = false
    },

    // 上传成功
    uploadSuccess(res, file, fileList) {
      if (res.code !== 0) {
        console.error(res.message)
        this.$message.error('文件上传失败')
        return
      }
      this.loading = false
      this.$message({
        message: '上传成功',
        type: 'success'
      })
      this.$store.dispatch('user/getUserInfo').then(res => this.init())
    },

    // 上传失败
    uploadError(err) {
      console.error(err)
      this.loading = false
      this.$message.error('文件上传失败')
    },

    // 上传前，对文件校验
    beforeUpload(file) {
      this.loading = true
      const isImg =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg'
      const isLt300KB = file.size / 1000 < 300
      if (!isImg) {
        this.$message.error('文件格式不正确')
        this.loading = false
      }
      if (!isLt300KB) {
        this.$message.error('文件大小不能大于300KB')
        this.loading = false
      }
      return isImg && isLt300KB
    }
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

  @media screen and (max-width: 922px){
    padding: 0;
    margin: 0;
  }

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

          & /deep/ .el-input__prefix {
            display: none;
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
