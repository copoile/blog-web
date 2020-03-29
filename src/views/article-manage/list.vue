<template>
  <div class="container">
    <div class="head">
      <el-select v-model="categoryId" class="col" size="small" placeholder="选择分类" style="width: 120px;">
        <el-option v-for="(category, index) in categorys" :key="index" :label="category.name" :value="category.id" />
      </el-select>
      <el-select v-model="tagId" class="col" size="small" placeholder="选择标签" style="width: 120px;">
        <el-option v-for="(tag, index) in tags" :key="index" :label="tag.name" :value="tag.id" />
      </el-select>
      <el-input
        v-model="title"
        style="width: 120px;"
        placeholder="请输入标题"
        size="small"
        clearable
      />
      <el-button type="primary" size="small" icon="el-icon-search" @click="search">搜索</el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      style="width: 100%"
      size="medium"
    >
      <el-table-column
        prop="id"
        label="ID"
        width="110"
        align="center"
      />
      <el-table-column
        prop="title"
        label="标题"
        min-width="350"
        align="center"
      />
      <el-table-column
        prop="categoryName"
        label="分类"
        width="110"
        align="center"
      />
      <el-table-column label="标签" width="110" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <el-tag
              v-for="(item) in scope.row.tagList"
              :key="item.id"
              size="medium"
              style="margin-right:6px"
            >{{ item.name }}</el-tag>
            <div slot="reference">
              <span v-if="scope.row.tagList.length === 0" class="tag">无</span>
              <el-tag v-else>{{ scope.row.tagList[0].name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="viewCount" label="浏览" width="100" align="center" />
      <el-table-column prop="commentCount" label="评论" width="100" align="center" />
      <el-table-column prop="likeCount" label="点赞" width="100" align="center" />
      <el-table-column prop="collectCount" label="收藏" width="100" align="center" />
      <el-table-column label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === 0 ? 'success' : scope.row.status === 1 ? 'primary' : 'danger'"
          >
            {{ scope.row.status === 0 ? '已发布' : scope.row.status === 1 ? '待发布': '已删除' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="230">
        <template slot-scope="scope">
          <el-button
            size="mini"
          >预览</el-button>
          <el-button
            size="mini"
            @click="handleEdit(scope.row)"
          >编辑</el-button>
          <el-button
            v-if="scope.row.status != 2"
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
          >删除</el-button>
          <el-button
            v-else
            type="primary"
            size="mini"
            @click="handleDelete(scope.row)"
          >恢复</el-button>
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
import { pageArticle } from '@/api/article.js'
import { categoryList } from '@/api/category.js'
import { tagList } from '@/api/tag.js'
export default {
  data() {
    return {
      loading: false,
      pageSize: 10,
      pageNum: 1,
      total: 10,
      title: '',
      categoryId: null,
      tagId: null,
      tags: [],
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
        tagId: this.tagId,
        title: this.title
      }
      pageArticle(params).then(
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

    // 分页页码更改事件
    currentChange(val) {
      this.pageNum = val
      this.loadData()
    },

    // 编辑
    handleEdit(row) {
      this.$router.push({ path: '/art-manage/edit', query: { id: row.id }})
    },

    // 删除
    handleDelete(row) {
      console.log('删除')
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

    > * {
      margin-left: 10px;
    }
	}

  .el-table {
    margin: 10px;
  }

  .el-tag {
    cursor: default;
  }

  .el-pagination {
    margin-top: 10px;
  }
}
</style>
