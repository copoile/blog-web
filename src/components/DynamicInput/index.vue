<!-- 动态输入组件 -->
<template>
  <div class="input-wrapper">
    <!-- 输入框 -->
    <el-input
      v-if="inputVisible"
      v-model="inputValue"
      :style="'width:'+width"
      :placeholder="placeholder"
      size="small"
      @keyup.enter.native="inputConfirm"
      @blur="inputVisible=false;inputValue=''"
    >
      <i
        slot="suffix"
        class="el-icon-close"
        title="关闭"
        @click="inputVisible=false;inputValue=''"
      />
    </el-input>
    <!-- 新增按钮 -->
    <el-button
      v-else
      type="primary"
      size="small"
      @click="inputVisible=true"
    >{{ content }}</el-button>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '输入内容'
    },
    width: {
      type: String,
      default: '120px'
    },
    content: {
      type: String,
      default: '+ Add'
    }
  },
  data() {
    return {
      inputVisible: false,
      inputValue: ''
    }
  },

  methods: {
    // 输入框回车事件
    inputConfirm() {
      this.$emit('inputConfirm', this.inputValue)
      this.inputValue = ''
      this.inputVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.input-wrapper {

  & /deep/ .el-input__suffix {
    top: 9px;
  }

  .el-icon-close {
    cursor: pointer;
  }
}
</style>
