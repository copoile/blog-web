<template>
  <div class="container">
    <!-- 头部 -->
    <div class="head">
      <dynamic-input placeholder="输入名称" content="+ New Tag" @inputConfirm="inputConfirm" />
    </div>

    <el-table
      v-loading="loading"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        label="ID"
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>

      <el-table-column
        label="名称"
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          <span v-if="!scope.row.edit">{{ scope.row.name }}</span>
          <el-input
            v-else
            v-model="tempTag.name"
            size="small"
            placeholder="输入名称"
          />
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="!scope.row.edit"
            type="primary"
            size="mini"
            @click="handleEdit(scope.row)"
          >编辑</el-button>
          <span v-else>
            <el-button type="info" size="mini" @click="scope.row.edit=false">取消</el-button>
            <el-button type="success" size="mini" @click="saveSubmit">保存</el-button>
          </span>
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
  </div>
</template>

<script>
import DynamicInput from '@/components/DynamicInput/index.vue'
import { addTag, pageTag, updateTag, deleteTag } from '@/api/tag.js'
export default {
  components: {
    DynamicInput
  },
  data() {
    return {
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      loading: true,
      tempTag: null
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {

    // 编辑
    handleEdit(row) {
      this.tempTag = JSON.parse(JSON.stringify(row))
      row.edit = true
    },

    // 删除
    handleDelete(row) {
      this.$confirm('确定删除该标签吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,
        type: 'warning'
      }).then(() => {
        deleteTag(row.id).then(
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

    // 编辑保存
    saveSubmit() {
      if (this.tempTag.name === '') {
        this.$message('没有内容呢')
        return
      }
      const params = { id: this.tempTag.id, name: this.tempTag.name }
      updateTag(params).then(
        res => {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.pageNum = 1
          this.loadData()
        }
      )
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
      pageTag(params).then(
        res => {
          this.total = res.data.total
          const records = res.data.records
          records.forEach(ele => { ele.edit = false })
          this.tableData = records
          this.loading = false
        },
        error => {
          console.error(error)
          this.loading = false
        }
      )
    },

    // 动态输入框回车事件
    inputConfirm(val) {
      if (!val) {
        this.$message.error('标签名称不能为空')
        return
      }
      const params = {
        tagName: val
      }
      addTag(params).then(
        res => {
          this.$message({
            message: '新增成功',
            type: 'success'
          })
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
  text-align: center;

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
    margin-top: 10px;
  }
}
</style>
