import defaultSettings from '@/settings'

const title = defaultSettings.title || '个人悦读分享'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
