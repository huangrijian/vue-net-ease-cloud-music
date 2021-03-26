<template>
  <div class="SingerDetails">

<!-- 弹出框 -->

<el-dialog
  title="珍惜所有的不期而遇，看淡所有的不辞而别。"
  :visible.sync="dialogVisible"
  width="30%">
  <el-input prefix-icon="el-icon-search" v-model="input" placeholder="请输入关键词"></el-input>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>


    
  
     <!-- mian -->
     <el-row :gutter="10" class="mian">
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3"><div class="grid-content"></div></el-col>
        <!-- 左侧 -->
        <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="12">
            <div class="grid-content">
                <div class="main-left">
                    <div class="top">
                        <!-- 图片 -->
                        <img class="floatLeft" :src="rankingPic" alt="">
                        <!-- 歌单描述 -->
                        <div class="top-description floatLeft">
                          <div class="title">{{rankingname}}</div>
                          <div class="smbox">
                              <!-- 小图 -->
                              <img :src="rankingavatarUrl" alt="">
                              <span>{{nickname}}</span>
                              <span>2019-06-05创建</span>
                            </div>
                            <div>
                              <span>标签：</span>
                              <el-button type="danger" round>华语</el-button>
                          </div>
                          <p>
                           {{rankingdescription}}
                          </p>
                          <!-- 两个定位的按钮 -->
                          <el-button type="danger" round>播放全部</el-button>
                          <el-button round>收藏</el-button>
                        </div>
                    </div>
                    <!-- 左下 -->
                     <div class="bottom">
                         <ul>
                            <li class="Songli">
                              <div class="num"><span>序号</span></div>
                              <div class="song">歌曲</div>
                              <div class="album">专辑</div>
                              <div class="time">时长</div>
                            </li>
                            <li class="Songli Songlifont" :key="index" v-for="(item,index) in Songcontent" @click="sendurl(item.id,item.al)">
                              <div class="num"><span>{{index + 1}}</span></div>
                              <div class="song">
                                <img :src="item.al.picUrl" alt="" class="Songimg">
                                <div style="float: left;">{{item.al.name}}</div>
                              </div>
                              <div class="album">
                                <span>{{item.al.name}}</span>
                              </div>
                              <div class="time">没做完ʕ•ﻌ•ʔ</div>
                            </li>
                      </ul>
                    </div>
                </div>
            </div>
        </el-col>
        <!-- 右侧 -->
         <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="6">
            <div class="grid-content">
                <div class="main-right">
                   <div class="top">
                     <div class="top-title">
                       <span>|</span>
                       <strong>喜欢这个歌单的人</strong>
                     </div>
                      <ul class="loveThat">
                        <li  :key="index" v-for="(item,index) in getSongCollectorpic"><img class="loveThatPic" :src="item.avatarUrl" alt=""></li>
                      </ul>

                    </div>
                     <div class="bottom">
                        <!-- 相关推荐 -->
                        <div class="bottomAabout">
                          <div class="bottomAaboutTitle">
                            <span>|</span>
                            <strong>相关推荐</strong>
                          </div>
                          <ul class="bottomAaboutList">
                            <li :key="index" v-for="(item,index) in playlists" @click="gotolikeness(item.id)">
                              <img :src="item.coverImgUrl" alt="">
                              <div class="dec">
                                <strong>{{item.name}}</strong>
                                <div>{{item.creator.nickname}}</div>
                              </div>
                            </li>
                    
                          </ul>
                        </div>
                    </div>
                </div>
            </div>
        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3"><div class="grid-content"></div></el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name:'rankingdetails',
  //局部刷新组件要用到的数据 
  inject: ['reload'],

  data() {
    return {
        
      // 接受动态路由传来的参数
      rankingId: this.$route.params.id,

      // 弹出框相关变量
      dialogVisible: false,
      input:'',

      // 榜单名称
      rankingname:'',
      // 榜单描述
      rankingdescription:'',
      // 榜单图片
      rankingPic:'',
      // 榜单发布者头像
      rankingavatarUrl:'',
      // 昵称
      nickname:'',
      // 发布时间
      updateTime:'',

      // 收藏这个歌单的人
      getSongCollectorpic:'',

      // 歌单详细内容
      Songcontent:'',

      // 相关歌单推荐
      playlists:'',

    };
  },


  methods: {

    // getsongname(id){
    //     console.log(id);
    //       // 获取歌曲详细信息
    // this.$http.get("/song/detail?ids="+ id).
    // then(result1 => {
    //     if (result1.status !== 200) {
    //       return this.$message.error("获取失败！");
    // }
    // console.log("歌曲详细");
    // console.log(result1.data.songs[0].name);
  
    //     this.name.push(result1.data.songs[0].name);
    //     console.log(this.name);
    // })
    // },

    // 获取歌单描述
    async getSongDetails(){
      const result = await this.$http.get("/playlist/detail?id=" + this.rankingId);
      if (result.status !== 200) {
          return this.$message.error("获取失败！");
      }
        this.rankingname = result.data.playlist.name
        this.rankingdescription = result.data.playlist.description
        this.rankingPic = result.data.playlist.coverImgUrl
        this.rankingavatarUrl = result.data.playlist.creator.avatarUrl
        this.nickname = result.data.playlist.creator.nickname
        this.updateTime = result.data.playlist.updateTime
        console.log(this.updateTime);
    },

    // 获取歌单收藏者
      async getSongCollector(){
      const result = await this.$http.get("/playlist/subscribers?id="+ this.rankingId +"&limit=18");
      if (result.status !== 200) {
          return this.$message.error("获取失败！");
      }
        this.getSongCollectorpic = result.data.subscribers;
    },

    // 获取歌单内容
      async getSongcontent(){
      const result = await this.$http.get("/playlist/detail?id="+ this.rankingId);
      if (result.status !== 200) {
          return this.$message.error("获取失败！");
      }
      console.log("歌单内容");
      console.log(result.data);
      this.Songcontent = result.data.playlist.tracks;
    },

    // 获取音乐地址等信息后发起请求 /song/url?id=
   async sendurl(id,item){

    //1.  获取音乐url地址
       const result = await this.$http.get("/song/url?id="+ id);
        if (result.status !== 200) {
          return this.$message.error("获取失败！");
      }
      // 音乐url
       console.log(result.data.data[0].url);
       console.log(item);

    //2. 获取歌曲详细信息 歌名 -> 作者 
    const result1 = await this.$http.get("/song/detail?ids="+ id);
        if (result.status !== 200) {
          return this.$message.error("获取失败！");
    }
    console.log("歌曲详细");
    console.log(result1.data.songs[0]);

    //3. 获取歌词 /lyric?id=
    const result2 = await this.$http.get("/lyric?id="+ id);
        if (result2.status !== 200) {
          return this.$message.error("获取失败！");
    }
    console.log("歌词详细");
    // console.log(result2.data.lrc.lyric);
    // console.log(result2.data.nolyric);

    if(result2.data.nolyric){
       var musicdata = {
        playUrl:result.data.data[0].url,
        picUrl:item.picUrl,
        picname:result1.data.songs[0].name,
        Singer:result1.data.songs[0].ar[0].name,
        lyric:'[00:00.00]  暂无歌词 那我给大家跳段街舞好了 ጿ ኈ ቼ ዽ ጿ ኈ ቼ ዽ ጿ ኈ ቼ ዽ ጿ ኈ ቼ ዽ ጿ ኈ ቼ ዽ ጿ',
      }
    }else {
       var musicdata = {
        playUrl:result.data.data[0].url,
        picUrl:item.picUrl,
        picname:result1.data.songs[0].name,
        Singer:result1.data.songs[0].ar[0].name,
        lyric:result2.data.lrc.lyric,
      }
    }
    
       
      // 发送给app.vue
      this.$emit('getMusicMessage', musicdata);

      // go to SongDetails
      this.$router.push({name:'SongDetails',query: {id:id,data:musicdata}})

    },

    // 获取相关歌单  likeness
      async getSongLikeness(){
      const result = await this.$http.get("/related/playlist?id="+ this.rankingId);
      if (result.status !== 200) {
          return this.$message.error("获取失败！");
      }
        // console.log("相关歌单");
        // console.log(result.data);
        this.playlists = result.data.playlists
    },

    // 点击相关推荐
    gotolikeness(id){
      this.$router.push("/rankingdetails/" + id);
      // 重新渲染当前组件
        this.reload()
    }


  },
  // 生命周期函数  页面刷新完成时调用
  mounted() {
      this.getSongDetails();
      this. getSongcontent();
      this.getSongLikeness();
      this.getSongCollector();
  },
};
</script>
<style lang="less" scoped>

