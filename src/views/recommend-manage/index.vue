<template>
  <div class="container">
    <div class="head">
      <el-button type="primary" size="mini" icon="el-icon-refresh" class="icon-refresh" circle @click="refresh" />
    </div>
    <el-table v-loading="loading" :data="tableData" border style="width: 100%" size="medium">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="浏览次数">
              <span>{{ props.row.viewCount }}</span>
            </el-form-item>
            <el-form-item label="评论数">
              <span>{{ props.row.commentCount }}</span>
            </el-form-item>
            <el-form-item label="点赞数">
              <span>{{ props.row.likeCount }}</span>
            </el-form-item>
            <el-form-item label="收藏数">
              <span>{{ props.row.collectCount }}</span>
            </el-form-item>
          </el-form>
          <el-form label-position="left" class="table-expand">
            <el-form-item label="摘要">
              <span>{{ props.row.summary }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="ID" width="110" align="center" />
      <el-table-column prop="title" label="标题" min-width="320" align="center" />
      <el-table-column prop="categoryName" label="分类" width="110" align="center" />
      <el-table-column label="标签" width="120" align="center">

        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <el-tag v-for="(item) in scope.row.tagList" :key="item.id" size="medium" style="margin-right:6px">{{ item.name }}</el-tag>
            <div slot="reference">
              <span v-if="scope.row.tagList.length === 0" class="tag">无</span>
              <el-tag v-else>{{ scope.row.tagList[0].name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="recommendScore" label="排序" min-width="90" align="center" />
      <el-table-column label="操作" fixed="right" min-width="230">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="artPreview(scope.row)">预览</el-button>
          <el-button type="primary" size="mini" @click="addRecommend(scope.row)">刷新</el-button>
          <el-button type="warning" size="mini" @click="handleEdit(scope.row)">排序</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <article-preview :id="previewId" :visible="preview" @beforeClose="previewClose" />
  </div>
</template>

<script>
import { recommendList, addRecommend, deleteRecommend } from '@/api/article.js'
import ArticlePreview from './components/ArticlePreview.vue'
export default {
  components: {
    ArticlePreview
  },
  data() {
    return {
      loading: false,
      preview: false,
      previewId: '',
      tableData: []
    }
  },

  mounted() {
    this.loadData()
  },

  methods: {

    // 加载数据
    loadData() {
      this.loading = true
      recommendList().then(
        res => {
          this.total = res.data.total
          this.tableData = res.data
          this.loading = false
        },
        error => {
          console.error(error)
          this.loading = false
        }
      )
    },
    // 编辑
    handleEdit(row) {
      this.$prompt('请输入序号', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,
        inputPattern: /^[0-9]*$/,
        inputErrorMessage: '只能输入数字'
      }).then(({ value }) => {
        const params = { articleId: row.id, score: value }
        addRecommend(params).then(
          res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.loadData()
          }
        )
      }).catch(() => {
        // TODO
      })
    },

    // 删除
    handleDelete(row) {
      deleteRecommend(row.id).then(
        res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.loadData()
        }
      )
    },

    // 文章预览
    artPreview(row) {
      this.previewId = row.id
      this.preview = true
    },

    // 预览关闭
    previewClose() {
      this.preview = false
    },

    // 添加推荐
    addRecommend(row) {
      const params = { articleId: row.id, score: row.recommendScore }
      addRecommend(params).then(
        res => {
          this.$message({
            message: '刷新成功',
            type: 'success'
          })
          this.loadData()
        }
      )
    },

    // 右边的刷新
    refresh() {
      this.loadData()
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
    position: relative;

    .icon-refresh {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      color: #fff;
      font-weight: 700;

      @media screen and (max-width: 922px){
        display: none;
      }
    }

    >* {
      margin-left: 10px;
    }
  }

  .el-table {
    margin: 10px;
  }

  .table-expand {
    font-size: 0;

    /deep/ .el-form-item__label {
      font-weight: normal;
      font-size: 14px;
      color: #99a9bf;
    }

    /deep/ .el-form-item {
      margin-bottom: 0;
    }
  }

  .el-tag {
    cursor: default;
  }

  .el-pagination {
    margin-top: 10px;
  }

  /deep/ .el-table__expanded-cell[class*=cell] {
    padding: 15px;
  }
}
</style>
