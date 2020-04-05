<template>
  <div class="container">
    <app-header :nav-item-active="-1" />
    <div class="content-container markdown-body">
      <h1 style="text-align: center;">悦读分享用户协议</h1>
      <h3>导言</h3>
      <p>欢迎使用“悦读分享”以及相关服务！</p>
      <p>为了更好地向您提供服务，请您在使用“悦读分享”及相关服务之前，认真阅读并理解本协议。</p>
      <h3>关于账号</h3>
      <p>(a)“悦读分享”及相关服务为您提供了注册通道，你有权选择合法的字符组合作为自己的账号，并自行设置符合安全要求的密码。用户设置的账号、密码是用户用以登录并使用“悦读分享”及相关服务的凭证。  </p>
      <p>(b)您理解并承诺，您所设置的账号不得违反国家法律法规及站点的相关规则，您的账号名称、头像和简介等注册信息及其他个人信息中不得出现违法和不良信息，未经他人许可不得用他人名义（包括但不限于冒用他人姓名、名称、字号、头像等足以让人引起混淆的方式）开设账号，不得恶意注册（包括但不限于频繁注册、批量注册账号等行为）。您在账号注册及使用过程中需遵守相关法律法规，不得实施任何侵害国家利益、损害其他公民合法权益，有害社会道德风尚的行为。如果发现或者有合理理由认为使用者为违反相关规则，站点有权禁用用户。</p>
      <p>(c)您有责任维护个人账号、密码的安全性与保密性，并对您以注册账号名义所从事的活动承担全部法律责任，包括但不限于您在站点及相关服务上进行的任何数据修改、言论发表、款项支付等操作行为可能引起的一切法律责任。您应高度重视对账号与密码的保密，在任何情况下不向他人透露账号及密码。</p>
      <h3>个人信息保护</h3>
      <p>站点与您一同致力于您个人信息（即能够独立或与其他信息结合后识别用户身份的信息）的保护。站点使用加密技术及其他安全措施保护您的个人信息。</p>
      <h3>用户行为规范</h3>
      <p>您评论、发布、传播的内容应自觉遵守宪法法律、法规、遵守公共秩序，尊重社会公德、社会主义制度、国家利益、公民合法权益、道德风尚和信息真实性等要求。您同意并承诺不制作、复制、发布、传播法律、法规禁止的内容。</p>
      <h3>违规处理</h3>
      <p>针对您违反本协议或其他服务条款的行为，站点有权独立判断并视情况采取预先警示、拒绝发布、立即停止传输信息、删除跟帖、短期禁止发言、限制账号部分或者全部功能直至永久关闭账号等措施。站点有权公告处理结果，且有权根据实际情况决定是否恢复相关账号的使用。对涉嫌违反法律法规、涉嫌违法犯罪的行为将保存有关记录，并依法向有关主管部门报告、配合有关主管部门调查。</p>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/Header/index'
export default {
  name: 'Terms',
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
    margin-bottom: 20px;

    @media screen and (max-width: 922px){
      margin-top: 0;
    }
  }
}
</style>
