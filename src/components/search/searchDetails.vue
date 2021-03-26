<template>
    <div>
        <el-row :gutter="10">
            <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3"><div class="grid-content bg-purple visibilityBox"></div></el-col>
            <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                <div class="grid-content">
                    <div class="top">
                        <div class="top-title">搜索结果</div>
                        <div :class="{fontcolor: current == 1 }" @click="changefontdiv(1);changeflag0()">单曲</div>
                        <div :class="{fontcolor: current == 2 }" @click="changefontdiv(2);changeflag1()" >歌手</div>
                        <div :class="{fontcolor: current == 3 }" @click="changefontdiv(3);changeflag2()" >专辑</div>
                        <div :class="{fontcolor: current == 4 }" @click="changefontdiv(4);changeflag3()" >歌单</div>
                    </div>
                    <div class="main">
                        <!-- 单曲 -->
                         <div v-show="flag0">
                            <h1 style="visibility:hidden">热门作品</h1>
                            <ul>
                                <li class="Songli">
                                <div class="num">序号</div>
                                <div class="song">歌曲</div>
                                <div class="album">专辑</div>
                                <div class="time">时长</div>
                                </li>
                                <li class="Songli Songlifont" :key="index" v-for="(item,index) in searchVal"  @mouseover="showdiv(index + 1 )"   @click="playMisic(item.id)">
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
                                <div class="time">还没做时长ʕ•ﻌ•ʔ...</div>

                                </li>
                            </ul>
                        </div>
                        <!-- 歌手 -->
                         <div v-show="flag1" class="SingerList" style="dispaly:block">
                            <div class="SingerListLi" :key="index" v-for="(item,index) in searchValSinger" @click="goSingerdetails(item.id)">
                                <img :src="item.picUrl" alt="">
                                <div class="name">{{item.name}}</div>
                                <span>专辑数: {{item.albumSize}}</span>
                            </div>
                         </div>
                         <!-- 专辑 -->
                         <div v-show="flag2">
                            <ul class="rankingUl">
                                <!-- featureRankingglobal -->
                                <li :key="index" v-for="(item,index) in searchValAlbums" @click="GotorankingDetails(item.id)">
                                    <img :src="item.picUrl" alt="">
                                    <div class="rankingNameglobal">{{item.name}}</div>
                                </li>

                                <!-- <li>
                                    <img src="https://p1.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg" alt="">
                                    <div class="rankingNameglobal">aa</div>
                                </li> -->
                            </ul>
                         </div>
                    </div>
                </div>
            </el-col>
            <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3"><div class="grid-content visibilityBox"></div></el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    // 从父组件接受参数
  props: ['searchVal','keyword1','searchValSinger','searchValAlbums'],
  data() {
    return {
      // SingerId: this.$route.params.SingerId,
      hotSongs:'',
      // 类名
      num:'num',
      // 歌曲url
      playUrl:'',

       isshowturediv:'',

      // 当前的选项 歌曲-歌手切换
      current:'',

      flag0:false,
      flag1:false,
      flag2:false,
      flag3:false,
    
    };
  },
  watch: {
      searchVal: function (val) {       
       console.log(val);   // 接收父组件的值
      },
      keyword1: function (val) {       
       console.log(val);   // 接收父组件的值
      }
    },
   methods: {
    
    showdiv(index){
      this.isshowturediv = index
    },

    changefontdiv(index){
        this.current = index
    },

     // 跳转歌手详情
        goSingerdetails(id) {
            console.log(id);
            // 传递参数  -- this.$router.push({name: ' 路由的name ', params: {key: value}})
            // 参数取值  -- this.$route.params.key
            // 路由跳转
            this.$router.push('/SingerDetails/' + id )
        },

    // 点击切换
    changeflag0(){
        this.flag0 = true;
        this.flag1 = false;
        this.flag2 = false;
        this.flag3 = false;
    },
    changeflag1(){
        this.flag0 = false;
        this.flag1 = true;
        this.flag2 = false;
        this.flag3 = false;
    },
    changeflag2(){
        this.flag0 = false;
        this.flag1 = false;
        this.flag2 = true;
        this.flag3 = false;
    },
    changeflag3(){
        this.flag0 = false;
        this.flag1 = false;
        this.flag2 = false;
        this.flag3 = true;
    },

      async playMisic(SongUrlid){
       
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

      this.playUrl =  result.data.data[0].url

      
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
    
    // 跳转到评论区
     this.$router.push({name:'SongDetails',query: {id:SongUrlid,data:musicdata}})
  },
  },
   mounted() {
    //    进入页面后默认第一个显示（歌曲）
       this.flag0 = true;
       this.current = 1;
   }
};
</script>
<style lang="less" scoped>
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
// 基础样式 end
    .top {
        margin-top: 20px;
        overflow: hidden;
        div {
          float: left;
          margin: 0 25px;
          font-size: 14px;
        }
       
        .top-title {
            font-size: 18px;
            font-weight: 600;
        }
    }

    .main {
    // 单曲
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

     // 歌手

        // 歌手列表
    .SingerList {
        width: 100%;
        box-shadow: 4px 4px 55px 1px #e0e0e0;
        .SingerListLi {
        display: inline-block;
        width: 7%;
        height: 106px;
        text-align: center;
        margin: 29px;
        img {
            width: 100%;
            height: 100px;
            border-radius: 50%;
        }
        .name {
            font-size: 14px;
            // 强制两行
                overflow:hidden;
                text-overflow:ellipsis;
                display:-webkit-box;
                -webkit-box-orient:vertical;
                -webkit-line-clamp:1;//以此类推，3行4行直接该数字就好啦
        }
            span {
            width: 100%;
            margin-top: 5px;
            font-size: 14px;
            color: rgb(112, 112, 112);
            }
        }
    }

    // 专辑
        .rankingUl li {
            float: left;
            width: 10%;
            margin-top: 15px;
        }

        .rankingUl li img{
            width: 100px;
            border-radius: 10px;
        }
        
        // 榜单名称
        .rankingfeatureName {
            width: 100px;
            font-size: 12px;
            transform: translateX(30%);
        }
        .rankingNameglobal {
            width: 95px;
            font-size: 12px;
            transform: translateX(15%);
            // 强制一行
            overflow:hidden;
            text-overflow:ellipsis;
            display:-webkit-box;
            -webkit-box-orient:vertical;
            -webkit-line-clamp:1;//以此类推，3行4行直接该数字就好啦
        }
}



.fontcolor {
    color: red;
}
</style>