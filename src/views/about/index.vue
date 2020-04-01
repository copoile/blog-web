<template>
  <div class="container">
    <app-header :nav-item-active="-1" />
    <div class="content-container markdown-body">
      <h2>简介</h2>
      <p>&ensp;&ensp;本博客主要维护人姚惠文<code>正在寻找女管理,会嘤嘤的那种</code>，一个主web开发90后普通程序员，然后活在这个不痛不痒的世界里。因为以前比较喜欢玩电脑，而且觉得写代码很牛逼的亚子，所以大学学了计算机，之后便在程序袁的不归路上越走越远......  </p>
      <p>&ensp;&ensp;对于编程，谈不上喜欢与不喜欢<code>不，你喜欢.jpg</code>，只是编程这件事能让我孜孜不倦的做下去，编程于我而言算是一件有趣的事情。因为兴趣，编程成为了我的工作，其实我也怕当兴趣成为我的工作后，兴趣不再是兴趣，变成一种负担,但我更无法忍受我的工作是我不喜欢做事情。<code>沧桑脸.jpg</code> 都是为了生活，某得办法，且行且努力吧。希望能通过我自己的一点点努力拉近自己理想生活的距离，出任CEO，迎娶白富美，走上人生巅峰​(<span class="ql-emojiblot" data-name="peach">﻿<span contenteditable="false"><span class="ap ap-peach">?</span></span>﻿</span>真好吃，甚至有点想开潘<span class="ql-emojiblot" data-name="peach">﻿<span contenteditable="false"><span class="ap ap-peach">?</span></span>﻿</span>大会)。  </p>
      <blockquote><p>医生说我牙不好，怕是以后只能吃软饭了，所以有没有那种，就是那种能包.......那没有的话我等下再来问下。</p>
      </blockquote>
      <h2>宗旨</h2>
      <p>&ensp;&ensp;本博客宗旨主要分享作者在生活和工作中读过的好文章，以及作者在生活和工作过程中遇到的一些问题的记录，一些心得以及总结的输出。希望通过博客记录的这种方式沉淀下自己，同时也希望能帮到更多的人，交到更多志同道合的朋友，聊聊<code>哲学</code>，谈谈<code>橘子</code>。</p>
      <h2>项目开源</h2>
      <p>&ensp;&ensp;项目包括前后端，都是博主自己写的，前端项目使用Vue + Element-UI编写，后端使用SpringBoot + MyBatis-Plus + Security搭建的博客服务Api。项目目前都已在Github上开源，欢迎star哦～</p>
      <ul>
      <li>前端项目：<a href='https://github.com/copoile/blog-web' target="_blank">https://github.com/copoile/blog-web</a></li>
      <li>后端项目：<a href='https://github.com/copoile/blog-api' target="_blank">https://github.com/copoile/blog-api</a></li>
      </ul>
      <h2>意见反馈</h2>
      <p>&ensp;&ensp;若本号内容有涉及版权问题请及时联系博主进行整改，站内错误或是其他内容建议也欢迎反馈到博主。</p>
      <h2>联系方式</h2>
      <ul>
      <li>邮箱：<a href="mailto:yaohw484gmail.com">yaohw484gmail.com</a></li>
      <li>微信：poile</li>
      </ul>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/Header/index'
export default {
  components: {
    AppHeader
  }
}
</script>

<style lang="scss" scoped>
.container {
  @import '~@/styles/variables';
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: -webkit-overlay;
  overflow-y: overlay;

  .content-container {
    background: #fff;
    max-width: 720px;
    margin: 0 auto;
    margin-top: 15px;
    border-radius: 2px;
    font-size: 15px;
    box-sizing: border-box;
    padding: 15px;

    @media screen and (max-width: 922px){
      margin-top: 0;
    }
  }
}
</style>
