<!-- 
 文章编辑页面
 富文本编辑器使用vue-quill-editor(https://github.com/surmon-china/vue-quill-editor)
-->

<template>
  <div class="edit-container">
    <!-- 工具栏图片点击，这个按钮只是作为一个跳板 -->
    <el-button id="toolbar-img" style="display:none" @click="toolbarImgClick" />

    <!-- 头部 -->
    <div class="edit-head">
      <el-button class="col" size="small" type="danger">发布</el-button>
      <el-button class="col" size="small" type="warning">保存</el-button>
      <el-button type="primary" size="small" icon="el-icon-upload" @click="coverUploadClick">上传封面</el-button>
      <el-select v-model="categoryId" class="col" size="small" placeholder="选择分类" style="width: 120px;">
        <el-option v-for="(category, index) in categorys" :key="index" :label="category.name" :value="category.id" />
      </el-select>
      <el-select v-model="original" class="col" size="small" style="width: 75px;">
        <el-option v-for="(option, index) in options" :key="index" :label="option.name" :value="option.value" />
      </el-select>
      <dynamic-tags @tagsChage="tagsChage" />
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
    <quill-editor ref="editor" v-model="content" :options="editorOption" />
    <img-upload :visible="imgUploadVisible" @dialogClose="dialogClose" @uploadSuccess="imgUploadSuccess" />
  </div>
</template>

<script>
import Quill from 'quill'
import ImageResize from 'quill-image-resize-module'
import '@/assets/quill-emoji/quill-emoji.js'
import DynamicTags from './components/DynamicTags'
import ImgUpload from './components/ImgUpload'
import { toolbarOptions, ImageFormat } from '@/config/editor'
import { deleteFile } from '@/api/file'
Quill.register('modules/imageResize', ImageResize)
Quill.register(ImageFormat, true)
export default {
  name: 'Edit',
  components: {
    DynamicTags,
    ImgUpload
  },
  data() {
    return {
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              // 表情符
              emoji: function() {},
              image: function(value) {
                if (value) {
                  // 点击事件转移到按钮
                  document.querySelector('#toolbar-img').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          },
          imageResize: {
            modules: ['Resize', 'DisplaySize', 'Toolbar']
          },
          'emoji-toolbar': true,
          'emoji-shortname': true
        },
        placeholder: '开始书写你的文章吧~~~'
      },
      tagIds: [],
      categoryId: null,
      title: '',
      summary: '',
      reproduce: '',
      content: '',
      cover: '',
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
      categorys: [
        {
          name: '测试测试测',
          id: 1
        },
        {
          name: '测试2',
          id: 2
        }
      ]
    }
  },
  computed: {
    editor() {
      return this.$refs.editor.quill
    }
  },
  methods: {

    // 监控到已选标签
    tagsChage(tags) {
      this.tagIds = tags.map(x => {
        return x.tagId
      })
    },

    // 上传封面点击事件
    coverUploadClick() {
      this.uploadType = 2
      this.imgUploadVisible = true
    },

    // 编辑器图片点击事件
    toolbarImgClick() {
      this.uploadType = 1
      this.imgUploadVisible = true
    },

    // 上传图片弹框关闭
    dialogClose() {
      this.imgUploadVisible = false
    },

    // 图片上传成功，文章图片封面图片做不同处理
    imgUploadSuccess(url) {
      this.imgUploadVisible = false
      if (this.uploadType === 1) {
        this.artImgUploadSuccess(url)
      } else {
        this.coverUploadSuccess(url)
      }
    },

    // 文章上传成功，将图片集成到富文本编辑器
    artImgUploadSuccess(url) {
      // 获取光标位置
      const length = this.editor.getSelection().index
      // 插入图片
      this.editor.insertEmbed(length, 'image', url)
      // 调整光标到最后
      this.editor.setSelection(length + 1)
    },

    // 封面上传成功，删除原封面
    coverUploadSuccess(url) {
      const oldCover = this.cover
      this.cover = url
      const params = {
        fullPath: url
      }
      if (oldCover) {
        deleteFile(params)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-container {
  font-size: 15px;

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

  .quill-editor {
    margin: 20px;
  }

  & /deep/ .ql-toolbar.ql-snow + .ql-container.ql-snow {
    border: none;
  }

  & /deep/ .ql-editor {
    font-size: 15px !important;
    line-height: 1.5 !important;
    height: 55vh;
    border: 1px #ccc solid;
    border-top: none;
  }
  // 链接弹框
  & /deep/ .ql-snow .ql-tooltip {
    left: 0px !important;
    top: 50px !important;
  }
}
</style>
