<template>
  <div class="container">
    <!-- 头部 -->
    <div class="head">
      <el-button
        type="primary"
        size="small"
        @click="dialogVisible=true"
      >+AddClient</el-button>
    </div>

    <el-table
      v-loading="loading"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        label="ID"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>

      <el-table-column
        prop="clientId"
        label="客户端ID"
        width="150"
        align="center"
      />

      <el-table-column
        prop="clientSecret"
        label="客户端密钥"
        width="130"
        align="center"
      />

      <el-table-column
        prop="accessTokenExpire"
        label="accessToken时效"
        width="150"
        align="center"
      />
      <el-table-column
        prop="refreshTokenExpire"
        label="refreshToken时效"
        width="150"
        align="center"
      />
      <el-table-column
        label="启用refreshToken"
        width="150"
        align="center"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.enable"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="enableChange(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      layout="prev, pager, next"
      hide-on-single-page
      :page-size="pageSize"
      :total="total"
      @current-change="currentChange"
    />

    <el-dialog
      title="保存友链"
      top="30vh"
      width="400px"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :show-close="false"
      :lock-scroll="false"
      @closed="handleClosed"
    >
      <el-form ref="form" label-position="left" :model="form" :rules="rules">
        <el-form-item prop="name">
          <el-input v-model="form.name" placeholder="输入名称"/>
        </el-form-item>
        <el-form-item prop="url">
          <el-input v-model="form.url" placeholder="输入链接"/>
        </el-form-item>
        <el-form-item prop="icon">
          <el-input v-model="form.icon" placeholder="输入图标"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { pageClient } from '@/api/client.js'
import { saveFriendLink, deleteFriendLink } from '@/api/friend-link.js'
export default {
  data() {
    return {
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      loading: true,
      dialogVisible: false,
      form: {
        icon: '',
        id: null,
        name: '',
        url: ''
      },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        url: [{ required: true, message: '请输入链接', trigger: 'blur' }],
        icon: [{ required: true, message: '请输入链接', trigger: 'blur' }]
      }
    }
  },

  mounted() {
    this.loadData()
  },

  methods: {

    // 编辑
    handleEdit(index, row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogVisible = true
    },

    // 启用开关
    enableChange(row) {
      console.log(row.enable)
    },

    // 删除
    handleDelete(index, row) {
      deleteFriendLink(row.id).then(
        res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.pageNum = 1
          this.loadData()
        }
      )
    },

    // 弹框关闭
    handleClosed() {
      this.form.id = null
      this.form.icon = ''
      this.form.name = ''
      this.form.url = ''
    },

    // 保存提交
    saveSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.saveFriendLink()
        }
      })
    },

    // 分页页码更改事件
    currentChange(val) {
      this.pageNum = val
      this.loadData()
    },

    // 加载数据
    loadData() {
      this.loading = true
      const params = {
        current: this.pageNum,
        size: this.pageSize
      }
      pageClient(params).then(
        res => {
          this.total = res.data.total
          const records = res.data.records
          records.forEach(ele => { ele.enable = ele.enableRefreshToken?true:false })
          this.tableData = records
          this.loading = false
        },
        error => {
          console.error(error)
          this.loading = false
        }
      )
    },

    // 保存友链
    saveFriendLink() {
      const data = {
        id: this.form.id,
        icon: this.form.icon,
        name: this.form.name,
        url: this.form.url
      }
      saveFriendLink(data).then(
        res => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.dialogVisible = false
          this.pageNum = 1
          this.loadData()
        }
      )
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

  .el-pagination {
    text-align: center;
    margin-top: 10px;
  }
}
</style>
