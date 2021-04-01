<template>
    <div>
      <layout>
         <div class="top">
            <div class="top-title">搜索结果</div>
            <div :class="{fontcolor: current == 1 }" @click="changefontdiv(1);changeflag0()">单曲</div>
            <div :class="{fontcolor: current == 2 }" @click="changefontdiv(2);changeflag1()" >歌手</div>
            <div :class="{fontcolor: current == 3 }" @click="changefontdiv(3);changeflag2()" >专辑</div>
            <div :class="{fontcolor: current == 4 }" @click="changefontdiv(4);changeflag3()" >歌单</div>
        </div>
        <div class="main">
            <!-- 单曲 -->
            <play-song v-show="flag0" :SearchSongData="searchVal"></play-song>

            
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
                </ul>
              </div>
        </div>
      </layout>
    </div>
</template>
<script>
import layout from '@/components/content/layout/layout.vue'
// import {playMisic } from '@/network/PlayMisic.js'
import PlaySong from '@/components/common/play_song/PlaySong'
export default {
  components:{
    layout,
    PlaySong
  },
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
  // watch: {
  //     searchVal: function (val) {   
  //       console.log("searchVal");    
  //      console.log(typeof val);   // 接收父组件的值
  //     },
  //     keyword1: function (val) {       
  //      console.log(val);   // 接收父组件的值
  //     }
  //   },
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

  // playMisic(id){
  //   // 调用引入的playMisic.js 返回一个 promise对象的结果  因为promise是异步操作得到的结果所以注意必须加.then才能获取到值
  //   playMisic(id).then(musicdata => {

  //     // 通过事件总线发送事件并传入数据
  //   this.$bus.$emit('getMusicMessage',musicdata)
  //   // 跳转到评论区
  //    this.$router.push({name:'SongDetails',query: {id:id,data:musicdata}})
  //   });
  // }

  },
   mounted() {
    //    进入页面后默认第一个显示（歌曲）
       this.flag0 = true;
       this.current = 1;
   }
};
</script>
<style lang="less" scoped>
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