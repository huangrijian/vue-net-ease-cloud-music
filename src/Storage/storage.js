// 保存、获取、删除 sessionStorage item 的js

// 保存
export const setSessionStorageItem = (key, value) => {
  // 判断传来的值是否是对象（对象或者数组）,如果是则转换为json字符串
  if(typeof value === 'object'){
    value = JSON.stringify(value)
  }
  window.sessionStorage.setItem(key, value)

}

// 获取
export const getSessionStorageItem = key => {
  const data = window.sessionStorage.getItem(key)
  try {
    // 尝试将json字符串其转换为json对象
    return JSON.parse(data)
  } catch (error) {
    // 如果报错说明传入的key是一个普通字符串
    return data
  }
}

// 删除
export const removeItem = key => {
  window.sessionStorage.removeItem(key)
}
