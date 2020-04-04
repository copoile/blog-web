<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="userInfo.avatar || defaultAvatar" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <span class="btn" @click="visible=true">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </span>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退 出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
      title="修改密码"
      top="30vh"
      width="300px"
      :modal="true"
      :visible.sync="visible"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :show-close="false"
      :lock-scroll="false"
    >
      <el-form ref="form" label-position="left" :model="form" :rules="rules">
        <el-form-item prop="oldpwd">
          <el-input v-model="form.oldpwd" placeholder="输入原密码"/>
        </el-form-item>
        <el-form-item prop="newpwd">
          <el-input v-model="form.newpwd" placeholder="输入新密码"/>
        </el-form-item>
        <el-form-item prop="newpwd2">
          <el-input v-model="form.newpwd2" placeholder="确认密码"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="dialogClose">取 消</el-button>
        <el-button size="medium" type="primary" :loading="btnLoading" @click="saveSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { updatePassword } from '@/api/user.js'
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.form.newpwd) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      visible: false,
      btnLoading: false,
      form: {
        oldpwd: '',
        newpwd: '',
        newpwd2: ''
      },
      rules: {
        oldpwd: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
        newpwd: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
        newpwd2: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'userInfo',
      'defaultAvatar'
    ])
  },
  methods: {
    // 切换SideBar
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },

    // 关闭修改密码弹框
    dialogClose() {
      this.$refs['form'].resetFields()
      this.$refs['form'].clearValidate()
      this.visible = false
    },

    // 保存提交
    saveSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.btnLoading = true
          const params = { oldPassword: this.form.oldpwd, newPassword: this.form.newpwd2 }
          updatePassword(params).then(
            res => {
              this.btnLoading = false
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.$refs['form'].resetFields()
              this.$refs['form'].clearValidate()
              this.visible = false
            },
            error => {
              console.error(error)
              this.btnLoading = false
            }
          )
        }
      })
    },

    // 退出
    logout() {
      this.$store.dispatch('user/logout').then(res => { this.$router.push('/') })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
