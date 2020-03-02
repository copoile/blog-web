<template>
  <div class="container">
    <app-header :nav-item-active="4" />
    <div class="content-container">
      <div class="content-head">
        <p class="main-tip-label">温馨提示</p>
        <p class="main-tip-text">本站欢迎交换友链，请在下面留言备注即可，请先在您博客上添加本站的友链。</p>
        <div class="edit-container">
          <quill-editor ref="editor" v-model="content" :options="editorOption" />
        </div>
      </div>
      <div class="content-box">
        <p class="main-tip-label">留言列表
          <span class="right">共27条留言</span>
        </p>
        <ul class="content-list">
          <li class="list-item">dd</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/Header/index'
import '@/assets/quill-emoji/quill-emoji.js'
export default {
  components: {
    AppHeader
  },
  data() {
  	return {
  		content: '',
      editorOption: {
        modules: {
          toolbar: {
            container: [['emoji']]
          },
          'emoji-toolbar': true,
          'emoji-shortname': true
        },
        placeholder: '不说点什么吗?^_^......'
      }
  	}
  }
}
</script>

<style lang="scss" scoped>
.container {
  @import '~@/styles/variables';
  width: 100%;
  height: 100vh;
  overflow-x: hidden;

  .content-container {
    background: #fff;
    max-width: $ContentContainerW;
    margin: 0 auto;
    margin-top: 15px;
    border-radius: 2px;

    .content-head {
      padding: 10px 20px;

      .main-tip-label {
        border-left: 5px solid #00a77c;
        border-bottom: 1px solid #00a77c;
        font-size: 16px;
        font-weight: bold;
        line-height: 2;
        color: #545454;
        padding-left: 10px;
      }

      .main-tip-text {
        color: #545454;
        font-size: 14px;
        text-indent: 50px;
        padding: 20px 0 50px 0;
      }

      .edit-container {
        margin: 0 auto;
        padding: 0 50px;

      	/deep/ .ql-container.ql-snow {
      	  border: none;
      	}

      	/deep/ .ql-toolbar.ql-snow {
      	  border: none;
      	}

      	/deep/ .ql-editor {
      	  border: 1px #00a77c solid;
      	  border-radius: 5px;
      	  min-height: 100px;
      	}
      }
    }

    .content-box {
       padding: 10px 20px;

      .main-tip-label {
        border-left: 5px solid #00a77c;
        border-bottom: 1px solid #00a77c;
        font-size: 16px;
        font-weight: bold;
        line-height: 2;
        color: #545454;
        padding-left: 10px;

        .right {
          float: right;
          padding-right: 5px;
          font-weight: normal;
          font-size: 12px;
          position: relative;
          top: 10px;
        }
      }
    }
  }
}
</style>
