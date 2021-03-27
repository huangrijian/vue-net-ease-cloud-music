import {request} from './request'

// 获取热门歌单分类
export function GetHotPlaylist(){
  return request({
    url:'/playlist/hot',
  })
}

// 获取歌单列表
export function GetPlaylistContent(order,cat,limit,offset){
  return request({
    url:'/top/playlist',
    params: {
      order,
      cat,
      limit,
      offset
    }
  })
}