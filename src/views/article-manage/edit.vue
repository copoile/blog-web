<template>
  <div v-loading="loading" class="edit-container">
    <!-- 头部 -->
    <div class="edit-head">
      <el-button class="col" size="small" type="danger" @click="save(0)">发布</el-button>
      <el-button class="col" size="small" type="warning" @click="save(1)">保存</el-button>
      <el-button v-if="!cover" type="primary" size="small" icon="el-icon-upload" @click="coverUploadClick">上传封面</el-button>
      <el-button v-else type="primary" size="small" icon="el-icon-picture" @click="coverPreview">预览封面</el-button>
      <el-select v-model="categoryId" class="col" size="small" placeholder="选择分类" style="width: 120px;">
        <el-option v-for="(category, index) in categorys" :key="index" :label="category.name" :value="category.id" />
      </el-select>
      <el-select v-model="original" class="col" size="small" style="width: 75px;">
        <el-option v-for="(option, index) in options" :key="index" :label="option.name" :value="option.value" />
      </el-select>
      <dynamic-tags :seleted-tags="seletedTags" @tagsChage="tagsChage" />
    </div>

    <div class="row-box">
      <div class="input-wrapper">
        <p class="sub-title">标题</p>
        <el-input v-model="title" placeholder="输入文章标题" />
      </div>
      <div class="input-wrapper">
        <p class="sub-title">摘要</p>
        <el-input v-model="summary" placeholder="输入文章摘要" />
      </div>
      <div v-if="original===0" class="input-wrapper">
        <p class="sub-title">转载地址</p>
        <el-input v-model="reproduce" placeholder="输入转载地址" />
      </div>
    </div>
    <!-- markdown编辑器 -->
    <mavon-editor
      ref="md"
      v-model="content"
      style="min-height: 600px"
      code-style="gradient-dark"
      :ishljs="true"
      @imgAdd="mdImgUpload"
      @imgDel="mdImgDel"
      @change="change"
      @save="save(1)"
    />
    <img-upload :visible="imgUploadVisible" @dialogClose="dialogClose" @uploadSuccess="coverUploadSuccess" />
    <el-dialog
      :modal="false"
      title="预览封面"
      :top="'25vh'"
      :visible.sync="coverVisible"
      width="320px"
      :before-close="coverClose"
      :lock-scroll="false"
    > <div class="cover-pre" style="text-align: center;overflow: hidden;position: relative;border-radius: 4px;">
      <img :src="cover" style="height: 100%;width: 100%;">
      <i
        class="el-icon-delete"
        style="position: absolute;bottom: 2px;right: 10px;z-index: 999;"
        @click="delCover"
      />
    </div>
    </el-dialog>
  </div>
</template>

