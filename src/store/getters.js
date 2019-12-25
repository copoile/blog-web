const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  defaultAvatar: state => state.settings.defaultAvatar,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes
}
export default getters