// home背景
.SingerDetails {
  background-image: url('../assets/bjgif.gif');
}

// 基础样式
a {
  text-decoration:none;
  color: #000;
}
a:hover{
  color: rgb(255, 0, 0);
}
li {
    // 鼠标小手
  cursor:pointer;
}
ul,li {
  list-style: none;
  margin: 0;
  padding: 0;
}

// 导航栏
.homenav {
  padding: 8px 0 ;
  /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    position: relative;
    margin-bottom: 10px;
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
  .reddot {
    width: 5px;
    height: 5px;
    background: red;
    border-radius: 50%;
    margin: 5px auto;
  }
}

.SearchAndLogin {
    position: absolute;
    font-size: 14px;
    right: 39px;
    // 居中
    top: 50%;
    transform: translate(0, -50%);
}

/* 布局样式  start*/
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

.el-row {
    box-sizing: border-box;
    margin-left: 0!important;
    margin-right: 0!important;
}

 .Determinelocation {
    width: 100%;
    height: 100%;
  }
/* 布局样式  end*/


// main 布局
.mian {
  // 清除浮动
  overflow: hidden;
}
.grid-content .main-right,
.grid-content .main-left {
    width: 100%;
}
.main-left {
    border-radius: 10px;
    border:1px solid rgba(5, 5, 5,0.1);
}