<script>
import '@/assets/audio/index.css'
import '@/styles/heilingt.css'
import DynamicTags from './components/DynamicTags'
import ImgUpload from './components/ImgUpload'
import { deleteFile } from '@/api/file'
import { categoryList } from '@/api/category.js'
import request from '@/utils/request'
import { saveArticle, articleDetail } from '@/api/article.js'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  name: 'Edit',
  components: {
    DynamicTags,
    ImgUpload,
    mavonEditor
  },
  data() {
    return {
      loading: false,
      id: null,
      tagIds: [],
      categoryId: null,
      title: '',
      summary: '',
      reproduce: '',
      content: '',
      htmlContent: '',
      cover: '',
      coverVisible: false,
      imgUploadVisible: false,
      // 上传类型，1：文章图片，2：文章封面
      uploadType: 1,
      // 原创，1：是，0：否
      original: 1,
      options: [
        {
          name: '原创',
          value: 1
        },
        {
          name: '转载',
          value: 0
        }
      ],
      categorys: [],
      seletedTags: []
    }
  },

  mounted() {
    this.initCategoryList()
    this.id = this.$route.query.id || null
    this.initEdit()
  },

  methods: {

    // 监控编辑器
    change(value, render) {
      this.htmlContent = render
    },

    // 加载编辑文章
    initEdit() {
      if (this.id) {
        this.loading = true
        articleDetail(this.id).then(
          res => {
            this.categoryId = res.data.categoryId
            this.title = res.data.title
            this.summary = res.data.summary
            this.cover = res.data.cover
            this.content = res.data.content
            this.original = res.data.original
            this.reproduce = res.data.reproduce
            const tagList = res.data.tagList
            const len = tagList.length
            for (var i = 0; i < len; i++) {
              this.seletedTags.push({ value: tagList[i].name, tagId: tagList[i].id })
            }
            this.loading = false
          },
          error => {
            console.error(error)
            this.loading = false
          }
        )
      }
    },

    // 获取分类列表
    initCategoryList() {
      categoryList().then(
        res => {
          this.categorys = res.data
        }
      )
    },

    // 监控到已选标签
    tagsChage(tags) {
      this.tagIds = tags.map(x => {
        return x.tagId
      })
    },

    // 上传封面点击事件
    coverUploadClick() {
      this.imgUploadVisible = true
    },

    // 预览封面
    coverPreview() {
      this.coverVisible = true
    },

    // 封面预览关闭
    coverClose() {
      this.coverVisible = false
    },

    // 删除封面
    delCover() {
      const cover = this.cover
      if (cover) {
        const params = {
          fullPath: cover
        }
        deleteFile(params).then(
          res => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.coverVisible = false
            this.cover = ''
          }
        )
      }
    },

    // 编辑器图片上传
    mdImgUpload(pos, $file) {
      var formdata = new FormData()
      formdata.append('file', $file)
      request({
        url: process.env.VUE_APP_BASE_API + '/file/upload',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(
        res => {
          this.$message({
            message: '图片上传成功',
            type: 'success'
          })
          this.$refs.md.$img2Url(pos, res.data)
        })
    },

    // 编辑器删除上传图片事件
    mdImgDel(file) {
      if (file && file[0]) {
        const params = {
          fullPath: file[0]
        }
        deleteFile(params)
      }
    },

    // 上传图片弹框关闭
    dialogClose() {
      this.imgUploadVisible = false
    },

    // 封面上传成功，删除原封面
    coverUploadSuccess(url) {
      this.imgUploadVisible = false
      const oldCover = this.cover
      this.cover = url
      const params = {
        fullPath: oldCover
      }
      if (oldCover) {
        deleteFile(params)
      }
      this.$message({
        message: '封面上传成功',
        type: 'success'
      })
    },

    // 保存文章
    save(status) {
      this.loading = true
      const data = {
        id: this.id,
        status: status,
        title: this.title,
        content: this.content,
        htmlContent: this.htmlContent,
        cover: this.cover,
        summary: this.summary,
        original: this.original,
        reproduce: this.original === 1 ? null : this.reproduce,
        categoryId: this.categoryId,
        tagIds: this.tagIds
      }
      saveArticle(data).then(
        res => {
          this.id = res.data
          this.loading = false
          this.$message({
            message: status === 0 ? '文章发布成功' : '文章保存成功',
            type: 'success'
          })
        },
        error => {
          console.log(error)
          this.loading = false
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-container {
  font-size: 15px;

  /deep/ .hljs {
    background: none!important;
  }

  .cover-pre {
    color: #fff;
    height: 150px;
  }

  .cover-pre:after {
    position: absolute;
    bottom: 0;
    left: 0;
    content: "";
    height: 20px;
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
  }

  .edit-head {
    height: 50px;
    background: #d0d0d0;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;

    .col {
      margin: 5px;
    }
  }

  .row-box {
    background: #fff;
    margin-bottom: 20px;
    .input-wrapper {
      padding-bottom: 5px;

      &:first-child {
        padding-top: 5px;
      }

      .sub-title {
        font-weight: bold;
        color: #409eff;
        margin: 5px 0 5px 20px;
      }

      & /deep/ .el-input__inner {
        border: none;
        border-bottom: 1px solid #dcdfe6;
        border-radius: 0;
        &:hover {
          border-bottom: 1px solid #409eff;
        }
      }
    }
  }
}
</style>
