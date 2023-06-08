export const setSession = (key, value) => { // 设置sessionStorage
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.sessionStorage.setItem(key, value)
}
export const getSession = (key) => { // 获取sessionStorage
    let value = window.sessionStorage.getItem(key)
    try {
        value = JSON.parse(value)
        }
    catch (err) {
        value = value
        }
    return value
}