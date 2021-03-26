<template>
  <div id="app">
    <!-- 弹出框 -->
<el-dialog
  title="珍惜所有的不期而遇，看淡所有的不辞而别。"
  :visible.sync="dialogVisible"
  width="30%"
  destroy-on-close="true"
  custom-class="dialogBox">
  <el-input prefix-icon="el-icon-search" v-model="input" placeholder="请输入关键词并按下回车键"  @change="GotosearchDetails(input)" clearable></el-input>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>


        <!-- 导航栏 -->
    <el-row :gutter="10" class="bj el-row01" style="margin-bottom: 20px">
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3"><div class="grid-content bg-purple"></div></el-col>
        <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="18">
            <div class="grid-content homenav">
                <!-- logo -->
                <div class="logo floatLeft">
                  <img src="./assets/homeLogo.png" alt="">
                </div>
                <ul class="navigation">
                  <li class="floatLeft" :class="{fontcolor: fontlist == 1 }" @click="GoHome();changefontdiv(1)">发现音乐<div :class="{fontdiv: fontlist == 1 }"></div></li>
                  <li class="floatLeft" :class="{fontcolor: fontlist == 2 }" @click="Goranking();changefontdiv(2)">排行榜<div :class="{fontdiv: fontlist == 2 }"></div></li>
                  <li class="floatLeft" :class="{fontcolor: fontlist == 3 }" @click="GOtoSongList();changefontdiv(3)">歌单<div :class="{fontdiv: fontlist == 3 }"></div></li>
                  <li class="floatLeft" :class="{fontcolor: fontlist == 4 }" @click="GotoSinger();changefontdiv(4)">歌手<div :class="{fontdiv: fontlist == 4 }"></div></li>
                  <li class="floatLeft" :class="{fontcolor: fontlist == 5 }" @click="GotoMV();changefontdiv(5)">MV<div :class="{fontdiv: fontlist == 5 }"></div></li>
                  <li class="floatLeft" :class="{fontcolor: fontlist == 6 }" @click="Gotosearch();changefontdiv(6)">搜索<div :class="{fontdiv: fontlist == 6 }"></div></li>
                </ul>
                <div class="SearchAndLogin">
                  <el-button class="el-icon-search" type="text" @click="dialogVisible = true"></el-button>
                  <span style="padding:0 15px">|</span>
                  <span  @click="login" v-if="islogin">登录</span>
                   <Dialog v-if="dialogFlag"></Dialog> 
                  <img :src="avatarUrls" v-if="dialogFlag" alt=""  class="SearchAndLoginImg">
                  <!-- 登录后的下拉选项 -->
                    <el-col :span="12" class="pull-down" v-if="dialogFlag">
                      <el-dropdown trigger="click"  @command="handleCommand">
                        <span class="el-dropdown-link">
                          {{nickname}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item icon="el-icon-plus" command="u" >个人主页</el-dropdown-item>
                          <el-dropdown-item icon="el-icon-circle-check"  command="e" >退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </el-col>
                </div>
            </div>
            </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3"><div class="grid-content"></div></el-col>
    </el-row>

      <!-- 局部刷新以下页面 -->


      <!-- 这里只需要写占位符 -->
      <!--<keep-alive> 可以把组件数据缓存起来，记录组件的状态  如果不写这个， 每次进入路由，组件都会重新渲染并刷新 
          也就是每次进入路由，组件会重新渲染， 离开路由，组件会被销毁
        -->
        <!-- keep-alive 将所有详情页排除掉，因为所有详情页都需要进入路由后更新数据 
        或者只将详情页外的包含进来
        -->
      <keep-alive exclude="search,SongDetails,rankingdetails,MVdetails,SingerDetails,user">
        <router-view @getMessage="showMsg" @getMusicMessage="showMusicMessage" :searchKeyword="searchKeyword" v-if="isRouterShow"></router-view>
      </keep-alive>
   

<!--music：当前播放的音乐。 list：播放列表 ：showlrc：是否显示歌词-->
<aplayer :music="audio[0]"  :showLrc="true" :autoplay="true"  class="Aplayer"></aplayer>

  <!-- 底部 -->
  <footer>
    <div class="dd">
      <div class="ddson">
        <div class="ddicon"></div>
        <span class="top">岁月很长，人海茫茫，别回头也别将就，自然会有良人来爱你。</span>
      </div>
      <span class="bottom">版权所有©2012-2020 由小健1024设计。</span>
    </div>
  </footer>


  </div>


</template>

<script>
import aplayer from "vue-aplayer";  

export default {
  components: { aplayer },
  // name: 'App',
  //局部刷新组件要用到的方法 
  provide () {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      // 音频数据存放在次
         audio:  [{  }],

      // 搜索关键字
      searchKeyword:'',

        // 导航更换初始化样式
        fontlist:1,
        
        // 局部刷新变量
         isRouterShow: true,

       // 弹出框相关变量
        dialogVisible: false,
        input:'',

         // 接受动态路由传来的参数(用户id)
        UserId:'',
        
        // 登录显示/登出隐藏
        islogin:true,
        dialogFlag: false,

         // 用户头像
        avatarUrls:'',
        // 用户昵称
        nickname:'',

    }
  },
  methods: {
  
  // 点击改变样式
    changefontdiv(index){
      this.fontlist = index
    },


      //局部刷新组件要用到的方法 
    async reload () {
      this.isRouterShow = false
      await this.$nextTick()
      this.isRouterShow = true
    },

      // 接收子路由传来的参数 并发起请求 -> 登录相关
      showMsg (val) {   // methods方法  val即为子路由传过来的值
        this.UserId = val
        this.getUserDetails();
        this.judgelogin();
      },

      // 接收音乐地址等相关数据  进入路由自动执行一次
      showMusicMessage(val){
        console.log("音乐相关");
        console.log(val);
        var data = {
            src: val.playUrl,
            title:val.picname,
            artist:val.Singer,
            pic:val.picUrl,
            lrc: val.lyric,
        }
        // 把接收到的音乐数据添加到audio[0]中  令播放组件获取数据后进入待播放
        this.$set(this.audio,0,data);
      },

    // 下拉选线处理函数
     handleCommand(command) {
       // 退出
       if(command == 'e'){
        //清空所有的sessionStorage数据
        window.sessionStorage.clear();
        //    跳转到登录页
        this.$router.push("/home");
        // 再次强制刷新
        location.reload();
      }
      // 个人主页
      if(command == 'u'){
        //    跳转到登录页
        this.$router.push("/user/"+ this.UserId);
      }

      },

    // goto 登录
    login() {
      this.$router.push("/login");
    },
    // goto 排行榜
    Goranking(){
      console.log("去排行榜");
      this.$router.push("/ranking");
    },
    // goto Home
    GoHome(){
      console.log("回家");
      this.$router.push("/home");
    },
    // goto Singer
    GotoSinger(){
       this.$router.push("/Singer");
    },
    // GotoMV
    GotoMV(){
       this.$router.push("/MV");
    },
    // GOtoSongList
    GOtoSongList(){
      this.$router.push('/SongList')
    },

     // 获取用户详情
  async getUserDetails(){

        const result = await this.$http.get("/user/detail?uid=" + this.UserId);
        if (result.status !== 200) {
          return this.$message.error("获取用户信息失败！");
        }
        // 获取用户详情
        console.log(result.data);
       if(result.data.code !== 400){
       // 保存头像地址
        this.avatarUrls = result.data.profile.avatarUrl;
        // 保存昵称
        this.nickname = result.data.profile.nickname
        // 保存用户id值
        this.Userid = result.data.profile.Userid
       } else return

    },
  // 根据token值判断当前页面是否登录了，如果登录则显示头像 隐藏'登录‘
  judgelogin(){
      var userToken = window.sessionStorage.getItem("userToken");
      console.log(userToken);
      if(userToken) {
        // 显示头像
        this.dialogFlag = true
        // 隐藏登录
        this.islogin = false
      }
    },

  //  导航栏搜索处理函数
  Gotosearch(){
      this.$router.push("/search");
  },

   //  搜索弹框处理函数 
  GotosearchDetails(keyword){

      // 跳转路由并把关键词传过去
       this.$router.push({name:'search',query: {key:keyword}});
      //  清空输入框内容
      this.input = ''
       
  }

},
  // 生命周期函数  页面刷新(重新渲染)时调用
  mounted() {
      this.showMsg(window.sessionStorage.getItem("UserId"));
      
  },
  // 监听局部刷新
   watch: {
      '$route' (to, from) {
        this.reload();
      }
    },
};