// 左上
.main-left .top {
     width: 100%;
     height: 270px;
     padding: 20px;
    //  长宽定死
     box-sizing: border-box;
     img {
       width: 200px;
       margin-right: 25px;
       border-radius: 10px;
     }
     .top-description {
       font-size: 14px;
       .title {
         font-size: 25px;
         font-weight:600;
       }
      //  里面有小图片和相关描述
       .smbox {
           /*flex 布局*/
          display: flex;
          /*实现垂直居中*/
          align-items: center;
         span {
           margin: 0 10px;
         }
         img {
          width: 30px;
          border-radius: 50%;
          margin: 10px;
          }
       }
      //  描述
      p {
        width: 685px;
      }

     }
}
// 左下
.main-left  .bottom {
     width: 100%;
      // 歌曲列表
      // 每一个li行
        .Songli {
          width: 100%;
          height: 60px;
           /*flex 布局*/
          display: flex;
          /*实现垂直居中*/
          align-items: center;
          // li里面的div
          div {
            float: left;
          }
          // 四个选项
          .num {
            width: 10%;
            span {
              margin-left: 15px;
            }

          }
          .song {
            width: 40%;
              /*flex 布局*/
          display: flex;
          /*实现垂直居中*/
          align-items: center;
            .Songimg {
              float: left;
              width:45px;
              border-radius: 10px;
              margin-right: 10px;
            }
          }
          .album {
            width: 40%;
          }
          .time {
            width: 10%;
          }
        }
        .Songli:hover {
          background: rgb(222, 226, 217)!important;
        }
        .Songli:nth-child(even){
          background: rgb(239, 241, 237);
        }
}

// 右上
.main-right .top {
  padding: 10px;
  width: 100%;
  height: 200px;
  border-radius: 10px;
  //  长宽定死
  box-sizing: border-box;
  border:1px solid rgba(5, 5, 5,0.1);
     .top-title {
       span {
         color: red;
         font-weight: 600;
         margin-right: 10px;
       }
       margin-bottom: 5px;
     }
     .loveThat {
       overflow: hidden;
       li {
         float: left;
         margin: 4px;
         .loveThatPic {
           width: 40px;
           border-radius: 5px;
         }
       }
     }
}
// 右下 -> 相关推荐
.main-right .bottom {
  margin-top: 15px;
  width: 100%;
  border-radius: 10px;
  border:1px solid rgba(5, 5, 5,0.1);
  padding: 10px;
      //  长宽定死
     box-sizing: border-box;
     .bottomAaboutTitle {
        span {
         color: red;
         font-weight: 600;
         margin-right: 10px;
       }
       margin-bottom: 5px;
     }
     .bottomAaboutList {
       li {
         margin: 15px 0;
           /*flex 布局*/
        display: flex;
        /*实现垂直居中*/
        align-items: center;
       }
       padding: 0 8px;
       img {
          width: 70px;
          border-radius: 5px;
          margin-right: 15px;
       }
       .dec {
         display: inline-block;
         div {
           color: rgb(126, 126, 126);
           margin-top: 15px;
         }
       }
     }
}


// 按钮样式
.el-button.is-round {
    border-radius: 20px;
    padding: 9px 18px;
}

.el-button--danger {
    color: #FFF;
    background-color: rgb(250, 40, 0);
    border-color: #F56C6C;
}

</style>
