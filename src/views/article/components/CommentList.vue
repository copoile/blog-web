<template>
  <div class="c-container">
    <div class="content-container">
      <div class="content-head">
        <div class="edit-container">
          <quill-editor ref="editor" v-model="content" :options="editorOption" />
        </div>
        <div class="main-tools-box">
          <el-button :loading="cloading" type="danger" size="mini" @click="commentSubmit">评论</el-button>
        </div>
      </div>
      <div class="content-box">
        <p class="main-tip-label">评论列表
          <span class="right">共{{ total }}条评论</span>
        </p>

        <!-- 评论列表 -->
        <ul class="content-list">
          <transition-group name="fade-list">
            <li v-for="(comment, index1) in commentList" :key="index1" class="list-item">
              <div class="cmt-li-title">
                <div class="headimg">
                  <img :src="comment.fromUser.avatar || defaultAvatar">
                </div>
              </div>
              <div class="cmt-li-r">
                <div class="top">
                  <p class="nickname" :style="comment.fromUser.id === authorId ? 'color:#e74851' : ''">
                    {{ comment.fromUser.nickname }}

                    <el-tag v-if="comment.fromUser.id === authorId" type="info" size="mini" effect="light">作者</el-tag>
                  </p>
                  <p class="date">{{ comment.commentTime }}</p>
                </div>
                <p class="body-text" v-html="comment.content" />
                <div class="btns-bar">
                  <el-popover
                    v-if="userInfo && (
                      userInfo.id === comment.fromUser.id
                      || userInfo.id === authorId
                      || userInfo.roles.includes('admin'))"
                    v-model="comment.del_visible"
                    placement="bottom"
                  >
                    <p style="margin: 8px;">确定删除这一条评论吗？</p>
                    <div style="text-align: right; margin: 0">
                      <el-button style="color:#999;font-size: 12px;" size="mini" type="text" @click="comment.del_visible = false">取消</el-button>
                      <el-button style="font-size: 12px;" type="text" size="mini" @click="delCommentSubmit(comment)">确定</el-button>
                    </div>
                    <span slot="reference" class="reply-btn">删除</span>
                  </el-popover>
                  <span class="reply-btn" @click="reClick(comment.id, comment.fromUser.id)">回复</span>
                </div>

                <!-- 回复列表 -->
                <ul class="reply-list">
                  <li v-for="(reply, index2) in comment.replyList" :key="index2" class="reply-item">
                    <div class="reply-date">{{ reply.replyTime }}</div>
                    <div class="reply-content">
                      <div class="headimg">
                        <img :src="reply.fromUser.avatar || defaultAvatar">
                      </div>
                      <div class="nickname">
                        <span :style="reply.fromUser.id === authorId ? 'color:#e74851' : ''">{{ reply.fromUser.nickname }}</span>
                        <span style="color: #000000;">回复</span>
                        <span :style="reply.toUser.id === authorId ? 'color:#e74851' : ''">@{{ reply.toUser.nickname }}</span>
                      </div>
                      <p class="reply-text" v-html="reply.content" />
                    </div>
                    <div class="btns-bar">
                      <el-popover
                        v-if="userInfo &&
                          (userInfo.id === reply.fromUser.id
                          || userInfo.id === authorId
                          || userInfo.roles.includes('admin'))"
                        v-model="reply.del_visible"
                        placement="bottom"
                      >
                        <p style="margin: 8px;">确定删除这一条回复吗？</p>
                        <div style="text-align: right; margin: 0">
                          <el-button style="color:#999;font-size: 12px;" size="mini" type="text" @click="reply.del_visible = false">取消</el-button>
                          <el-button style="font-size: 12px;" type="text" size="mini" @click="delReplySubmit(reply)">确定</el-button>
                        </div>
                        <span slot="reference" class="reply-btn">删除</span>
                      </el-popover>
                      <span class="reply-btn" @click="reClick(comment.id, reply.fromUser.id)">回复</span>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
          </transition-group>
        </ul>
        <div
          v-show="current === 1 && loading"
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="#fff"
          style="color: #fff;width: 100%;height: 100px;"
        >正在加载</div>
      </div>
      <div v-if="!loading && commentList.length === 0" class="list-empty">还没有评论哦~</div>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="size"
      :current-page="current"
      :hide-on-single-page="true"
      :total="total"
      @current-change="currentChange"
    />

    <!-- 回复弹框 -->
    <el-dialog
      :visible.sync="reEditVisible"
      title="提示"
      :width="device === 'desktop'?'600px':'95%'"
      top="45vh"
      :modal="false"
      :show-close="false"
      class="rely-dialog"
      :before-close="bClose"
    >
      <div class="re-editor-container">
        <quill-editor v-model="recontent" :options="reEditorOption" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" size="mini" @click="bClose">取 消</el-button>
        <el-button :loading="rloading" type="danger" size="mini" @click="reSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import '@/assets/quill-emoji/quill-emoji.js'
