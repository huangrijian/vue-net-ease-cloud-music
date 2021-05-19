<template>

<div>
  <div class="backTopGif" v-if="flag">
    <img src="~@/assets/img/boom.gif" alt="">
  </div>
   <div class="backTop" @click="BackTop($event)"></div>
   <scroll ref="scroll"
    class="ScrollContent"
     :PullUpLoad="true"
      @pullUp="pullUp">
        
  <layout>
      <div class="layout">
        <div class="left">
          <div class="left-top">
              <span class="title">动态</span>
            <div>
              <el-button size="mini" round><i class="My-new-iconbianji"></i>   发动态</el-button>
              <el-button size="mini" round><i class="My-new-iconpaishe"></i>   发表视频</el-button>
            </div>
          </div>
          <!-- left-main -->
          <ul class="left-main">
            <li :key="index" v-for="(item,index) in event">
              <div>
                <img style="width:50px" :src="item.user.avatarUrl" alt="">
              </div>
              <div class="content">
                  <div class="message">
                    <span class="content-tit">{{item.user.nickname}}<i class="My-new-iconyinle IconText"></i></span>
                    <span class="content-act">{{item | getTitle}}</span>
                    <div class="time">{{item.showTime | filtrationTime(that)}}</div>
                  </div>
                  <div class="comment">
                    <!-- {{item.json}} -->
                      {{JSON.parse(item.json).msg}}
                  </div>
                  <div class="Song">
                    <div>
                      <img style="width:50px" :src="JSON.parse(item.json) | GetSongPic" alt="">
                    </div>
                    <div>
                      <div>{{JSON.parse(item.json) | GetSongName}}</div>
                      <div class="singer">{{JSON.parse(item.json) | GetSingerName}}</div>
                    </div>
                  </div>
                  <img :src=" item | getpic" alt="" style="width:200px">
                  <div class="bottom">
                    <span><i class="My-new-icondianzan"></i><span>(571)</span></span>
                    <span>|</span>
                    <span><i class="My-new-iconfenxiang1"></i><span>转发  (6)</span></span>
                    <span>|</span>
                    <span><i class="My-new-iconxiaoxi"></i><span>评论  (8)</span></span>
                  </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="right">
        
        </div>
      </div>
  </layout>
   </scroll>
</div>


</template>
<script>
import layout from '@/components/content/layout/layout.vue'
// 依赖
import scroll from '@/components/common/scroll/Scroll.vue'

import {GetDynamic} from '@/network/friend.js'

