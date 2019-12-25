<template>
  <div class="edit-container">
    <!-- 头部 -->
    <div class="edit-head">
      <el-button class="col" size="small" type="danger">发布</el-button>
      <el-button class="col" size="small" type="warning">保存</el-button>
      <el-button type="primary" size="small" icon="el-icon-upload">上传封面</el-button>
      <el-select v-model="categoryId" class="col" placeholder="选择分类">
        <el-option v-for="(category, index) in categorys" :key="index" :label="category.name" :value="category.id" />
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
    </div>

    <quill-editor ref="editor" v-model="content" :options="editorOption" />

  </div>
</template>

<script>
import DynamicTags from './components/DynamicTags'
import { toolbarOptions, ImageFormat } from '@/config/editor'
import { Quill } from 'vue-quill-editor'
import { ImageResize } from 'quill-image-resize-module'
Quill.register('modules/imageResize', ImageResize)
Quill.register(ImageFormat, true)
export default {
  name: 'Edit',
  components: {
    DynamicTags
  },
  data() {
    return {
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
            }
          }
        },
        placeholder: '开始书写你的文章吧~~~'
      },
      test: 'test',
      tagIds: [],
      categoryId: null,
      title: '',
      summary: '',
      content: '',
      categorys: [
        {
          name: '测试',
          id: 1
        },
        {
          name: '测试2',
          id: 2
        }
      ]
    }
  },
  methods: {
    // 监控到已选标签
    tagsChage(tags) {
      this.tagIds = tags.map(x => {
        return x.tagId
      })
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