import { pageComment, addComment, addReply, deleteComment, deleteReply } from '@/api/comment.js'
import ResizeMixin from '@/layout/mixin/ResizeHandler'

export default {
  mixins: [ResizeMixin],
  props: {
    articleId: {
      type: [String, Number],
      required: true
    },
    authorId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      content: '',
      recontent: '',
      loading: false,
      editorOption: {
        modules: {
          toolbar: {
            container: [['emoji']]
          },
          'emoji-toolbar': true,
          'emoji-shortname': true
        },
        placeholder: '你好呀,不打算占楼层吗 ？'
      },
      reEditVisible: false,
      reEditorOption: {
        modules: {
          toolbar: {
            container: [['emoji']]
          },
          'emoji-toolbar': true,
          'emoji-shortname': true
        },
        placeholder: '回复点啥子呢？'
      },
      current: 1,
      size: 10,
      total: 0,
      commentList: [],
      commentId: 0,
      toUserId: 0,
      cloading: false,
      rloading: false
    }
  },

  computed: {
    ...mapGetters([
      'userInfo',
      'defaultAvatar',
      'device'
    ])
  },

  mounted() {
    this.pageComment()
  },

  methods: {

    // 回复弹框关闭事件
    bClose() {
      this.commentId = 0
      this.toUserId = 0
      this.reEditVisible = false
      this.recontent = ''
    },

    // 监听分页
    currentChange(current) {
      this.current = current
      this.pageComment()
    },

    // 获取分页数据
    pageComment() {
      this.loading = true
      const params = {
        articleId: this.articleId,
        current: this.current,
        size: this.size
      }
      pageComment(params).then(
        res => {
          this.loading = false
          this.total = res.data.total
          const commentList = res.data.records
          const clen = commentList.length
          for (var i = 0; i < clen; i++) {
            commentList[i].del_visible = false
            const replyList = commentList[i].replyList
            const rlen = replyList.length
            for (var j = 0; j < rlen; j++) {
              replyList[j].del_visible = false
            }
          }
          this.commentList = commentList
        },
        error => {
          console.error(error)
          this.loading = false
        }
      )
    },

    // 重载
    reload() {
      this.current = 1
      this.pageComment()
    },

    // 评论提交
    commentSubmit() {
      const userInfo = this.userInfo
      if (!userInfo) {
        this.$store.commit('login/CHANGE_VISIBLE', true)
        return
      }
      const content = this.content.replace(/<\/?p[^>]*>/gi, '')
      if (!content) {
        this.$message('还没输入内容呢~')
        return
      }
      const params = {
        content: content,
        articleId: this.articleId
      }
      const email = userInfo.email
      if (!email) {
        this.$confirm('没绑定邮箱接收不到回复提醒哦~', '提示', {
          confirmButtonText: '马上绑定',
          cancelButtonText: '下次一定',
          showClose: false,
          type: 'warning'
        }).then(() => {
          this.$router.push('/email-binding')
        }).catch(() => {
          this.cloading = true
          addComment(params).then(
            res => {
              this.cloading = false
              this.$message({
                message: '评论成功',
                type: 'success'
              })
              this.content = ''
              this.reload()
            },
            error => {
              console.log(error)
              this.cloading = false
            }
          )
        })
      } else {
        this.cloading = true
        addComment(params).then(
          res => {
            this.cloading = false
            this.$message({
              message: '评论成功',
              type: 'success'
            })
            this.content = ''
            this.reload()
          },
          error => {
            console.log(error)
            this.cloading = false
          }
        )
      }
    },

    // 删除评论提交
    delCommentSubmit(comment) {
      const params = { commentId: comment.id }
      deleteComment(params).then(
        res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.reload()
        }
      )
    },

    // 删除回复提交
    delReplySubmit(reply) {
      const params = { replyId: reply.id }
      deleteReply(params).then(
        res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.reload()
        }
      )
    },

    // 点击回复
    reClick(commentId, toUserId) {
      const userInfo = this.userInfo
      if (!userInfo) {
        this.$store.commit('login/CHANGE_VISIBLE', true)
        return
      }
      this.reEditVisible = true
      this.commentId = commentId
      this.toUserId = toUserId
    },

    // 回复提交
    reSubmit() {
      const content = this.recontent.replace(/<\/?p[^>]*>/gi, '')
      if (!content) {
        this.$message('还没输入内容呢~')
        return
      }

      const params = {
        commentId: this.commentId,
        articleId: this.articleId,
        toUserId: this.toUserId,
        content: content
      }
      const email = this.userInfo.email
      if (!email) {
        this.$confirm('没绑定邮箱接收不到回复提醒哦~', '提示', {
          confirmButtonText: '马上绑定',
          cancelButtonText: '下次一定',
          showClose: false,
          type: 'warning'
        }).then(() => {
          this.$router.push('/email-binding')
        }).catch(() => {
          this.rloading = true
          addReply(params).then(
            res => {
              this.rloading = false
              this.reEditVisible = false
              this.recontent = ''
              this.$message({
                message: '回复成功',
                type: 'success'
              })
              this.reload()
            },
            error => {
              console.error(error)
              this.rloading = false
            }
          )
        })
      } else {
        this.rloading = true
        addReply(params).then(
          res => {
            this.rloading = false
            this.reEditVisible = false
            this.recontent = ''
            this.$message({
              message: '回复成功',
              type: 'success'
            })
            this.reload()
          },
          error => {
            console.error(error)
            this.rloading = false
          }
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.c-container {
  @import '~@/styles/variables';
  width: 100%;
  overflow-x: hidden;

  .re-editor-container {
    margin: 0 auto;
    width: 90%;
  }

  .content-container {
    background: #fff;
    margin: 0 auto;
    margin-top: 15px;
    border-radius: 2px;

    .content-head {
      padding: 0 20px;

      .main-tip-label {
        border-left: 5px solid #00a77c;
        border-bottom: 1px solid #00a77c;
        font-size: 16px;
        font-weight: bold;
        line-height: 2;
        color: #545454;
        padding-left: 10px;
      }

      .edit-container {
        margin: 0 auto;
        padding: 0 50px;

        @media screen and (max-width: 960px){
          padding: 0;
        }

        /deep/ .ql-container.ql-snow {
          border: none;
        }

        /deep/ .ql-toolbar.ql-snow {
          border: none;
        }

        /deep/ .ql-editor {
          border: 1px solid #e74851;
          border-radius: 5px;
          min-height: 120px;
          padding: 20px;
        }

        /deep/ .ql-stroke {
          stroke: #e74851;
        }

        /deep/ .ql-fill {
          fill: #e74851;
        }
      }

      .main-tools-box {
        display: flex;
        flex-direction: row-reverse;
        padding: 10px;
        padding-right: 50px;

        @media screen and (max-width: 960px){
          padding-right: 0;
        }

        .submit-btn {
          text-align: center;
          cursor: pointer;
          width: 100px;
          line-height: 30px;
          border-radius: 4px;
          border:none;
          color: #fff;
          background: #e74851;
          font-size: 14px;
        }
      }
    }

    .content-box {

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

      .content-list {
        margin: 0;
        padding: 0;

        .list-item {
          list-style: none;
          border-bottom: 1px dashed #e5e5e5;
          margin-bottom: 2px;
          padding-bottom: 0;
          overflow: hidden;
          margin-top: 15px;

          .cmt-li-title {
            float: left;

            .headimg {
              height: 42px;
              width: 42px;
              border-radius: 50%;
              overflow: hidden;
              border: 1px solid rgba(0, 0, 0, 0.1);

              img {
                height: 100%;
                width: 100%;
              }
            }
          }

          .cmt-li-r {
            margin-left: 15px;
            float: left;
            width: 91%;

            @media screen and (max-width: 960px){
              width: 82.9%;
            }

            .top {
              height: 25px;
              width: 100%;
              margin-top: 5px;
              font-size: 12px;

              .nickname {
                float: left;
                color: #007fff;
                font-weight: 700;
                font-size: 14px;
                padding: 0;
                margin: 0;
                margin-top: 10px;

                .el-tag {
                  margin-left: 2px;
                  font-weight: normal;
                  font-size: 12px;
                }

                .el-tag--mini {
                  height: 18px;
                  line-height: 17px;
                  padding: 0 3px;
                }
              }

              .date {
                float: right;
                color: silver;
              }
            }

            .body-text {
              font-size: 14px;
              color: #333;
            }

            .btns-bar {
              height: 20px;
              overflow: hidden;
              margin-top: -10px;
              margin-bottom: 4px;

              .reply-btn {
                font-size: 12px;
                color: silver;
                cursor: pointer;
                float: right;
                margin-left: 10px;

                &:hover {
                  color: #007fff;
                }
              }
            }

            .reply-list {
              margin: 0;
              padding: 0;
              padding-bottom: 5px;

              .reply-item {
                list-style: none;
                border-top: 1px dashed #e5e5e5;
                margin-bottom: 2px;
                padding-bottom: 0px;
                overflow: hidden;
                margin-top: 10px;
                font-size: 12px;

                .reply-date {
                  padding-top: 10px;
                  float: right;
                  color: silver;
                  font-size: 12px;

                  @media screen and (max-width: 960px){
                    display: none;
                  }
                }

                .reply-content {
                  float: left;
                  width: 100%;
                  padding-top: 10px;
                  display: flex;
                  align-items: flex-start;

                  .headimg {
                    height: 36px;
                    width: 36px;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 1px solid rgba(0, 0, 0, 0.1);

                    img {
                      height: 100%;
                      width: 100%;
                    }
                  }

                  .nickname {
                    font-weight: 700;
                    padding-top: 13px;
                    color: #007fff;
                    padding-left: 10px;

                    &:after {
                      content: ":";
                      margin: 0 3px;
                      font-weight: bold;
                    }
                  }

                  .reply-text {
                    margin: 0;
                    padding-top: 10px;
                    flex: 1;
                    font-size: 14px;
                    color: #333;
                  }

                  @media screen and (max-width: 960px){
                    display: block;
                    float: left;
                    padding: 5px 0;

                    .headimg {
                      display: inline-block;
                    }

                    .nickname {
                      display: inline-block;
                      position: relative;
                      bottom: 12px;
                    }

                    .reply-text {
                      padding-top: 5px;
                    }
                  }
                }

                .btns-bar {
                  clear: both;
                  height: auto !important;
                  margin-bottom: 4px;

                  .reply-btn {
                    font-size: 12px;
                    color: silver;
                    cursor: pointer;
                    float: right;
                    margin-left: 10px;

                    &:hover {
                      color: #007fff;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    .list-empty {
      text-align: center;
      line-height: 50px;
    }
  }

  .el-pagination {
    margin: 30px;
    text-align: center;
  }
}

</style>

<style scoped lang="scss">
.rely-dialog >>> .el-button--text {
  color: #999;
}

.rely-dialog >>> .el-button--text:hover {
  color: #333;
}

.rely-dialog >>> .dialog__body {
  padding: 10px;
}

.rely-dialog >>> .el-dialog__header {
  display: none;
}

.rely-dialog >>> .el-dialog__body {
  padding: 0;
}
.rely-dialog >>> .ql-container.ql-snow {
  border: none;
}

.rely-dialog >>> .ql-toolbar.ql-snow {
  border: none;
}

.rely-dialog >>> .ql-editor {
  border: 1px #e74851 solid;
  border-radius: 5px;
  min-height: 80px;
}

.rely-dialog {
  margin-right: 140px;

  @media screen and (max-width: 960px) {
    margin-right: 0;
  }
}
</style>
