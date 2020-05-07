<template>
  <div class="container">
    <!-- 头部 -->
    <div class="head">
      <el-button
        type="primary"
        size="small"
        @click="visible=true"
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
          />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
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
      title="保存客户端"
      top="25vh"
      width="350px"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :show-close="false"
      :lock-scroll="false"
    >
      <el-form ref="form" label-position="left" :model="form" :rules="rules">
        <el-form-item prop="clientId">
          <el-input v-model="form.clientId" placeholder="输入客户端ID" />
        </el-form-item>
        <el-form-item prop="clientSecret">
          <el-input v-model="form.clientSecret" placeholder="输入客户端秘钥" />
        </el-form-item>
        <el-form-item prop="accessTokenExpire">
          <el-input v-model="form.accessTokenExpire" type="number" placeholder="输入AccessToken时效" />
        </el-form-item>
        <el-form-item>
          <el-switch
            v-model="form.enable"
            style="display: block"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="启用refresh"
            inactive-text="禁用refresh"
          />
        </el-form-item>
        <el-form-item v-if="form.enable" prop="refreshTokenExpire">
          <el-input v-model="form.refreshTokenExpire" type="number" placeholder="输入RefreshToken时效" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="handleClose">取 消</el-button>
        <el-button size="medium" type="primary" @click="saveSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { pageClient, saveClient, deleteClient } from '@/api/client.js'
export default {
  data() {
    return {
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      loading: true,
      visible: false,
      form: {
        clientId: '',
        clientSecret: '',
        accessTokenExpire: null,
        refreshTokenExpire: null,
        id: null,
        enableRefreshToken: 0,
        enable: false
      },
      rules: {
        clientId: [{ required: true, message: '请输入客户端ID', trigger: 'blur' }],
        clientSecret: [{ required: true, message: '请输入客户端秘钥', trigger: 'blur' }]
      }
    }
  },

  mounted() {
    this.loadData()
  },

  methods: {

    // 编辑
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.visible = true
    },

    // 启用开关
    enableChange(row) {
      const enableRefreshToken = row.enable ? 1 : 0
      const data = {
        id: row.id,
        enableRefreshToken: enableRefreshToken,
        clientId: row.clientId,
        clientSecret: row.clientSecret
      }
      saveClient(data)
    },

    // 删除
    handleDelete(row) {
      this.$confirm('确定删除该客户端吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,
        type: 'warning'
      }).then(() => {
        deleteClient(row.id).then(
          res => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.pageNum = 1
            this.loadData()
          }
        )
      }).catch(() => {
        // TODO
      })
    },

    // 弹框关闭
    handleClose() {
      this.form.clientId = ''
      this.form.clientSecret = ''
      this.form.accessTokenExpire = null
      this.form.refreshTokenExpire = null
      this.form.id = null
      this.form.enable = false
      this.form.enableRefreshToken = 0
      this.$refs['form'].clearValidate()
      this.visible = false
    },

    // 保存提交
    saveSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.saveClient()
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
          records.forEach(ele => { ele.enable = !!ele.enableRefreshToken })
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
    saveClient() {
      this.form.enableRefreshToken = this.form.enable ? 1 : 0
      delete this.form.enable
      saveClient(this.form).then(
        res => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.handleClose()
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
