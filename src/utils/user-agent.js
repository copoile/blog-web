/**
 * @description 是否手机浏览器
 */
export function isMBrowser() {
  var sUserAgent = navigator.userAgent.toLowerCase()
  var nIsIpad = sUserAgent.match(/ipad/i) == 'ipad'
  var nIsIphoneOs = sUserAgent.match(/iphone os/i) == 'iphone os'
  var nIsMidp = sUserAgent.match(/midp/i) == 'midp'
  var nIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4'
  var nIsUc = sUserAgent.match(/ucweb/i) == 'ucweb'
  var nIsAndroid = sUserAgent.match(/android/i) == 'android'
  var nIsCE = sUserAgent.match(/windows ce/i) == 'windows ce'
  var nIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile'
  if (!(nIsIpad || nIsIphoneOs || nIsMidp || nIsUc7 || nIsUc || nIsAndroid || nIsCE || nIsWM)){
    return false
  } else {
    return true
  }
}
