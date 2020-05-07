<template>
  <div class="container">
    <!-- 头部 -->
    <div class="head">
      <el-button
        type="primary"
        size="small"
        icon="el-icon-upload"
        @click="visible=true"
      >upload</el-button>
    </div>

    <el-table
      v-loading="loading"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="name"
        label="名称"
        width="270"
        align="center"
      />
      <el-table-column
        prop="url"
        label="链接"
        width="520"
        align="center"
      />
      <el-table-column
        prop="date"
        label="时间"
        width="180"
        align="center"
      />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-clipboard:copy="scope.row.url"
            v-clipboard:success="copySuccess"
            size="mini"
            type="success"
          >复制链接</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="btn-group">
      <el-button size="mini" type="primary" :disabled="pageNum === 1" @click="prevClick">上一页</el-button>
      <el-button size="mini" type="primary" :disabled="loadedAll" @click="nextClick">下一页</el-button>
    </div>

    <img-upload :visible="visible" @dialogClose="dialogClose" @uploadSuccess="uploadSuccess" />
  </div>
</template>

<script>
import ImgUpload from './components/ImgUpload'
import { pageFile, deleteFile } from '@/api/file.js'
export default {
  name: 'FileManage',
  components: {
    ImgUpload
  },
  data() {
    return {
      visible: false,
      tableData: [],
      markers: [null],
      pageNum: 1,
      pageSize: 10,
      loadedAll: false,
      loading: true
    }
  },

  mounted() {
    const params = { size: this.pageSize, marker: null }
    this.init(params)
  },

  methods: {

    // 首次加载数据
    init(params) {
      this.loading = true
      pageFile(params).then(
        res => {
          this.loading = false
          this.tableData = res.data.records
          this.markers.push(res.data.nextMarker)
          this.loadedAll = res.data.loadedAll
        },
        error => {
          console.error(error)
          this.loading = false
        }
      )
    },

    // 下一页点击
    nextClick() {
      this.loading = true
      const params = { size: this.pageSize, marker: this.markers[this.pageNum] }
      pageFile(params).then(
        res => {
          this.loading = false
          this.tableData = res.data.records
          const marker = res.data.nextMarker
          if (this.markers.indexOf(marker) === -1) {
            this.markers.push(marker)
          }
          this.pageNum = this.pageNum + 1
          this.loadedAll = res.data.loadedAll
        },
        error => {
          console.error(error)
          this.loading = false
        }
      )
    },

    // 上一页点击
    prevClick() {
      this.loading = true
      const params = { size: this.pageSize, marker: this.markers[this.pageNum - 2] }
      pageFile(params).then(
        res => {
          this.loading = false
          this.tableData = res.data.records
          const marker = res.data.nextMarker
          if (this.markers.indexOf(marker) === -1) {
            this.markers.push(marker)
          }
          this.pageNum = this.pageNum - 1
          this.loadedAll = res.data.loadedAll
        },
        error => {
          console.error(error)
          this.loading = false
        }
      )
    },

    // 复制链接
    copySuccess() {
      this.$message({
        message: '复制链接成功',
        type: 'success'
      })
    },

    // 删除
    handleDelete(row) {
      this.$confirm('确定删除该文件吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,
        type: 'warning'
      }).then(() => {
        const params = {
          fullPath: row.url
        }
        deleteFile(params).then(
          res => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.markers = [null]
            this.pageNum = 1
            this.init()
          }
        )
      }).catch(() => {
        // TODO
      })
    },

    // 上传成功
    uploadSuccess() {
      this.visible = false
      this.$message({
        message: '上传成功',
        type: 'success'
      })
      this.markers = [null]
      this.pageNum = 1
      this.init()
    },

    // 上传弹框关闭
    dialogClose() {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;

  .head {
    height: 50px;
    background: #d0d0d0;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    padding-right: 10px;
  }

  .el-table {
    margin: 10px;
  }

  .btn-group {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>
