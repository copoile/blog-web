<template>
  <div class="panel">
    <ul class="extra-act">
      <li class="like-warpper">
        <el-badge :value="12" :max="99">
          <svg-icon icon-class="like" class="svg-icon" />
        </el-badge>
      </li>
      <li class="collect-warpper">
        <el-badge :value="12" :max="99">
          <svg-icon icon-class="collect" class="svg-icon" />
        </el-badge>
      </li>
    </ul>

    <ul class="extra-cnt">
      <li><svg-icon icon-class="qq" class="svg-icon" /></li>
      <li class="wx-warpper"><svg-icon icon-class="wx" class="svg-icon" /></li>
      <li class="cp-warpper"><svg-icon icon-class="copy" class="svg-icon" /></li>
      <ul />
    </ul>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.panel {
  position: fixed;
  width: 45px;
  top: 200px;
  left: calc(calc(100% - 1145px) / 2);
  text-align: center;
  margin: 0;
  padding: 0;

  .extra-act {
    margin: 0;
    padding: 0;
    margin-bottom: 20px;

    /deep/ .el-badge__content.is-fixed {
      right: 10px;
      top: -5px;
    }

    li {
      list-style: none;
      background: #fff;
      border-radius: 50%;
      width: 42px;
      height: 42px;
      text-align: center;
      margin-top: 10px;
      color: #007fff;
      box-sizing: border-box;
      padding-top: 10px;

      .svg-icon {
        width: 18px;
        height: 18px;
        cursor: pointer;
        fill: currentcolor;
        margin: 0 auto;
      }
    }

    .like-warpper {
      color: #007fff;

      /deep/ .el-badge__content {
        background: #007fff;
      }
    }

    .collect-warpper {
      color: #007fff;

      /deep/ .el-badge__content {
        background: #007fff;
      }
    }
  }

  .extra-cnt {
    margin: 0;
    padding: 0;
    color: #b2bac2;
    background: #fff;

    li {
      list-style: none;
      padding: 10px 0;
      position: relative;

      &:before {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 20px;
        height: 1px;
        background-color: #e5e5e5;
        margin-left: -10px;
      }

      &:hover {
        color: #007fff;
      }

      .svg-icon {
        width: 24px;
        height: 24px;
        cursor: pointer;
        fill: currentcolor;
      }
    }

    .wx-warpper:hover {
      color: #26aa09;
    }

    .cp-warpper {
      &:before {
        display: none;
      }

      &:hover {
        color: #007fff;
      }
    }
  }
}
</style>
