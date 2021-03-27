import {request} from './request'

// 推荐歌单
export function GetRecommendPlaylist(limit){
  return request({
    url:'/personalized',
    params: {
      limit
    }
  })
}

// 获取轮播图
export function GetLatestAlbum(){
  return request({
    url:'/homepage/block/page',
  })
}

// 获取最新音乐
export function GetLatestSong(){
  return request({
    url:'/personalized/newsong',
  })
}

// 获取获取歌词
export function GetLyric(id){
  return request({
    url:'/lyric',
    params: {
      id
    }
  })
}

// 获取音乐播放地址
export function GetSongUrl(id){
  return request({
    url:'/song/url',
    params: {
      id
    }
  })
}
