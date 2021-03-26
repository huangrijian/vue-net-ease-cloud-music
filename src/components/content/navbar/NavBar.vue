<template>
    <el-row :gutter="10" class="bj el-row01" style="margin-bottom: 20px">
        <el-col :xs="1" :sm="3" :md="4" :lg="3" :xl="3"><div class="grid-content bg-purple"></div></el-col>
        <el-col :xs="22" :sm="18" :md="16" :lg="18" :xl="18">
            <div class="grid-content homenav">
                <!-- logo -->
                <div class="logo floatLeft">
                  <!-- <img src="G/bg.jpg" alt=""> -->
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
                  <el-button class="el-icon-search" type="text"></el-button>
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
        <el-col :xs="1" :sm="3" :md="4" :lg="3" :xl="3"><div class="grid-content"></div></el-col>
    </el-row>
</template>

<script>
export default {
   props:['UserId'],
  data() {
    return {
            // 搜索关键字
      // searchKeyword:'',

        // 导航更换初始化样式
        fontlist:1,

        // 登录显示/登出隐藏
        islogin:true,
        dialogFlag: false,

         // 用户头像
        avatarUrls:'',
        // 用户昵称
        nickname:'',
    }
  },
  watch: {
    // 接收传来的UserId触发监听器
      UserId: function () {       
        this.getUserDetails();
        this.judgelogin();
      }
    },
  methods:{
     
  // 点击改变样式
    changefontdiv(index){
      this.fontlist = index
    },

      // 刷新后防止头像数据丢失
      showMsg (val) {   
        this.UserId = val;
        // UserId更新后又会触发监听器watch: 函数
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

  },
  
    // 生命周期函数  页面刷新(重新渲染)时调用
  mounted() {
     this.showMsg(window.sessionStorage.getItem("UserId"));
      
  },
}
</script>

<style lang="less" scoped>
.bj{
    box-shadow: 0px 36px 54px -15px rgba(0, 0, 0, 0.1);
}
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
</style>