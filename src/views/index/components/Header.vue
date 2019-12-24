<template>
  <div class="head-container">
    <div class="head">

      <div class="head_t">
        <div class="head_inner">
          <ul>
            <li v-for="(item, index) in items" :key="index" @mouseenter="mouseover(index)" @mouseleave="mouseleave">
              <a href="#" :style="activeIndex == index ? active : ''">
                {{ item.chsname }}
                <span style="color: #fff;">{{ item.enname }}</span>
              </a>
              <span class="line" :class="{ 'active-line': active != '' && activeIndex == index }">-</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="avatar-wrapper">
        <el-popover v-if="true" placement="bottom" trigger="hover">
          <img slot="reference" class="user-avatar" src="https://poile-img.nos-eastchina1.126.net/nologin.jpg">
          <div>
            <router-link
              to="/login"
              style=" text-align: center;
                     display: block;
                     text-decoration: none;
                     color: #fff;
                     background: #1985f4;
                     width: 200px;
                     line-height: 35px;
                     margin-top:10px;
                     margin-bottom:20px;
                     height: 35px;
                     border-radius: 3px;
       "
            >
              登录
            </router-link>
          </div>
          <div style="text-align: center;display: block;color:#333;width:200px;">
            首次使用？
            <router-link to="/register" style="text-decoration: none;color:#0e90d2">点我去注册</router-link>
          </div>
        </el-popover>
        <el-dropdown v-else placement="bottom" @command="handleCommand">
          <img class="user-avatar" src="https://poile-img.nos-eastchina1.126.net/me.png">
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">控制台</el-dropdown-item>
            <el-dropdown-item command="b">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="search-wrapper">
        <el-input v-model="title" placeholder="请搜索输入关键字">
          <i
            slot="suffix"
            class="el-input__icon el-icon-search"
          />
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 'color:#ec4828',
      show: '',
      activeIndex: -1,
      opacity: 0,
      title: '',
      items: [
        {
          chsname: '首页',
          enname: 'HOME',
          path: '/'
        },
        {
          chsname: '分类',
          enname: 'CATEGORY',
          path: '/'
        },
        {
          chsname: '标签',
          enname: 'TAG',
          path: '/'
        },
        {
          chsname: '归档',
          enname: 'ARCHIVES',
          path: '/'
        },
        {
          chsname: '友链',
          enname: 'FRIEND',
          path: '/'
        },
        {
          chsname: '留言',
          enname: 'WORDS',
          path: '/'
        }
      ]
    }
  },
  methods: {
    mouseover(index) {
      this.activeIndex = index
    },
    mouseleave() {
      this.activeIndex = -1
    },
    handleCommand() {
      console.log('---')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';

.head-container {
  // position: fixed;
  position: relative;
  width: 100%;
  background: url(../../../assets/common_images/header_bg_03.png);
  background-color: #fff;
  background-position: center 0;
  background-repeat: no-repeat;

  .head {
    height: $homeHeadHeight;
    position: relative;
    background: url(../../../assets/common_images/header_bg_01.png);
    background-position: center 0px;
    background-repeat: repeat;

    ul {
      margin: 0;
      padding: 0;
    }

    li {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    a {
      display: inline-block;
      margin: 0 auto;
      color: white;
      font-size: 18px;
      text-decoration: none;
      text-align: center;
    }

    .head_t {
      position: absolute;
      left: 0;
      width: 100%;
      height: 88px;
      z-index: 2;
      background: url(../../../assets/common_images/header_bg_line.png) no-repeat;
      background-position: center 85px;

      .head_inner {
        width: 1440px;
        margin: 0 auto;
        color: white;

        ul {
          overflow: hidden;
          width: 1000px;
          margin-left: 263px;

          li {
            width: 120px;
            height: 88px;
            text-align: center;
            cursor: pointer;
            display: flex;
            align-items: center;
            float: left;
            overflow: hidden;
            position: relative;
            letter-spacing: 1px;

            .line {
              height: 5px;
              width: 0px;
              transition: width 0.5s;
              position: absolute;
              bottom: 0;
              left: 50%;
              background: #ec4828;
              color: #ec4828;
              transform: translateX(-50%);
            }

            .active-line {
              width: 100%;
            }

            span {
              display: block;
              color: #777777;
              font-size: 12px;
              text-align: center;
              transform: scale(0.7);
            }

            &:hover {
              a,
              span {
                color: #ec4828;
              }
            }
          }
        }
      }
    }

    .avatar-wrapper {
      position: absolute;
      top: 0;
      right: 200px;
      width: 120px;
      height: 88px;
      z-index: 4;
      display: flex;
      align-items: center;

      .user-avatar {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid #ffff;
      }
    }

    .search-wrapper {
      position: absolute;
      right: 200px;
      bottom: 45px;

      i {
        font-size: 20px;
        color: #51aded;
        cursor: pointer;
      }
    }
  }
}
</style>
