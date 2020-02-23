<template>
  <div class="container">
    <!-- 头部 -->
    <div class="head">
      <dynamic-input placeholder="输入名称" content="+ New Tag" @inputConfirm="inputConfirm" />
    </div>

    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        label="序号"
        width="180"
      >
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        label="ID"
        width="180"
      >
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>

      <el-table-column
        label="名称"
        width="180"
      >
        <template slot-scope="scope">
          {{ scope.row.name }}
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
      :page-size="pageSize"
      :total="total"
      @current-change="currentChange"
    />
  </div>
</template>

<script>
import DynamicInput from '@/components/DynamicInput/index.vue'
import { addTag, pageTag } from '@/api/tag.js'
export default {
  components: {
    DynamicInput
  },
  data() {
    return {
      tableData: [],
      pageNum: 1,
      pageSize: 5,
      total: 10,
      loading: true
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
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
          this.tableData = res.data.records
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
