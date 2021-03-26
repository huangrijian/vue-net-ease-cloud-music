<template>
  <div>
    <!-- 背景 -->
    <div class="userbg">
    </div>

    <!-- 个人中心 -->
    <el-row :gutter="10" class="el-row01">
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3"><div class="grid-content"></div></el-col>
        <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="4" class="personalLeft">
            <div class="grid-content">
            <!-- 左边 -->
              <!-- 左上 -> 封面 -->
              <div class="grid-content-cover">
                <img :src="backgroundUrl" alt="">
              </div>
              <!-- 左下 -> 个人信息 -->
              <div>
                <!-- 第一层 -->
                <div class="left01">
                  <img class="headPic"  :src="avatarUrl" alt="">
                  <span>{{nickname}}</span>
                  <el-button type="danger" round>华语</el-button>
                </div>
                 <!-- 第二层 -->
                  <div class="left02">
                    <div>
                       <div class="dot"></div>
                       <span>等级：</span> <span> v7</span>
                    </div>
                    <div>
                      <div class="dot"></div>
                      <span>年龄：</span> <span> 99后-处女座</span>
                    </div>
                    <div>
                      <div class="dot"></div>
                      <span>地区：</span> <span> -- </span>
                    </div>
                    <!-- signature -->
                    <div>
                      <div class="dot"></div>
                      <span>签名:</span> <span>{{signature}}</span>
                    </div>
                  </div>
                 <!-- 第三层 -->
                 <div  class="left03">
                   <div class="left03-son">
                     <div>动态</div>
                     <div>11</div>
                  </div>
                   <div class="left03-son">
                     <div>动态</div>
                     <div>11</div>
                  </div>
                   <div class="left03-son">
                     <div>动态</div>
                     <div>11</div>
                  </div>
                 </div>
                 
                  <!-- 按钮层 -->
                  <div class="left04">
                    <el-button type="danger" round>华语</el-button>
                    <el-button type="danger" round>华语</el-button>
                  </div>
              </div>
            </div>
        </el-col>
         <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="10" class="personalCneter">
          
            <div class="grid-content">
              <!-- 中间 -->
                <!-- 第一层-->
                <div class="main01">
                  <div class="main01-top">
                     <strong>听歌排行</strong>
                     <span @click="changeStyle(2),changeflag2()" :class="{addColor:changeSelectStyle == 2}">所有时间</span>
                     <span class="center">|</span>
                     <span @click="changeStyle(0),changeflag1()" :class="{addColor:changeSelectStyle == 0}">最近一周</span>
                  </div>
                   <el-button type="danger" round>播放全部</el-button>
                </div>
                
                 <!-- 所有时间 -->
                <!-- 第二层 -->
                <div class="main02"  v-show="(flag2)">
                  <h3>所有时间</h3>
                    <ul>
                      <li>
                        序号
                      </li>
                      <li :key="index" v-for="(item,index) in record">
                        <span class="spanNum">{{index + 1 }}</span>
                        <img :src="item.song.al.picUrl" alt="">
                        <span class="spanSinger">{{item.song.ar[0].name}}</span>
                        <span class="spanAlbum">{{item.song.name}}</span>
                        <span class="spanTime">03:35</span>
                      </li>
                    </ul>
                </div>
            </div>

            <!-- 最近一周 -->
             <div class="grid-content">
                <!-- 第二层 -->
                <div class="main02" v-show="(flag1)">
                   <h3>最近一周</h3>
                    <ul>
                      <li>
                        序号
                      </li>
                      <li :key="index" v-for="(item,index) in recordWeek">
                        <span class="spanNum">{{index + 1 }}</span>
                        <img :src="item.song.al.picUrl" alt="">
                        <span class="spanSinger">{{item.song.ar[0].name}}</span>
                        <span class="spanAlbum">{{item.song.name}}</span>
                        <span class="spanTime">03:35</span>
                      </li>
                    </ul>
                </div>
            </div>
         </el-col>
         <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="4" class="personalRight">
            <div class="grid-content">
              <!-- 右 -->
              <div class="grid-content-right">
                <div class="grid-content-right-title">
                  <span>|</span>
                  <strong>我创建的歌单</strong>
                </div>
                <div class="mycover">
                  <ul class="grid-content-right-ul">
                    <li :key="index" v-for="(item,index) in playlist" >
                      <img :src="item.coverImgUrl" alt="">
                      <div class="grid-content-right-li-title">{{item.name}}</div>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="grid-content-right">
                <div class="grid-content-right-title">
                  <span>|</span>
                  <strong>我收藏的歌单</strong>
                </div>
                <div class="mycover">
                  <ul class="grid-content-right-ul">
                    <li>
                      <img src="https://p1.music.126.net/xe1F96UCN5arTvjBTjtISQ==/100055558139748.jpg?param=200y200" alt="">
                      <div class="grid-content-right-li-title">每日推荐2020</div>
                    </li>
                    <li>
                      <img src="https://p1.music.126.net/xe1F96UCN5arTvjBTjtISQ==/100055558139748.jpg?param=200y200" alt="">
                      <div class="grid-content-right-li-title">每日推荐2020</div>
                    </li>
                  </ul>
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
  name:'user',
  data() {
    return {


       // 接受动态路由传来的参数(用户id)
      UserId: this.$route.params.userdetailid,

      // 控制显示最近一周还是使用时间 (默认是最近一周)
      flag:true,

      // 控制样式 变量
      changeSelectStyle:'',

      // 控制显示隐藏变量
      flag1:true,
      flag2:false,

      // 用户昵称
      nickname:'',
      // 用户头像
      avatarUrl:'',
      // 个性签名
      signature:'',
      // 背景图片
      backgroundUrl:'',
      
      // 用户歌单
      playlist:'',

      // 用户播放记录(所有时间)
      record:'',
      // 用户播放记录(一周)
      recordWeek:''
    }
  },
  methods: {
    changeflag2(){
      this.flag2 = true;
      this.flag1 = false;
    },
    changeflag1(){
      this.flag2 = false;
      this.flag1 = true;
    },


     changeStyle(index){
       this.changeSelectStyle = index;
     },

    // 获取登陆状态  /login/status
    async getUserstatus(){
      const result = await this.$http.get("/login/status");
      console.log("登陆");
      console.log(result);
    },
    

    // 获取用户详情
    async getUserDetails(){
      console.log("用户参数");
      console.log(this.UserId);
        const result = await this.$http.get("/user/detail?uid=" + this.UserId);
        if (result.status !== 200) {
          return this.$message.error("获取用户信息失败！");
        }
        // 昵称
        this.nickname = result.data.profile.nickname
        // 用户头像
        this.avatarUrl = result.data.profile.avatarUrl
        // 个性签名
        this.signature = result.data.profile.signature
        // 背景图片
        this.backgroundUrl = result.data.profile.backgroundUrl
    },
  

  // 获取用户歌单  /user/playlist
      async getUserPlaylist(){
        const result = await this.$http.get("/user/playlist?uid=" + this.UserId);
        if (result.status !== 200) {
          return this.$message.error("获取用户信息失败！");
        }
        // 用户歌单
        this.playlist = result.data.playlist
    },

    // 获取用户播放记录(所有时间) /user/record?uid=32953014&type=1 
          async getUserRecord(){
        const result = await this.$http.get("/user/record?uid=" + this.UserId + "&type=0");
        if (result.status !== 200) {
          return this.$message.error("获取用户信息失败！");
        }
        // 用户播放记录
         this.record = result.data.allData
    },


     // 获取用户播放记录(最近一周) /user/record?uid=32953014&type=1 
        async getUserRecordWeek(){
        const result = await this.$http.get("/user/record?uid=" + this.UserId + "&type=1");
        if (result.status !== 200) {
          return this.$message.error("获取用户信息失败！");
        }
        // 用户播放记录
        this.recordWeek = result.data.weekData
    },
  },

   // 生命周期函数  页面刷新时调用
    mounted() {
      this.getUserDetails();
      this.getUserPlaylist();
      this.getUserRecord();
      this.getUserRecordWeek();

      this.getUserstatus();
    }
};
</script>
<style lang="less" scoped>

