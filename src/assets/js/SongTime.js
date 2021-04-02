  // 补零函数
  function zeroize (date) {
  return date >= 10 ? date : '0' + date
}

   // 格式化歌曲时间
export function filtrationTime (val){

  var newTime = new Date(val);
  var Minutes = zeroize(newTime.getMinutes())+': ';
  var Seconds = zeroize(newTime.getSeconds());
  // 将数组转换为字符串
    return [Minutes, Seconds].join('')
}


// 格式化普通时间 -> 年月日
export function GetCommonTime (val){

  var newTime = new Date(val);
  var year = newTime.getFullYear()+'年';
  var month = zeroize(newTime.getMonth()+1)+'月';
  var date = zeroize(newTime.getDate())+'日'+' ';
  var Hours = zeroize(newTime.getHours())+':';
  var Minutes = zeroize(newTime.getMinutes());
   return [year,month,date,Hours,Minutes].join('')
}
  
