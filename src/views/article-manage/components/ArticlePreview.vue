<template>
  <el-dialog
    top="5vh"
    width="720px"
    :destroy-on-close="true"
    :show-close="false"
    :visible.sync="visible"
    :close-on-click-modal="false"
    :lock-scroll="false"
    @opened="opened"
  >
    <span slot="title">
      <span>预览</span>
      <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click="bClose">
        <i class="el-dialog__close el-icon el-icon-close" />
      </button>
    </span>
    <div v-loading="loading" class="content markdown-body" v-html="article.htmlContent" />
  </el-dialog>
</template>

<script>
import '@/styles/heilingt.css'
import { articleDetail } from '@/api/article.js'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: [Number, String],
      default: ''
    }
  },

  data() {
    return {
      article: '',
      loading: true
    }
  },

  methods: {

    // 打开时加载
    opened() {
      this.loading = true
      articleDetail(this.id).then(
        res => {
          this.loading = false
          this.article = res.data
        }
      )
    },

    bClose() {
      this.article = ''
      this.loading = true
      this.$emit('beforeClose')
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding: 15px;
  min-height: 70vh;
  text-align: left;
}

/deep/ .el-dialog {
  max-height: 90vh;
  overflow-y: scroll;
}
</style>