export default {
  name:'friend',
  filters: {
    // 格式化时间
     filtrationTime(val,that){
        var newTime = new Date(val);
        var year = newTime.getFullYear()+'年';
        var month = that.zeroize(newTime.getMonth()+1)+'月';
        var date = that.zeroize(newTime.getDate())+'日'+' ';
        var Hours = that.zeroize(newTime.getHours())+':';
        var Minutes = that.zeroize(newTime.getMinutes());
         return [year,month,date,Hours,Minutes].join('')
      },

    // 返回歌名 或者节目的歌名
    GetSongName: function (value) {
      // console.log("过滤");
      // console.log(value);
      // console.log(typeof value.song);
      if(value.song){
        return value.song.name
      }else if(value.program){
        return value.program.name
      }else return ''
    },
    // 返回歌手名  或者节目的歌手名
    GetSingerName:function(value) {
      if(value.song){
        return value.song.artists[0].name
      }else if(value.program){
        return value.program.radio.name
      }else return ''
    },
    // 返回歌曲pic 或者节目pic
    GetSongPic:function(value){
      if(value.song){
        return value.song.album.picUrl
      }else if(value.program){
        return value.program.coverUrl
      }else return ''
    },
    // 返回分享类型
    getTitle:function (val){
      // console.log("val");
      // console.log(val);
      if(val.info){
        // 
        // console.log("返回分享类型");
        // console.log(val.info);
        return val.info.commentThread.resourceTitle
      }else return ''
    },
    // pics
    getpic:function (val){
      // console.log("照片");
      // console.log(val.pics[0]);
      if(val.pics[0]){
        // console.log("照片");
        // console.log(val.pics);
        return val.pics[0].originUrl
      }else return ''
    }


  },
  data() {
    return {
      // 朋友的动态
      event:[],
      that:this,

      // 默认值
      lasttime:-1,
      pagesize:30,
      cookie:this.$store.state.cookie,

      flag:false
    }
  },
  components:{
    layout,
    scroll
  },
  methods:{
     BackTop(e){
    //  设置起点坐标和终点坐标
      let start = 100;
      let end = 870;
      let animation = setInterval(() => {
        // 每毫秒向上移动5px
        start += 5
       e.target.setAttribute('style', ' bottom: '+ start +'px;');
      //  当达到终点坐标时
       if(start > end) {
          this.flag = true;
          // 清除定时器
          clearInterval(animation);
          // 回退起点
          e.target.setAttribute('style', ' bottom:100px;');
          // 播放800毫秒的特效
          setTimeout(() => {
              this.flag = false;
          },800)
       }
      },1)
       //通过ref获取当前组件对象里面的scrollTo方法
      this.$refs.scroll.scrollTo(0, 0);
    },
        // 上拉加载
  pullUp(){
    //  this.getHomeGoods(this.CurrentView);
    this.GetDynamic(this.pagesize,this.lasttime,this.cookie);
    this.$refs.scroll.finishPullUp();
  },
    // 补零函数
    zeroize(date){
      return date >= 10 ? date : '0' + date
    },
    // 获取朋友动态
    GetDynamic(pagesize,lasttime,cookie){
      GetDynamic(pagesize,lasttime,cookie).then(res => {

        console.log("res");
        console.log(res);
        // console.log(res.event[pagesize-6].showTime);
        this.event.push(...res.event)
        // 更新默认数据
        // this.pagesize += 25;
        this.lasttime = res.lasttime
      })
    }
  },
  created() {
    this.GetDynamic(this.pagesize,this.lasttime,this.cookie);
  }
}
</script>
<style lang="less" scoped>
.layout {
  display: flex;
}
.left {
  flex:4;
  padding: 25px;
  .left-top {
    display: flex;
    justify-content:space-between;
    padding-bottom: 15px;
    border-bottom: 3px solid rgb(199, 5, 5);
    .title {
      font-size: 24px;
      font-weight: 500;
    }
  }
  .left-main {
    font-size: 14px;
    li {
      margin: 10px 0;
      display: flex;
      div {
        margin: 10px 0;
      }
      .content {
        flex: 5;
        margin-left: 10px;
         .message {
          margin-top: 0px;
          color: rgb(133, 131, 131);

        }
        .message :nth-child(1){
          color: skyblue;
          margin-right: 5px;
          i {
            margin: 0 2px;
            color: rgb(236, 14, 14);
          }
        }

        .Song {
          div {
            margin: 5px 0;
          }
          display: flex;
          background-color: rgba(219, 219, 219,0.3);
          img {
            margin: 0px 10px;
          }
          .singer {
            font-size: 12px;
            color: rgb(138, 136, 136);
          }
        }
        .time {
          font-size: 12px;
          color: rgb(138, 136, 136);
        }
        .bottom {
          display: flex;
          justify-content:flex-end;
          font-size: 12px;
          span {
            margin: 0 5px;
            color: #0c73c2;
          }
        }
      }
    }
  }
}
.right {
  flex:2;
  // border:1px solid #999
}

  /* scroll 包裹的内容需要一个固定的高度才能生效 */
 .ScrollContent {
   /* 视图高度 */
   height: 100vh;
  //  background-color: rgb(236, 54, 54);
   overflow: hidden;
 }

 .backTopGif {
    position: fixed;
    top: -3px;
    right: 30px;
   img {
     width: 150px;
     transform: rotate(180deg);
   }
 }
 .backTop {
   position: fixed;
   right: 50px;
   bottom: 100px;
   // 鼠标小手
   cursor:pointer;
   width: 50px;
   height: 50px;
   background: url('~@/assets/img/rocket.png');
   background-size: 50px;
   z-index: 10;
 }

</style>