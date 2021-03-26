<template>
  <div class="home">
    

    <!-- 轮播图 -->
    <el-row :gutter="10" class="el-row01" style="margin-bottom: 10px">
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3"><div class="grid-content bg-purple"></div></el-col>
        <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="18">
            <div class="grid-content">
                 <div class="block">
                    <el-carousel height="200px">
                        <el-carousel-item v-for="(item,index) in latestAlbum1" :key="index">
                        <!-- <h3 class="small">{{ item }}</h3> -->
                        <img v-for="(item,index) in latestAlbum2" :key="index" :src="item.pic" alt="" class="img-row-2">
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
            </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3"><div class="grid-content"></div></el-col>
    </el-row>

    <!-- 推荐歌单 -->
    <el-row :gutter="10">
        <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3"><div class="grid-content bg-purple visibilityBox">1</div></el-col>
        <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
            <div class="grid-content">
              <h3>推荐歌单</h3>
              <el-row>
                <el-col :span="3" :key="index" v-for="(item,index) in Recommendresult1">
                  <div class="grid-content bg-purple" @click="gotolistdetails(item.id)">
                    <img :src="item.picUrl" alt="" class="img-row">
                    <div>{{item.name}}</div>
                  </div>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="3" :key="index" v-for="(item,index) in Recommendresult2">
                  <div class="grid-content bg-purple" @click="gotolistdetails(item.id)">
                    <img :src="item.picUrl" alt="" class="img-row">
                     <div>{{item.name}}</div>
                  </div>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="3" :key="index" v-for="(item,index) in Recommendresult3">
                  <div class="grid-content bg-purple" @click="gotolistdetails(item.id)">
                    <img :src="item.picUrl" alt="" class="img-row">
                     <div>{{item.name}}</div>
                  </div>
                </el-col>
              </el-row>
            </div>
        </el-col>
        <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3"><div class="grid-content visibilityBox">4</div></el-col>
    </el-row>

    <!-- 推荐新歌 -->
    <el-row :gutter="10">
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="3"><div class="grid-content bg-purple visibilityBox">1</div></el-col>
        <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="18">
            <div class="grid-content">
                <h3>推荐新歌曲</h3>
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
            </div>
        </el-col>
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="3"><div class="grid-content visibilityBox">4</div></el-col>
    </el-row>

    <!-- 推荐歌手 -->
    <el-row :gutter="10">
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="3"><div class="grid-content bg-purple visibilityBox">1</div></el-col>
        <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="18">
            <div class="grid-content">
               <h3>推荐歌手</h3>
                <ul class="RecommendSinger">
                  <li :key="index" v-for="(item,index) in hotSinger" @click="goSingerdetails(item.id)">
                    <img :src="item.img1v1Url" alt="" class="hotSingerimg">
                    <div class="hotSingerdiv">
                      <span>{{item.name}}</span>
                      <div>单曲数：{{item.musicSize}}</div>
                    </div>
                  </li>
                </ul>
            </div>
        </el-col>
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="3"><div class="grid-content visibilityBox">4</div></el-col>
    </el-row>



  
  </div>
</template>

<script>
// 引入头像组件
import Dialog from './SMcomponents/profile';

export default {
  // 定义组件名称
  //name:'home',
  components: { Dialog },
  data() {
      return {
        falg:true,

        isshowturediv:'',

        // 弹出框相关变量
        dialogVisible: false,
        input:'',

        // 推荐歌单
          Recommendresult1 : '',
          Recommendresult2 : '',
          Recommendresult3 : '',

        // 最近专辑
        latestAlbum1 : '',
        latestAlbum2 : '',

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
   
  //  歌单点击通往 歌单详细
   gotolistdetails(id){
      this.$router.push("/rankingdetails/" + id);
   },

    // 推荐歌单
    async RecommendPlaylist(){
        const result = await this.$http.get("/personalized?limit=24");
        if (result.status !== 200) {
          return this.$message.error("获取推荐歌单失败！");
        }
        //  this.$message.success("获取推荐歌单获取成功！");
        console.log("歌单");
        console.log(result.data);
         this.Recommendresult1 = result.data.result.slice(0,8);
         this.Recommendresult2 = result.data.result.slice(8,16);
         this.Recommendresult3 = result.data.result.slice(16);
        //  arrayObject.slice(start,end) 截取数组
        // console.log(result.data.result);
    },
    // 首页发现
    async latestAlbum(){
        const result = await this.$http.get("/homepage/block/page");
        if (result.status !== 200) {
          return this.$message.error("获取最新专辑失败！");
        }
        //  this.$message.success("获取最新专辑成功！");
         console.log(result.data.data.blocks[0].extInfo.banners);
         this.latestAlbum1 = result.data.data.blocks[0].extInfo.banners.slice(0,5);
         this.latestAlbum2 = result.data.data.blocks[0].extInfo.banners.slice(5,10);
        console.log(this.latestAlbum1);
    },
     // 获取最新音乐
    async getlatestSong(){
        const result = await this.$http.get("/personalized/newsong");
        if (result.status !== 200) {
          return this.$message.error("获取最新音乐失败！");
        }
        //  this.$message.success("获取最新音乐成功！");
        this.latestsong = result.data.result;
        this.Singer = result.data.result;
        console.log("最新音乐");
        console.log(result.data);
        console.log(this.latestsong);

    },
    // 播放音乐，添加图片,添加歌名,显示隐藏
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

      this.GotoSongDetails(SongUrlid,musicdata);
      });
    },

      // GotoSongDetails
      GotoSongDetails(id,musicdata){
         this.$router.push({name:'SongDetails',query: {id:id,data:musicdata}})
      },
    
    // 获取歌词
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
      this.RecommendPlaylist()
      this.latestAlbum()
      this.getlatestSong()
      this.gethotSinger()
      // 获取用户详细信息
    }
};
</script>
<style lang="less" scoped>

// 登录后的下拉
 .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
.pull-down {
    position: absolute;
    left: 94px;
    top: 17px;
    width: 52px;
}
  // end



// home背景
// .home {
//   background-image: url('../assets/bjgif.gif');
// }

// 基础样式
a {
  text-decoration:none;
  color: #000;
}
a:hover{
  color: rgb(255, 0, 0);
}
ul,li {
  list-style: none;
  margin: 0;
  padding: 0;
}
// end

// 显示或隐藏
.isshow {
  display: none;
}
.isshowture {
  display: inline-block;
  color: red;
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
// 布局样式 开始
 .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
// 布局样式 结束

// 控制歌单图片
  .img-row {
    width: 75%;
    border-radius: 5px;
  }
  .img-row-2 {
      width: 32%;
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

  // 大背景
  // .home {
  //   background: url(../assets/imgbg.jpg);
  // }
// 
.bg-purple[data-v-957c9522] {
  
    background: rgba(0,0,0,0);
}


// 导航栏
.homenav {
  padding: 8px 0 ;
  /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    position: relative;
}

.navigation li{
  padding: 0 20px;
  font-size: 14px;
}

.logo img{
  width: 220px;
}
.floatLeft {
  float: left;
    // 鼠标小手
  cursor:pointer;
}
.SearchAndLogin {
    position: absolute;
    font-size: 14px;
    right: 86px;
    // 居中
    top: 55%;
    transform: translate(0, -50%);
    .SearchAndLoginImg {
      border-radius: 50%;
      width:35px 
    }
}
//导航栏end 



</style>
