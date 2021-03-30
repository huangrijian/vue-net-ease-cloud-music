import {request} from './request'

// 获取动态
export function GetDynamic(pagesize,lasttime,cookie){
  return request({
    url:'/event',
    params: {
      pagesize,
      lasttime,
      cookie
    }
  })
}