</script>
<style  lang="less">
// 导航条背景
.bj{
    box-shadow: 0px 36px 54px -15px rgba(0, 0, 0, 0.1);
}
// 基础样式
html,
body,
#app{
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  // background-image: url('./assets/bjgif.gif');
}
::-webkit-scrollbar{
  display:none;
}
// end
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

// 导航栏 start
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
  position: relative;
 
}
 .fontdiv {
   position: absolute;
   top: 100%;
   left: 50%;
   transform: translateY(80%);
   width: 4px;
   height: 4px;
   border-radius: 50%;
   background: red;
  }
.fontcolor {
  color: rgb(255, 0, 0);
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
    right: 105px;
    // 居中
    top: 50%;
    transform: translate(0, -50%);
    .SearchAndLoginImg {
      border-radius: 50%;
      width:35px 
    }
}
// end

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
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
  }
// 布局样式 结束

// 登录后的下拉
 .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .el-dropdown-link {
    margin-left: 8px;
  }
.pull-down {
    position: absolute;
    left: 94px;
    top: 17px;
    width: 75px!important;
}
// end


    // footer
  footer {
    margin-top: 50px;
    width: 100%;
    height: 190px;
    background-color:#161e27;
    color: #161e27;

    .dd {
      position: relative;
      width: 80%;
      height: 100%;
      margin:0 auto;
      .bottom {
        position:absolute;
        bottom: 0px;
        color: rgba(255, 255, 255,0.3);
        font-size: 12px;
        padding:15px 0;
      }

      .ddson {
        position:absolute;
        top: 25px;
      }

      .top {
        font-size: 14px;
        color: rgba(255, 255, 255,0.6);
      }
      .ddicon {
        display: inline-block;
        width: 3px;
        height: 15px;
        background: red;
        margin-right: 10px;
      }
    }
    
  }

  // 音乐组件
.Aplayer {
  width: 100%;
  position: fixed!important;
  bottom: -5px;
  left: -5px;
  z-index: 1;
}

.el-dialog {
background: url('./assets/bj88.jpg')!important;
    background-size: 100%!important;
    width: 920px!important;
    height: 468px;
    filter:(2px)!important;
}
.el-input__inner {
  width: 100px;
  height: 60px!important;
   background-color:rgba(233, 233, 233, 0.2)!important;
   color: #fff!important;
   font-size: 16px!important;
}
.el-dialog__title {
  margin: 0 auto!important;
  color: #fff!important;
}
.dialog-footer {
  display: none!important;
}
</style>
