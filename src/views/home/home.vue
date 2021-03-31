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

  <div class="layoutBox">
     <layout class="layoutBox">
        <song-list title="推荐歌单">
          <li slot="songlist" :key="index" v-for="(item,index) in Recommendresult">
            <img :src="item.picUrl" alt="" >
            <div>{{item.name}}</div>
          </li>
        </song-list>
     </layout>
  </div>

    <!-- 推荐新歌 -->
  <div class="layoutBox">
    <layout>
      <title-box title="推荐新歌"></title-box>
      <ul class="RecommendSong">
        <li :key="index" v-for="(item,index) in latestsong" @mouseover="showdiv(index + 1 )"  @click="playSong(item.id,item.picUrl,item.name,item.song.artists[0].name)">
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
              <div>03:27</div>
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


export default {
  components: { 
    layout,
    SongList,
    TitleBox
  },
  name:'home',
  data() {
      return {
        falg:true,

        isshowturediv:'',

        // 弹出框相关变量
        dialogVisible: false,
        input:'',

        // 推荐歌单
        Recommendresult:'',
        // 最近专辑
        latestAlbum:'',

        // 推荐歌曲
        latestsong : '',
        Singer:'',
        // 音乐地址
        playUrl:'',
        // 音乐照片
        picUrl:'',
        // 音乐名称
        picname:'',
        flag: false,

        // 热门歌手
        hotSinger:'',
        lyric:'',

        SongUrlid:''
      }
  },
  methods: {

  showdiv(index){
      this.isshowturediv = index
    },
  /*
  *
  * 以下是路由跳转相关的方法
  * 
  */ 
  //  去歌单详细
   gotolistdetails(id){
      this.$router.push("/rankingdetails/" + id);
   },
  // 去歌曲详细
  GotoSongDetails(id,musicdata){
    this.$router.push({name:'SongDetails',query: {id:id,data:musicdata}})
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
    })
  },

  // 获取轮播图
  GetLatestAlbum(){
    GetLatestAlbum().then(res => {
      console.log(res);
      // this.latestAlbum1 = res.data.blocks[0].extInfo.banners.slice(0,5);
      // this.latestAlbum2 = res.data.blocks[0].extInfo.banners.slice(5,10);
      this.latestAlbum = res.banners
    })
  },

  // 获取最新音乐
  GetLatestSong(){
    GetLatestSong().then(res => {
      this.latestsong = res.result;
      this.Singer = res.result;
    })
      
  },

  // playSong(SongUrlid,img,name,singername){
  //   this.SongUrlid = SongUrlid;
  //   console.log(SongUrlid);
  //   // 获取音乐播放地址
  //   GetSongUrl(SongUrlid).then(res => {
  //     console.log(res);
  //     this.playUrl = res.data[0].url;
  //     this.picUrl = img;
  //     this.picname = name;
  //     this.flag = true;
  //     this.Singer = singername;
  //   }).then(
  //     GetLyric(SongUrlid).then(res => {
  //       var musicdata = {
  //       playUrl:this.playUrl,
  //       picUrl:this.picUrl,
  //       picname:this.picname,
  //       Singer:this.Singer,
  //       lyric:res,
  //     }
  //     //发送给app.vue
  //     this.$emit('getMusicMessage', musicdata);
  //     this.GotoSongDetails(SongUrlid,musicdata);
  //     }))
  // },


  //播放音乐，添加图片,添加歌名,显示隐藏
    async playSong(SongUrlid,img,name,singername){
      console.log(SongUrlid);
      // 保存id
      this.SongUrlid = SongUrlid;
      // 先获取id,再根据id调接口获取音乐播放地址
      const result = await this.$http.get("/song/url?id=" + SongUrlid );
      console.log(result.data.data[0].url);

      this.playUrl =  result.data.data[0].url;
      this.picUrl = img;
      this.picname = name;
      // 显示隐藏变量
      this.flag = true;
      // 歌手名称
      this.Singer = singername;
      // 获取歌词 -> getlyric是异步的方法 直接打印会出现提示：Promise {<pending>}  Promise 要用 then() 接收或者 async await 来修饰
      this.getlyric(SongUrlid).then(res => {
        // 歌词
        console.log(res);
        var musicdata = {
          playUrl:this.playUrl,
          picUrl:this.picUrl,
          picname:this.picname,
          Singer:this.Singer,
          lyric:res,
        }
      // 发送给app.vue
        this.$emit('getMusicMessage', musicdata);
      // 跳转到歌曲详情
        this.GotoSongDetails(SongUrlid,musicdata);
      });
    },


    
    //获取歌词
    async getlyric(SongUrlid){
      const result = await this.$http.get("/lyric?id=" + SongUrlid );
      if (result.status !== 200) {
          return this.$message.error("获取最新音乐失败！");
        }
      return  result.data.lrc.lyric
    },

    // 热门歌手
    async gethotSinger (){
      const result = await this.$http.get("/top/artists?offset=0&limit=30");
      console.log("热门歌手");
      console.log(result.data.artists);
      this.hotSinger = result.data.artists
    },
  // 跳转歌手详情
  goSingerdetails(id) {
    console.log(id);
    // 传递参数  -- this.$router.push({name: ' 路由的name ', params: {key: value}})
    // 参数取值  -- this.$route.params.key
    // 路由跳转
    this.$router.push('/SingerDetails/' + id )
  },
  },


   // 生命周期函数  页面刷新时调用
    mounted() {
      this.GetLatestAlbum()
      this.GetRecommendPlaylist()
      this.GetLatestSong()
      this.gethotSinger()
      // 获取用户详细信息
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


.layoutBox {
  margin-bottom: 30px;
}


</style>
