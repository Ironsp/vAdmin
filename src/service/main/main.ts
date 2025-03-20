import hyRequest from '..'

/** All roules list */
export function getEntireRoles() {
  return hyRequest.post({
    url: '/role/list'
  })
}
/** All departments list */
export function getEntireDepartments() {
  return hyRequest.post({
    url: '/department/list'
  })
}

/** 完整菜单 */
export function getEntireMenu() {
  return hyRequest.post({
    url: '/menu/list'
  })
}
