<template>
<!--  class="Determinelocation" -->
  <div>
      <!-- <ul>
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
      </ul> -->
    <play-song :SearchSongData="hotSongs"/>
  </div>
</template>

<script>
// import {playMisic } from '@/network/PlayMisic.js'
import PlaySong from '@/components/common/play_song/PlaySong'
export default {
  components:{
    PlaySong
  },
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
        // 播放歌曲
    playMisic(id){
      playMisic(id).then(musicdata => {
      this.$bus.$emit('getMusicMessage',musicdata)
      this.$router.push({name:'SongDetails',query: {id:id,data:musicdata}})
      });
    },
    
    showdiv(index){
      this.isshowturediv = index
    },

    async gethotSingerHotworks() {
      const result = await this.$http.get("/artist/top/song?id=" + this.SingerId);
 
      // this.$message.success("获取成功！");
        console.log("歌曲");
        this.hotSongs = result.data.songs
        console.log(this.hotSongs);
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
