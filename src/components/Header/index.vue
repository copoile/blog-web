<!-- 头部导航栏 -->
<template>
  <div class="main-header-box">
    <header class="main-header">
      <div class="container">
        <router-link to="/" class="logo">
          <svg-icon icon-class="logo" class="logo-svg" />
          <span class="logo-title">个人阅读分享</span>
        </router-link>

        <nav class="main-nav">
          <!-- 导航栏目 -->
          <ul class="main-nav-list">
            <li
              v-for="(nav,index) in navItems"
              :key="index"
              class="main-nav-item"
              :class="{'main-nav-item-active':navItemActive===index}"
              @click="$router.push(nav.to)"
            >
              {{ nav.name }}
            </li>
          </ul>
          <!-- 搜索框 -->
          <div class="search-box">
            <el-input
              v-model="content"
              size="medium"
              placeholder="搜索文章"
              @focus="inputFocus"
              @blur="inputBlur"
            >
              <i slot="suffix" class="el-input__icon el-icon-search" :style="'color:' + inputIconColor" />
            </el-input>
          </div>
          <!-- 右边box -->
          <div class="right-box">

            <!-- 登录·注册 -->
            <div v-if="!userInfo" class="nologin">
              <div class="login-btn" @click="loClick">登录</div><div class="reg-btn" @click="reClick">注册</div>
            </div>
            <div v-else class="logined">
              <router-link to="/user" class="console">个人中心</router-link>
              <el-dropdown trigger="click" placement="bottom">
                <div class="avatar-wrapper">
                  <img :src="userInfo.avatar || defaultAvatar" class="user-avatar">
                </div>
                <el-dropdown-menu slot="dropdown">
                  <a target="_blank" href="#">
                    <el-dropdown-item>修改密码</el-dropdown-item>
                  </a>
                  <a target="_blank" href="#">
                    <el-dropdown-item>绑定邮箱</el-dropdown-item>
                  </a>
                  <el-dropdown-item divided>
                    <span style="display:block;" @click="logout">退 出</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>

        </nav>
      </div>
    </header>

    <register-dialog ref="reDialog" />
    <login-dialog ref="loDialog" />
  </div>
</template>
<script>
import RegisterDialog from './RegisterDialog'
import LoginDialog from './LoginDialog'
import { mapGetters } from 'vuex'
export default {
  components: {
    RegisterDialog,
    LoginDialog
  },
  props: {
    navItemActive: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      content: '',
      inputIconColor: '',
      navItems: [
        {
          name: '首页',
          to: '/'
        },
        {
          name: '分类',
          to: '/category'
        },
        {
          name: '归档',
          to: '/'
        },
        {
          name: '友链',
          to: '/'
        },
        {
          name: '留言',
          to: '/'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'defaultAvatar'
    ])
  },
  methods: {
    inputFocus() {
      this.inputIconColor = '#1989fa'
    },
    inputBlur() {
      this.inputIconColor = ''
    },
    reClick() {
      this.$refs.reDialog.open()
    },
    loClick() {
      this.$refs.loDialog.open()
    },
    // 退出
    logout() {
      this.$store.dispatch('user/logout').then(res => { this.$router.push('/') })
    }
  }
}

</script>

<style lang="scss" scoped>
.main-header-box {
  height: 60px;
  width: 100%;
  position: relative;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);

  .main-header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    border-bottom: 1px solid #f1f1f1;
    color: #909090;
    height: 60px;
    z-index: 250;

    .container {
      height: 100%;
      max-width: 960px;
      margin: auto;
      display: flex;
      align-items: center;
      overflow: hidden;

      .logo {
        min-width: 80px;
        color: #007fff;
        display: flex;
        align-items: center;

        @media screen and (max-width: 450px){
          display: none;
        }

        .logo-svg {
          width: 32px;
          height: 32px;
        }

        .logo-title {
          font-size: 20px;
          display: inline-block;
          font-weight: bold;
        }
      }

      .main-nav {
        flex: 1;
        height: 100%;
        align-items: center;
        display: flex;
        flex-wrap: nowrap;

        .main-nav-list {
          margin: 0;
          display: flex;
          align-items: center;
          cursor: pointer;

          .main-nav-item {
            list-style: none;
            line-height: 60px;
            padding-right: 18px;
            transition: all .3s;

            &:hover {
              color: #007fff;
            }
          }

          .main-nav-item-active {
            color: #007fff;
          }
        }

        .search-box {
          display: flex;
          align-items: center;
          flex-direction: row-reverse;
          width: 290px;
          box-sizing: border-box;
          padding-left: 130px;

          /deep/ .el-input__inner {
            background: #f4f5f5;
          }

          .el-icon-search {
            font-size: 18px;
            cursor: pointer;
          }

          @media screen and (max-width: 750px){
            display: none;
          }
        }

        .right-box {
          display: flex;
          align-items: center;
          width: 150px;
          flex-direction: row-reverse;

          @media screen and (max-width: 900px){
            display: none;
          }

          .nologin {
            height: 100%;
            color: #007fff;
            display: flex;
            align-items: center;

            .login-btn {
              cursor: pointer;
              line-height: 60px;

              &:after {
                content: "·";
                font-weight: bold;
                margin: 0 5px;
              }
            }

            .reg-btn {
              cursor: pointer;
              line-height: 60px;
            }
          }

          .logined {
            height: 100%;
            color: #007fff;
            font-weight: 600;
            display: flex;
            align-items: center;

            .console {
              font-size: 12px;
              padding: 0 8px;
              margin-right: 8px;
              border-right: 1px solid hsla(0,0%,59.2%,.2);
            }

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
              }
          }
        }
      }
    }
  }
}
</style>
