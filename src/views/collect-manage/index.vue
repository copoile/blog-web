<template>
  <div class="app-container">
    <div
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="#fff"
      class="card-container"
    >
      <el-card v-for="(item, index) in artList" :key="index" :body-style="{ padding: '0px' }" shadow="hover">
        <img :src="item.cover" class="image">
        <div class="content">
          <router-link :to="'/article/' + item.id" class="title">{{ item.title }}</router-link>
          <p class="abstract multi-ellipsis--l2">{{ item.summary }}</p>
          <div class="meta">
            <span>{{ item.date }}</span>
            <el-popover
              v-model="item.del_visible"
              placement="bottom"
              style="background: red;"
            >
              <p style="margin: 8px;">确定要删除该收藏吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" style="color:#999;font-size: 12px;" @click="item.del_visible = false">取消</el-button>
                <el-button type="text" size="mini" style="font-size: 12px;" @click="delSubmit(item.id)">确定</el-button>
              </div>
              <el-button slot="reference" icon="el-icon-more" type="text" />
            </el-popover>
          </div>
        </div>
      </el-card>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="size"
      :current-page="current"
      :total="total"
      :hide-on-single-page="true"
      @current-change="currentChange"
    />
  </div>
</template>

<script>
import { formatDate } from '@/utils/index.js'
import { pageCollect, cancelCollected } from '@/api/collect.js'
export default {
  data() {
    return {
      loading: true,
      current: 1,
      size: 15,
      total: 0,
      artList: []
    }
  },

  mounted() {
    this.pageCollect()
  },

  methods: {

    pageCollect() {
      this.loading = true
      const params = { current: this.current, size: this.size }
      pageCollect(params).then(
        res => {
          this.loading = false
          const records = res.data.records
          records.forEach(ele => {
            ele.date = formatDate(new Date(ele.publishTime), 'yyyy-MM-dd')
            ele.del_visible = false
          })
          this.total = res.data.total
          this.artList = records
        }
      )
    },

    currentChange(val) {
      this.current = val
      this.pageCollect()
    },

    // 删除收藏
    delSubmit(id) {
      const params = { articleId: id }
      cancelCollected(params).then(
        res => {
          this.$message({
            message: '复制成功',
            type: 'success'
          })
          this.pageCollect()
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  margin: 10px;

  .card-container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    justify-content: flex-start;
    align-items: flex-start;

    .el-card {
      position: relative;
      margin: 0;
      padding: 0;
      max-width: 200px;
      min-height: 260px;
      margin-bottom: 20px;
      margin-right: 20px;

      /deep/ .more-popper {
        padding: 0!important;
      }

      .image {
        width: 100%;
        height: 120px;
      }

      .content {
        color: #999;
        padding: 5px;

        .title {
          color: #2f2f2f;
          font-weight: 700;
          font-size: 14px;
          line-height: 20px;
        }

        .abstract {
          font-size: 12px;
          margin-top: 5px;
          line-height: 15px;
          color: #999;
          margin-bottom: 8px;
        }

        .meta {
          width: 100%;
          font-size: 12px;
          padding: 5px;
          padding-top: 0;
          padding-bottom: 2px;
          position: absolute;
          bottom: 5px;
          left: 0;

          .el-button {
            display: inline-block;
            float: right;
            margin: 0;
            padding: 0;
            color: #999;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
