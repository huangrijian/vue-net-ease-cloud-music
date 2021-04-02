<template>
  <div class="home">
  
    <!-- 轮播图 -->
  <div class="layoutBox">
    <layout class="layoutBox">
      <el-carousel :interval="4000" type="card" height="245px">
        <el-carousel-item v-for="(item,index) in latestAlbum" :key="index">
          <a :href="item.url">
            <img :src="item.imageUrl" alt="" class="img-row-2">
          </a>
        </el-carousel-item>
      </el-carousel>
    </layout>
  </div>

  <!-- 推荐歌单 -->
  <div>
     <layout>
        <song-list title="推荐歌单" :SongListData="Recommendresult"/>
     </layout>
  </div>

    <!-- 推荐新歌 -->
  <div class="layoutBox">
    <layout>
      <title-box title="推荐新歌"></title-box>
      <ul class="RecommendSong">
        <li :key="index" v-for="(item,index) in latestsong" @mouseover="showdiv(index + 1 )"  @click="playSong(item.id)">
            <div style="display:inline-block;padding-left:25px">
              <a href="javascript:;" class="el-icon-video-play isshow" :class="{isshowture: isshowturediv == index+1 }"></a>
              <span class="marginbox" :class="{isshow: isshowturediv == index+1 }" >0{{index + 1 }}</span>
            </div>
            <!-- 歌曲封面 -->
            <img :src="item.picUrl" alt="" class="img-sm">
            <!-- 歌名与歌手名称 -->
            <div style="display:inline-block">
              <div>{{item.name}}</div>
              <div style="margin-top:15px">{{item.song.artists[0].name}}</div>
            </div>
            <!-- 专辑名称 -->
            <div style="display:inline-block" class="album">
              <div>《{{item.song.album.name}}》</div>
            </div>
            <!-- 歌曲时长 -->
            <div class="time">
              <div>{{item.song.mMusic.playTime | GetTime()}}</div>
            </div>
         </li>
      </ul>          
    </layout>
  </div>

    <!-- 推荐歌手 -->
   <div class="layoutBox">
    <layout class="layoutBox">
      <title-box title="推荐歌手"></title-box>
      <ul class="RecommendSinger">
        <li :key="index" v-for="(item,index) in hotSinger" @click="goSingerdetails(item.id)">
          <img :src="item.img1v1Url" alt="" class="hotSingerimg">
            <div class="hotSingerdiv">
              <span>{{item.name}}</span>
              <div>单曲数：{{item.musicSize}}</div>
            </div>
        </li>
      </ul>
    </layout>
   </div>

  </div>
</template>

<script>
import { GetRecommendPlaylist,
         GetLatestAlbum,
         GetLatestSong
} from '@/network/home.js'
// 布局组件
import layout from '../../components/content/layout/layout.vue';
// 歌单组件
import SongList from '@/components/content/song_list/SongList.vue'
// 小标题组件
import TitleBox from '../../components/common/Title/title.vue';
// 播放音乐的js
import {playMisic } from '@/network/PlayMisic.js'
// 格式化时间
import { filtrationTime } from '@/assets/js/SongTime.js'
export default {
  components: { 
    layout,
    SongList,
    TitleBox
  },
  name:'home',
  filters:{
    GetTime(val){
     return filtrationTime(val);
    },
    GetPlayCount(val){
      return val >= 10000 ? Math.floor(val/10000)  + 'w' : val
    }
  },
  data() {
      return {
        falg:true,

        isshowturediv:'',

        // 弹出框相关变量
        dialogVisible: false,
        input:'',

        // 推荐歌单
        Recommendresult:[],
        // 最近专辑
        latestAlbum:'',

        // 推荐歌曲
        latestsong : '',
        Singer:'',
        // 热门歌手
        hotSinger:'',

        SongUrlid:''
      }
  },
  methods: {

  showdiv(index){
      this.isshowturediv = index
    },

  /*
  *
  * 以下是网络请求相关的方法
  * 
  */ 
  // 获取推荐歌单
  GetRecommendPlaylist(){
    GetRecommendPlaylist(30).then(res => {
      this.Recommendresult = res.result
      console.log(this.Recommendresult);
    })
  },

  // 获取轮播图
  GetLatestAlbum(){
    GetLatestAlbum().then(res => {
      this.latestAlbum = res.banners
    })
  },

  // 获取最新音乐
  GetLatestSong(){
    GetLatestSong().then(res => {
      this.latestsong = res.result;
      console.log("latestsong");
      console.log( this.latestsong);
    })
      
  },

  // 播放音乐
  playSong(id){
    playMisic(id).then(musicdata => {
      this.$bus.$emit('getMusicMessage',{musicdata,id})
      this.$router.push({name:'SongDetails',query: {id:id,data:musicdata}})
    });
  },


    // 热门歌手
    async gethotSinger (){
      const result = await this.$http.get("/top/artists?offset=0&limit=30");
      this.hotSinger = result.data.artists
    },
  // 跳转歌手详情
  goSingerdetails(id) {
    console.log(id);
    // 传递参数  -- this.$router.push({name: ' 路由的name ', params: {key: value}})
    // 参数取值  -- this.$route.params.key
    this.$router.push('/SingerDetails/' + id )
  },
  },


   // 生命周期函数  页面刷新时调用
    mounted() {
      this.GetLatestAlbum()
      this.GetRecommendPlaylist()
      this.GetLatestSong()
      this.gethotSinger()
    }
};
</script>
<style lang="less" scoped>

// 显示或隐藏
.isshow {
  display: none;
}
.isshowture {
  display: inline-block;
  color: red;
}
.recommendTit {
  margin-top: 0;
}
.recommendBox {
  display: flex;
}
.RecommendSong li {
    position: relative;
    float: left;
    width: 47%;
    margin: 16px;
    height: 80px;
    background-color: rgb(250, 250, 250);
    border-radius: 3px;
    font-size: 14px;
    box-shadow: 0px 10px 40px 10px rgba(0, 0, 0, 0.1);
        // 鼠标小手
  cursor:pointer;
  /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    .album {
       position: absolute;
       right: 115px;
       font-size: 13px;
    }
    .time {
       position: absolute;
       right: 25px;
    }


}
.RecommendSinger li {
    text-align:center;
    float: left;
    width: 98px;
    border-radius: 50%;
    margin: 20px;
    margin-top: 35px;
    height: 98px;
    font-size: 12px;

}

.bj {
    width: 100%;
    margin: 0 0 35px 0 !important;
    margin-bottom: 10px;
    box-shadow: 0px 9px 48px 5px rgba(0, 0, 0, 0.1);
}
.extrusion {
    height: 10px;
}


// 控制歌单图片
  .img-row {
    width: 75%;
    border-radius: 5px;
    box-shadow: 6px 6px 3px -1px rgba(37, 37, 37, 0.3);
  }
  .img-row-2 {
      height: 100%;
      margin-right: 10px;
  }
  .img-sm {
    width: 9%;
    margin: 0 35px;
    border-radius: 3px;
  }
  .hotSingerimg {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  // 控制歌单图片下面的文字
  .bg-purple div{
    font-size: 14px;
    width: 75%;
    // 强制两行
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;//以此类推，3行4行直接该数字就好啦
}

// 隐藏元素但依然占位
  .visibilityBox {
    visibility:hidden;
  }

.bg-purple[data-v-957c9522] {
  
    background: rgba(0,0,0,0);
}

</style>
