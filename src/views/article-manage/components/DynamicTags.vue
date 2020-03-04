<!-- 动态标签组件 -->
<template>
  <div class="tags-wrapper">
    <!--  已选标签 -->
    <el-tag
      v-for="tag in dynamicTags"
      :key="tag.tagId"
      closable
      :disable-transitions="false"
      @close="tagClose(tag)"
    >{{ tag.value }}</el-tag>

    <!-- 标签选择框 -->
    <el-autocomplete
      v-if="inputTagVisible"
      ref="tagInput"
      v-model="inputTagValue"
      :fetch-suggestions="querySearch"
      placeholder="输入关键字"
      size="small"
      style="width:111px;margin-left: 5px"
      @select="tagSelect"
    >
      <i
        slot="suffix"
        class="el-icon-close"
        title="关闭"
        @click="inputTagVisible=false;inputTagValue=''"
      />
    </el-autocomplete>
    <!-- 新增标签按钮 -->
    <el-button
      v-else
      type="primary"
      size="small"
      style="margin-left: 5px"
      @click="showInputTag"
    >+New Tag</el-button>
  </div>
</template>

<script>
import { tagList } from '@/api/tag.js'
export default {
  props: {
    seletedTags: {
      type: Array,
      required: false,
      default: null
    }
  },
  data() {
    return {
      dynamicTags: this.seletedTags || [],
      inputTagVisible: false,
      inputTagValue: '',
      tags: []
    }
  },

  watch: {
    // 监控已选标签，并传递给父组件
    dynamicTags(val) {
      this.$emit('tagsChage', val)
    }
  },

  mounted() {
    this.initTag()
  },

  methods: {
    // 加载标签列表
    initTag() {
      tagList().then(
        res => {
          const tagList = res.data
          const len = tagList.length
          for (var i = 0; i < len; i++) {
            this.tags.push({ value: tagList[i].name, tagId: tagList[i].id })
          }
        }
      )
    },

    // 过滤标签列表
    querySearch(queryString, cb) {
      var tags = this.tags
      var results = queryString
        ? tags.filter(this.createFilter(queryString))
        : tags
      // 调用 callback 返回建议列表的数据
      cb(results)
    },

    // 创建输入过滤器
    createFilter(queryString) {
      return tag => {
        return tag.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },

    // 显示标签输入框并使输入框获得焦点
    showInputTag() {
      this.inputTagVisible = true
      this.$nextTick(_ => {
        this.$refs.tagInput.$refs.input.focus()
      })
    },

    // 选择列表中的标签
    tagSelect(item) {
      // 判断是否已选标签
      const selected = this.dynamicTags.some(ele => ele.tagId === item.tagId)
      if (selected) {
        this.inputTagValue = ''
        this.inputTagVisible = false
        this.$message.error('该标签已选择')
        return
      }

      // 判断是否已选3个标签
      const leng = this.dynamicTags.length
      if (leng > 3) {
        this.inputTagValue = ''
        this.inputTagVisible = false
        this.$message.error('最多能选4个标签')
        return
      }
      this.dynamicTags.push(item)
      this.inputTagValue = ''
      this.inputTagVisible = false
    },

    // 关闭标签
    tagClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-wrapper {

  & /deep/ .el-input__suffix {
    top: 9px;
  }

  .el-tag {
    margin-left: 5px;
    margin-right: 5px;
    background: #409eff;
    color: #fff;
  }

  .el-icon-close {
    cursor: pointer;
  }
}
</style>