.userbg {
    width: 100%;
    height: 600px;
    background: url("../assets/userbg.jpg");
    background-position: 68% 70%;
}
.grid-content {
  padding: 0;
  // 超出隐藏
  overflow: hidden;
}
// 左边右边中间的布局
.personalLeft,
.personalCneter,
.personalRight {
  border-radius: 5px;
  margin: 10px 5px;
  box-shadow: 4px 4px 55px 1px #e0e0e0
}

// 左
.personalLeft {
  padding: 0!important;
  .dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    background: red;
    border-radius: 50%;
    margin-right: 10px;
    margin-bottom: 5px;
  }
  .grid-content-cover {
    width: 100%;
    img {
      width: 320px;
    }
  }
  // 头像
  .headPic {
    width: 50px;
  }
  .left01 {
      /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    padding: 5px 15px;
    span {
      margin-left: 5%;
    }
    button {
      transform: translateX(190%);
    }
  }
  .left02 {
    box-sizing: border-box;
    padding: 0 15px;
  }
  .left03 {
        /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: center;
    .left03-son {
      display: inline-block;
      padding: 30px;
    }
  }

  .left04 {
            /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: center;
    padding-bottom: 15px;
    button {
      margin: 0 10px;
    }
  }
}
// 中间
.personalCneter {
  padding: 15px!important;
  .main01 {
    overflow: hidden;
    .main01-top {
      margin-bottom: 15px;
      .center {
        margin: 0 15px;
      }
      span {
        float:right
      }
    }
    button {
      float:right
    }
  }
  .main02 {
    ul {
      li {
        img {
          width: 50px;
        }
        span {
          display: inline-block;
        }
        .spanNum {
          width: 6%;
        }
        .spanSinger {
          width: 30%;
        }
        .spanAlbum {
          width: 30%;
        }
        .spanTime {
          width: 6%;
        }
      }
    }
  }
}

// 右
.grid-content-right {
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 10px;
  .grid-content-right-title {
    padding: 0 5px;
    margin-bottom: 15px;
    span {
      display: inline-block;
      width: 5px;
      height: 100%;
      margin-right: 5px;
      color: red;
      font-size: 14px;
      font-weight: 600;
      background: red;
    }
  }
  .mycover {
    width: 100%;
      .grid-content-right-ul {
          width: 100%;
          li {
            display: inline-block;
            width: 40%;
            margin-right: 20px;
            margin-left: 8px;
            border-radius: 5px;
            .grid-content-right-li-title {
              margin-top: 6px;
              font-size: 14px;
              font-weight: 600;
            }
            img {
              width: 100%;
              border-radius: 5px;
            }
            
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

// 点击改变的样式
.addColor {
  color: rgb(240, 6, 6);
}

</style>
