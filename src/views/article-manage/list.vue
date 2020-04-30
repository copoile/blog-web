<template>
  <div class="container">
    <div class="head">
      <el-select v-model="categoryId" class="col" size="small" placeholder="选择分类" style="width: 120px;">
        <el-option v-for="(category, index) in categorys" :key="index" :label="category.name" :value="category.id" />
      </el-select>
      <el-select v-model="tagId" class="col" size="small" placeholder="选择标签" style="width: 120px;">
        <el-option v-for="(tag, index) in tags" :key="index" :label="tag.name" :value="tag.id" />
      </el-select>
      <el-input v-model="title" style="width: 120px;" placeholder="请输入标题" size="small" clearable />
      <el-button type="primary" size="small" icon="el-icon-search" @click="search">搜索</el-button>
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
      <el-table-column label="发布" width="110" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.published"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="statusChange(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="230">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="artPreview(scope.row)">预览</el-button>
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="warning" size="mini" @click="addRecommend(scope.row)">推荐</el-button>
          <el-button v-if="scope.row.status != 2" size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          <el-button v-else type="primary" size="mini" @click="handleDelete(scope.row)">恢复</el-button>
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
    <article-preview :id="previewId" :visible="preview" @beforeClose="previewClose" />
  </div>
</template>

<script>
import { tagList } from '@/api/tag.js'
import { pageArticle, addRecommend, deleteArticle, updateStatus } from '@/api/article.js'
import { categoryList } from '@/api/category.js'
import ArticlePreview from './components/ArticlePreview.vue'
export default {
  components: {
    ArticlePreview
  },
  data() {
    return {
      loading: false,
      pageSize: 10,
      pageNum: 1,
      total: 0,
      title: '',
      categoryId: null,
      tagId: null,
      tags: [],
      preview: false,
      previewId: '',
      categorys: [],
      tableData: []
    }
  },

  mounted() {
    this.initCategoryList()
    this.initTagList()
    this.loadData()
  },

  methods: {

    // 初始化分类列表
    initCategoryList() {
      categoryList().then(
        res => {
          this.categorys = res.data
        }
      )
    },

    // 初始化标签列表
    initTagList() {
      tagList().then(
        res => {
          this.tags = res.data
        }
      )
    },

    // 条件查询
    search() {
      this.pageNum = 1
      this.loadData()
    },

    // 加载数据
    loadData() {
      this.loading = true
      const params = {
        current: this.pageNum,
        size: this.pageSize,
        categoryId: this.categoryId,
        tagId: this.tagId ? this.tagId : null,
        title: this.title ? this.title : null
      }
      pageArticle(params).then(
        res => {
          this.total = res.data.total
          const records = res.data.records
          records.forEach(ele => { ele.published = ele.status === 0 })
          this.tableData = records
          this.loading = false
        },
        error => {
          console.error(error)
          this.loading = false
        }
      )
    },

    // 分页页码更改事件
    currentChange(val) {
      this.pageNum = val
      this.loadData()
    },

    // 编辑
    handleEdit(row) {
      this.$router.push({
        path: '/art-manage/edit',
        query: {
          id: row.id
        }
      })
    },

    // 状态修改:发布|暂存
    statusChange(row) {
      const params = {
        articleId: row.id,
        status: row.published ? 0 : 1
      }
      updateStatus(params)
    },

    // 删除
    handleDelete(row) {
      deleteArticle(row.id).then(
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
      const params = { articleId: row.id, score: row.id }
      addRecommend(params).then(
        res => {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        }
      )
    },

    // 右边的刷新
    refresh() {
      this.title = ''
      this.categoryId = null
      this.tagId = ''
      this.pageNum = 1
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
