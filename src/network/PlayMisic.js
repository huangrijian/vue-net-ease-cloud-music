import {request} from './request'

// 获取音乐播放地址
function GetPlayMisicUrl(id){
  return request({
    url:'/song/url',
    params: {
      id
    }
  })
}

// 获取歌曲详细信息 歌名 -> 作者 
function GetPlayMisicMessage(ids){
  return request({
    url:'/song/detail',
    params: {
      ids
    }
  })
}

// 获取歌词 
function GetPlayMisicLyric(id){
  return request({
    url:'/lyric',
    params: {
      id
    }
  })
}

// 用于获取音乐播放地址和歌词
export async function playMisic(SongUrlid){
   
  let playUrl = null;
  let picname = null;
  let picUrl = null;
  let Singer = null;
  // 如果要得到 musicdata 必须先获取到  音乐播放地址 音乐播放地址
  let musicdata = {};

    // 获取音乐播放地址  async设置一个函数为异步函数  wait 用于等待一个异步方法执行完成。
    const result =  await GetPlayMisicUrl(SongUrlid)
    playUrl = result.data[0].url

      //2. 获取音乐播放地址 歌名 -> 作者 
      const result1 = await GetPlayMisicMessage(SongUrlid)
        picname = result1.songs[0].name
        picUrl = result1.songs[0].al.picUrl
        Singer = result1.songs[0].ar[0].name

    //3. 获取歌词 /lyric?id=

    const result2 = await GetPlayMisicLyric(SongUrlid)
    if(result2.uncollected || result2.nolyric){
      // 如果没有歌词
     musicdata = {
        playUrl,
        picUrl,
        picname,
        Singer,
        lyric:'[00:00.00]  暂无歌词 那我给大家跳段街舞好了 ጿ ኈ ቼ ዽ ጿ ኈ ቼ ዽ ጿ ኈ ቼ ዽ ጿ ኈ ቼ ዽ ጿ ኈ ቼ ዽ ጿ',
      }
    }else {
      musicdata = {
        playUrl,
        picUrl,
        picname,
        Singer,
        lyric:result2.lrc.lyric,
      }
    }
    return musicdata
}