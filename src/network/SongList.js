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

// 获取全部歌单 /playlist/catlist
export function GetAllPlaylist(){
  return request({
    url:'/playlist/catlist'
  })
}