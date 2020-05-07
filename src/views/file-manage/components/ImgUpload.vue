<!-- 图片上传组件 -->
<template>
  <el-dialog
    :modal="false"
    title="上传图片"
    :top="'35vh'"
    :visible.sync="visible"
    width="350px"
    :before-close="dialogClose"
    :lock-scroll="false"
  >
    <div style="text-align: center">
      <el-upload
        ref="upload"
        :action="path"
        :file-list="files"
        :multiple="false"
        :limit="1"
        :headers="headers"
        :auto-upload="false"
        :name="'file'"
        :on-exceed="onExceed"
        :before-upload="beforeUpload"
        :on-success="uploadSuccess"
        :on-error="uploadError"
      >
        <el-button slot="trigger" size="small" type="primary" :disabled="loading">选取文件</el-button>
        <el-button
          size="small"
          type="success"
          :disabled="loading"
          @click="()=>{$refs.upload.submit()}"
        >上传文件</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpeg/jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
  </el-dialog>
</template>

<script>
import { getAccessToken } from '@/utils/auth'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      path: process.env.VUE_APP_BASE_API + '/file/upload',
      files: [],
      loading: false
    }
  },
  computed: {
    headers() {
      var val = {
        Authorization: 'Bearer ' + getAccessToken()
      }
      return val
    }
  },
  methods: {
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
      this.$emit('uploadSuccess', res.data)
      this.loading = false
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
      const isLt500KB = file.size / 1000 < 500
      if (!isImg) {
        this.$message.error('文件格式不正确')
        this.loading = false
      }
      if (!isLt500KB) {
        this.$message.error('文件大小不能大于500KB')
        this.loading = false
      }
      return isImg && isLt500KB
    },
    // 弹框关闭
    dialogClose() {
      this.files = []
      this.loading = false
      this.$emit('dialogClose')
    }
  }
}
</script>

<style>
</style>
