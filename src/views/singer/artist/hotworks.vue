<template>
<!--  class="Determinelocation" -->
  <div>
      <ul>
        <li class="Songli">
          <div class="num">序号</div>
          <div class="song">歌曲</div>
          <div class="album">专辑</div>
          <div class="time">时长</div>
        </li>
         <li class="Songli Songlifont" :key="index" v-for="(item,index) in hotSongs"  @mouseover="showdiv(index + 1 )"   @click="playMisic(item.id)">
           <div class="font-box">
              <div :class="{isshow: isshowturediv == index + 1 }">{{index + 1}}</div>
              <span class="el-icon-video-play isshow" :class="{isshowture: isshowturediv == index + 1 }"></span>
           </div>
          <div class="song">
            <img :src="item.al.picUrl" alt="" class="Songimg">
            <div style="float: left;">{{item.name}}</div>
          </div>
          <div class="album">
            <span>{{item.al.name}}</span>
          </div>
          <div class="time">(⑅˃◡˂⑅) 待开发ing... </div>
        </li>
      </ul>

    </div>
</template>

<script>
export default {

  data() {
    return {
      SingerId: this.$route.params.SingerId,
      hotSongs:'',
      // 类名
      num:'num',
      // 歌曲url
      playUrl:'',

       isshowturediv:'',
    };
  },
  methods: {
    
    showdiv(index){
      this.isshowturediv = index
    },

      async playMisic(SongUrlid){
        console.log(9999);
        console.log(SongUrlid);
      // 获取音乐播放地址
      const result = await this.$http.get("/song/url?id=" + SongUrlid );
      console.log(result.data.data[0].url);

          //2. 获取歌曲详细信息 歌名 -> 作者 
    const result1 = await this.$http.get("/song/detail?ids="+ SongUrlid);
        if (result.status !== 200) {
          return this.$message.error("获取失败！");
    }
    console.log("歌曲详细");
    console.log(result1.data.songs[0]);
    var songname = result1.data.songs[0].name
    var songpic = result1.data.songs[0].al.picUrl
    var singer = result1.data.songs[0].ar[0].name
    //3. 获取歌词 /lyric?id=
    const result2 = await this.$http.get("/lyric?id="+ SongUrlid);
        if (result2.status !== 200) {
          return this.$message.error("获取失败！");
    }
  
    // console.log(result2.data.nolyric);

      this.playUrl =  result.data.data[0].url
      console.log(this.playUrl );


     if(result2.data.nolyric){
        var musicdata = {
        playUrl:this.playUrl,
        picUrl:songpic,
        picname:songname,
        Singer:singer,
        lyric:'[00:00.00]  暂无歌词 那我给大家跳段街舞好了 ጿ ኈ ቼ ዽ ጿ ኈ ቼ ዽ ጿ ኈ ቼ ዽ ጿ ኈ ቼ ዽ ጿ ኈ ቼ ዽ ጿ',
      }
     }else {
        var musicdata = {
        playUrl:this.playUrl,
        picUrl:songpic,
        picname:songname,
        Singer:singer,
        lyric:result2.data.lrc.lyric,
      }
     }

        
      // 发送给父亲.vue
      this.$emit('getMusicMessage', musicdata);

       this.$router.push({name:'SongDetails',query: {id:SongUrlid,data:musicdata}})

  },
    async gethotSingerHotworks() {
      const result = await this.$http.get("/artist/top/song?id=" + this.SingerId);
      if (result.status !== 200) {
        return this.$message.error("获取失败！");
      }
      // this.$message.success("获取成功！");
        console.log(result.data.songs);
        this.hotSongs = result.data.songs
    },
  },
    // 生命周期函数  页面刷新时调用
  mounted() {
    this.gethotSingerHotworks();
  },
};
</script>
<style  lang="less" scoped>
// 基础样式
a {
  text-decoration: none;
  color: #000;
}
a:hover {
  color: rgb(255, 0, 0);
}
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
}
ul {
  width: 100%;
}
// 每一个li行
.Songli {
  width: 100%;
  height: 65px;
  
  .num {
        /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: center;
  }
}
.Songli:hover {
  background: rgb(222, 226, 217)!important;
}
.Songli:nth-child(even){
  background: rgb(239, 241, 237);
}


// 基础样式 end
.Songli div {
  float: left;
  height: 100%;
  line-height: 65px;
}
.Songlifont {
  cursor:pointer;//鼠标变小手
  font-size: 14px;
  .font-box {
    width: 10%;
      /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
     /*实现水平居中*/
    justify-content: center;
  }
}
// 四个选项
.num {
  width: 10%;

}
.song {
  width: 40%;
  .Songimg {
     float: left;
     width:50px;
     border-radius: 10px;
     margin-right: 10px;
     margin-top: 10px;
  }
}
.album {
  width: 40%;
}
.time {
  width: 10%;
}
.playelement {
  height: 50px;
}
.Aplayer {
  width: 100%;
  position: fixed;
  bottom: -5px;
  left: 0;
}
.aplayer .aplayer-body {
    display: flex;
}

// 显示或隐藏
.isshow {
  display: none;
}
.isshowture {
  display: inline-block;
  color: red;
}

</style>
