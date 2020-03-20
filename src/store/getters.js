const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  defaultAvatar: state => state.settings.defaultAvatar,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  login_visible: state => state.login.visible,
  login_username: state => state.login.username,
  login_password: state => state.login.password
}
export default getters
