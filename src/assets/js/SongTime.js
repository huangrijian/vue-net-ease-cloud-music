  // 补零函数
  function zeroize (date) {
  return date >= 10 ? date : '0' + date
}

   // 格式化时间
export function filtrationTime (val){


  var newTime = new Date(val);
  var Minutes = zeroize(newTime.getMinutes())+': ';
  var Seconds = zeroize(newTime.getSeconds());
  // 将数组转换为字符串
    return [Minutes, Seconds].join('')
}
