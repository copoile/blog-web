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
        <div class="main-tools-box">
          <div class="submit-btn">留个言</div>
        </div>
      </div>
      <div class="content-box">
        <p class="main-tip-label">留言列表
          <span class="right">共27条留言</span>
        </p>
        <ul class="content-list">
          <li class="list-item">
            <div class="cmt-li-title">
              <div class="headimg">
                <img src="https://poile-img.nos-eastchina1.126.net/me.png">
              </div>
            </div>
            <div class="cmt-li-r">
              <div class="top">
                <p class="nickname">小红</p>
                <p class="date">2020-03-05 21:56 00</p>
              </div>
              <p class="body-text">哈喽博主，小站来交换友链啦，我已经给你加上了~ 名称：CCD'Blog 链接：https://ccddccd.com 描述：19线小镇青年~ 头像：https://ccddccd.com/wp-content/uploads/2019/11/1573708671-tubiao.png
              </p>
              <div class="btns-bar">
                <span class="reply-btn">回复</span>
              </div>
              <ul class="reply-list">
                <li class="reply-item">
                  <div class="reply-date">2020-03-05 21:56 00</div>
                  <div class="reply-content">
                    <div class="headimg">
                      <img src="https://poile-img.nos-eastchina1.126.net/me.png">
                    </div>
                    <div class="nickname">小红</div>
                    <p class="reply-text">哈喽博主，小站来交换友链啦，我已经给你加上了~ 名称：CCD'Blog 链接：https://ccddccd.com 描述：19线小镇青年~ 头像：https://ccddccd.com/wp-content/uploads/2019/11/1573708671-tubiao.png</p>
                  </div>
                  <div class="btns-bar">
                    <span class="reply-btn">回复</span>
                  </div>
                </li>

                <li class="reply-item">
                  <div class="reply-date">2020-03-05 21:56 00</div>
                  <div class="reply-content">
                    <div class="headimg">
                      <img src="http://thirdqq.qlogo.cn/g?b=oidb&amp;k=0ibmB9fW2dNEgCCG4Km8Xlw&amp;s=100&amp;t=1556662682">
                    </div>
                    <div class="nickname">小红</div>
                    <p class="reply-text">哈喽博主，小站来交换友链啦，我已经给你加上了~ 名称：CCD'Blog 链接：https://ccddccd.com 描述：19线小镇青年~ 头像：https://ccddccd.com/wp-content/uploads/2019/11/1573708671-tubiao.png</p>
                  </div>
                  <div class="btns-bar">
                    <span class="reply-btn">回复</span>
                  </div>
                </li>
              </ul>
            </div>
          </li>

          <li class="list-item">
            <div class="cmt-li-title">
              <div class="headimg">
                <img src="http://thirdqq.qlogo.cn/g?b=oidb&amp;k=0ibmB9fW2dNEgCCG4Km8Xlw&amp;s=100&amp;t=1556662682">
              </div>
            </div>
            <div class="cmt-li-r">
              <div class="top">
                <p class="nickname">小红</p>
                <p class="date">2020-03-05 21:56 00</p>
              </div>
              <p class="body-text">哈喽博主，小站来交换友链啦，我已经给你加上了~ 名称：CCD'Blog 链接：https://ccddccd.com 描述：19线小镇青年~ 头像：https://ccddccd.com/wp-content/uploads/2019/11/1573708671-tubiao.png
              </p>
              <div class="btns-bar">
                <span class="reply-btn">回复</span>
              </div>
            </div>
          </li>

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
        placeholder: '客官，来都来了，怎么不给博主留个言呢 ？'
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
        padding: 20px 0 40px 0;
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

      .content-list {
        margin: 0;
        padding: 0;

        .list-item {
          list-style: none;
          border-bottom: 1px dashed #e5e5e5;
          margin-bottom: 2px;
          padding-bottom: 0px;
          overflow: hidden;
          margin-top: 15px;

          .cmt-li-title {
            float: left;

            .headimg {
              height: 42px;
              width: 42px;
              border-radius: 50%;
              overflow: hidden;

              img {
                height: 100%;
                width: 100%;
              }
            }
          }

          .cmt-li-r {
            margin-left: 20px;
            width: 850px;
            float: left;

            .top {
              height: 25px;
              width: 100%;
              margin-top: 5px;
              font-size: 12px;

              .nickname {
                float: left;
                color: #e74851;
                font-weight: 700;
                font-size: 13px;
                padding: 0;
                margin: 0;
                margin-top: 12px;
              }

              .date {
                float: right;
                color: silver;
              }
            }

            .body-text {
              font-size: 14px;
              color: #333;
              line-height: 28px;
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
              }
            }

            .reply-list {
              margin: 0;
              padding: 0;

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
                }

                .reply-content {
                  float: left;
                  padding: 10px 0;
                  display: flex;
                  align-items: flex-start;

                  .headimg {
                    height: 36px;
                    width: 36px;
                    border-radius: 50%;
                    overflow: hidden;

                    img {
                      height: 100%;
                      width: 100%;
                    }
                  }

                  .nickname {
                    font-weight: 700;
                    padding-top: 13px;
                    color: #e74851;
                    padding-left: 10px;

                    &:after {
                      content: ":";
                      margin: 0 3px;
                      font-weight: bold;
                    }
                  }

                  .reply-text {
                    margin: 0;
                    padding-top: 8px;
                    flex: 1;
                    font-size: 14px;
                    color: #333;
                    line-height: 20px;
                  }
                }

                .btns-bar {
                  clear: both;
                  height: 20px;
                  margin-bottom: 4px;

                  .reply-btn {
                    font-size: 12px;
                    color: silver;
                    cursor: pointer;
                    float: right;
                  }
                }

              }
            }
          }
        }
      }
    }
  }
}
</style>
