<template>
  <div class="SingerDetails">


    <el-row :gutter="10">
      <div  class="Topbg">
          <!-- 大背景 -->
      </div>
    <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3"><div class="grid-content"></div></el-col>
    <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="18">
        <div class="grid-content">
                <!-- 大盒子 -->
                <div class="Singerbox"  >
                    <div class="Singerboxbg">
                      <div class="center">
                           <img  class="transform-auto margin-top Singerboxbg-img" :src="SingerPic"  alt="">
                        <!-- 名字 -->
                      <h3 class="transform-auto margin-top">{{ SingerName }}</h3>
                      <el-button type="success" icon="el-icon-check" class="transform-auto margin-top" circle></el-button>
                      <!-- 描述 -->
                      <div  class="transform-auto Singer-describes margin-top">
                        <div>
                            {{SingerDescribe}}
                        </div>
                      </div>
                      <!-- 成就 -->
                      <div  class="transform-auto">
                        <div class="transform-auto-left">
                          <div>645</div>
                          <div>单曲</div>
                        </div>
                         <div class="transform-auto-left">
                          <div>645</div>
                          <div>单曲</div>
                        </div>
                         <div class="transform-auto-left">
                          <div>645</div>
                          <div>单曲</div>
                        </div>
                         <div class="transform-auto-left">
                          <div>645</div>
                          <div>单曲</div>
                        </div>
                      </div>
                      </div>
                     
                        <div class="SingerboxdetailsF">
                            <div class="Singerboxdetails" @click="goToHotworks">热门作品</div>
                            <div class="Singerboxdetails" @click="goToallAlbum">所有专辑</div>
                            <div class="Singerboxdetails" @click="goToallMV">相关MV</div>
                            <div class="Singerboxdetails" @click="goToArtistMessage">艺人介绍</div>
                        </div>
                    </div>
                </div>
              <!-- 子路由占位符 -->                 
        </div>
       
          <router-view  @getMusicMessage="showMusicMessage"></router-view>
       
    </el-col>
  <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3"><div class="grid-content"></div></el-col>
</el-row>


   
  </div>
</template>

<script>
export default {
  name:'SingerDetails',
  data() {
    return {
      // 接受动态路由传来的参数
      SingerId: this.$route.params.id,
      // 歌手名称
      SingerName: "",

        // 弹出框相关变量
      dialogVisible: false,
      input:'',

      // 歌手描述
      SingerDescribe:'',
      // 歌手照片
      SingerPic:''
    };
  },
  methods: {

    showMusicMessage(val){
      console.log("爸爸中的val");
      console.log(val);

      this.$emit('getMusicMessage', val);
    },

    // 跳转路由 -> goto 歌手介绍
    goToArtistMessage(){
        this.$router.push("/SingerDetails/"+ this.SingerId +"/artistMessage/"+ this.SingerId);
    },
    // 跳转路由 -> goto 热门歌手
     goToHotworks(){
        this.$router.push("/SingerDetails/"+ this.SingerId +"/hotworks/"+ this.SingerId);
    },
        // 跳转路由 -> goto 所有专辑
     goToallAlbum(){
        this.$router.push("/SingerDetails/"+ this.SingerId +"/allAlbum/"+ this.SingerId);
    },
        // 跳转路由 -> goto 所有MV
     goToallMV(){
        this.$router.push("/SingerDetails/"+ this.SingerId +"/allMV/"+ this.SingerId);
    },


    // 获取歌手详情
    async gethotSingerDetails() {
      // 歌手详情
      const result = await this.$http.get("/artist/detail?id=" + this.SingerId);
      // 歌手描述
      const describeResult = await this.$http.get("/artist/desc?id=" + this.SingerId);

      if (result.status !== 200) {
        return this.$message.error("获取失败！");
      }
      // this.$message.success("获取成功！");

      console.log("歌手详情");
      console.log(result.data);

      console.log("歌手描述");
      console.log(describeResult.data.briefDesc);
      this.SingerDescribe = describeResult.data.briefDesc

      console.log(result.data.data.artist);
      // 歌手名
      this.SingerName = result.data.data.artist.name;
      // 歌手照片
      this.SingerPic = result.data.data.artist.cover;
      console.log(this.SingerPic);
    },
  },
  // 生命周期函数  页面刷新时调用
  mounted() {
    this.gethotSingerDetails();
  },
};
</script>
<style lang="less" scoped>

// 版头大背景
.Topbg{
  width: 100%;
  height: 460px;
  background: url('../assets/topBg.jpg');
  background-position:center;
  // 先脱离标准流
  position: absolute;
  // 再降低层级
  z-index: -1;
}

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
/* 布局样式  end*/


// 歌手详情头部
.Singerboxbg {
    position: relative;
    height: 400px;
    margin-bottom: 55px;
    background-size: 100%!important;
    background-position:center!important;
    font-size: 15px;
    .Singerboxbg-img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    .center {
      margin-top: 80px;
    }
    
}
.SingerboxdetailsF {
    width: 100%;
    position: absolute;
    bottom: -60px;
    .Singerboxdetails{
    float: left;
    width: 25%;
    height: 60px;
    text-align: center;
    }
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

  // 歌手描述
  .Singer-describes div{
    width: 700px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    overflow:hidden;
    -webkit-box-orient: vertical;
  }

  // 居中
  .transform-auto {
        /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: center;
    text-align: justify;
    margin:0 auto;
    color:#fff;
    // 令div变化为行内块
    .transform-auto-left {
      display: inline-block;
      margin: 30px 60px;
    }
  }

  // margin
  .margin-top {
    margin-top:10px;
  }


</style>
