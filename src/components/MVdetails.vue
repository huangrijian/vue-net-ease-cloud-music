<template>
  <div>
    <!-- 个人中心 -->
    <el-row :gutter="10" class="el-row01">
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3"><div class="grid-content"></div></el-col>
        <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="13" class="personalLeft">
            <div class="grid-content">
                <div class="videobox">
                    <video :src="MVurl"  width="1000" controls="controls"> </video>
                </div>           
                <div class="grid-content-MVdec">
                    <div class="MVname">
                      <span class="el-icon-loading"></span>
                      {{MVname}}
                    </div>
                    <div class="label">
                      <span :key="index" v-for="(item,index) in videoGroup"># {{item.name}} </span>
                    </div>
                    <div class="promulgator">
                      <span>发布：NAN</span>
                      <span>时长：{{duration}}</span>
                      <span>播放次数：{{playCount}}</span>
                    </div>
                    <div class="btnbox">
                      <div class="btn">
                        <span class="el-icon-thumb">{{likedCount}}</span>
                      </div>
                      <div class="btn">
                        <span class="el-icon-star-on">666</span>
                      </div>
                      <div class="btn">
                        <span class="el-icon-link">{{shareCount}}</span>
                      </div>
                    </div>
                    <div class="Commentnumber">
                      <div class="Commentnumberbox">
                         <span class="el-icon-chat-dot-square"></span>
                        <span>999+条评论</span>
                      </div>
                       <div class="Commentnumberbox">
                         <span class="el-icon-user"></span>
                         <span>沉淀i,</span>
                        <span>你好</span>
                      </div>
                      <div class="areaText">
                        <img  class="areaTextimg" src="http://p1.music.126.net/hcx4MIKS1fc_JuSdu_W9lA==/109951165000584159.jpg" alt="">
                      <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="textarea"
                        maxlength="350"
                        show-word-limit
                        resize="none"
                         height="200px"
                      >
                      </el-input>
                      <div class="sendcomment">评论</div>
                      <h3>精彩评论</h3>
                      <ul>
                        <li class="sendcommentLi" :key="index" v-for="(item,index) in hotComments">
                          <img :src="item.user.avatarUrl" alt="">
                          <div class="sendcommentLi-div">
                            <div class="sendcommentLi-div-one">
                              <strong>{{item.user.nickname}}</strong>
                              <span class="sendtime">42个月前</span>
                                <span class="el-icon-thumb like"></span>
                                <span>({{item.likedCount}})</span>
                                <span class="sendcommentLi-div-vertical">|</span>
                                <span class="el-icon-chat-dot-square"></span>
                            </div>
                            <div class="commentContent">{{item.content}}</div>
                          </div>
                        </li>
                      </ul>
                      </div>
                    </div>
                </div>
            </div>
        </el-col>
         <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="5" class="personalRight">
            <div class="grid-content">
              <!-- 右边 -->
               <div class="grid-content-right">
                <div class="mycover">
                   <div class="grid-content-right-title">
                  <span>|</span>
                  <strong>视频简介</strong>
                  <div class="introduce-time">发布时间：{{publishTime}}</div>
                  <div class="introduce-num">播放次数：{{playCount}}</div>
                  <div class="introduce-dec">
                   {{desc}}
                  </div>
                </div>
                  <ul class="grid-content-right-ul">
                    <li >
                      <img src="item.coverImgUrl" alt="">
                      <div class="grid-content-right-li-title"></div>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="grid-content-right">
                <div class="grid-content-right-title">
                  <span>|</span>
                  <strong>相关推荐</strong>
                </div>
                <div class="mycover">
                  <ul class="grid-content-right-ul">
                    <li :key="index" v-for="(item,index) in mvs" @click="GoToMVdetails(item.id)">
                       <img :src="item.cover" alt="">
                      <div class="grid-content-right-li-title">{{item.name}}</div>
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
  name:'MVdetails',
  inject: ['reload'],
  data() {
    return {


       // 接受动态路由传来的参数(用户id)
      MVid: this.$route.params.id,

      // 控制显示最近一周还是使用时间 (默认是最近一周)
      flag:true,

      // 控制样式 变量
      changeSelectStyle:'',

      // 控制显示隐藏变量
      flag1:true,
      flag2:false,

      mvs:'',

      // MV播放地址
      MVurl:'',

      // MV名字
      MVname:'',

      // 输入框内容
      textarea:'快来发表评论吧~',

      // 发表时间
      publishTime:'',

      // 描述
      desc:'',

      // 视频标签
      videoGroup:'',

      // 播放数量
      playCount:'',

      // 时长
      duration:'',

      // 点赞,评论，分享数量
      likedCount:'',
      commentCount:'',
      shareCount:'',

      //热门评论
      hotComments:''
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


    // 获取相似MV
    async getsimiMV(){
        const result = await this.$http.get("/simi/mv?mvid=" + this.MVid);
        if (result.status !== 200) {
          return this.$message.error("获取用户信息失败！");
        }
        console.log("相似MV！！！！！！！");
        console.log(result.data);
        this.mvs = result.data.mvs
    },
    
    // 
     GoToMVdetails(id){
       this.$router.push({name:'MVdetails',params: {id:id}});
      //  局部刷新当前组件
       this.reload();
    },
      
  
    // 获取MV详细
    async getMVdetails(){
        const result = await this.$http.get("/mv/detail?mvid=" + this.MVid);
        if (result.status !== 200) {
          return this.$message.error("获取用户信息失败！");
        }
        console.log("获取MV详细!!!!!!!!!!");
        console.log(result.data);
        this.MVname = result.data.data.name;
        this.desc = result.data.data.desc;
        this.publishTime = result.data.data.publishTime;
        // 视频标签
        this.videoGroup = result.data.data.videoGroup
        // 播放数量
        this.playCount = result.data.data.playCount
        // 持续时间
        this.duration = result.data.data.duration
    },

    // 获取MV地址
    async getMVURL(){
        const result = await this.$http.get("/mv/url?id=" + this.MVid);
        if (result.status !== 200) {
          return this.$message.error("获取用户信息失败！");
        }
        console.log("获取MV地址");
        console.log(result.data);
        this.MVurl = result.data.data.url;
        console.log(this.MVurl);
    },

    // 获取 mv 点赞转发评论数数据
        async getMVflowData(){
        const result = await this.$http.get("/mv/detail/info?mvid=" + this.MVid);
        if (result.status !== 200) {
          return this.$message.error("获取用户信息失败！");
        }
        console.log("获取 mv 点赞转发评论数数据");
        console.log(result.data);
        // this.MVurl = result.data.data.url;
        // console.log(this.MVurl);
        this.commentCount = result.data.commentCount;
        this.likedCount = result.data.likedCount;
        this.shareCount = result.data.shareCount;
    },

    // 获取热门评论
      async getMVHotcomment(){
        const result = await this.$http.get("/comment/hot?id="+ this.MVid +"&type=1" );
        if (result.status !== 200) {
          return this.$message.error("获取用户信息失败！");
        }
        console.log("获取热门评论成功");
        console.log(result.data);
        this.hotComments = result.data.hotComments
    },

  },

   // 生命周期函数  页面刷新时调用
    mounted() {
      this.getsimiMV();
      this.getMVdetails();
      this.getMVURL();
      this.getMVflowData();
      this.getMVHotcomment();
    }
};
</script>
<style lang="less" scoped>

.grid-content {
  padding: 0;
}
// 左边右边中间的布局
.personalLeft {
  border-radius: 5px;
  margin: 10px 5px;
  box-shadow: 4px 4px 55px 1px #e0e0e0
}

// 左
.personalLeft {
  padding: 0!important;
  .videobox {
    width: 100%;
    height: 565px;
     position: relative;
    video {
      width: 100%;
      height: 100%;
      position: absolute;
      margin-top: 24px;
      left:50%;
      transform:translateX(-50%); 
    }
    
  }
  .grid-content-MVdec {
    padding: 20px;
    .MVname {
      font-weight: 600;
      margin: 10px 0;
    }
    .label {
      margin-bottom: 15px;
      span {
        font-size: 14px;
        margin: 0 6px;
        color: rgb(255, 0, 0);
      }
    }
    .promulgator {
      font-size: 12px;
      color: rgb(167, 167, 167);
      span {
        margin-right: 20px;
      }
    }
    .Commentnumber {
      
      .Commentnumberbox {
        font-size: 16px;
        color: #707070;
        padding: 15px 0px;
        span {
          margin-left: 10px;
        }
      }
      .areaTextimg {
        width: 65px;
        margin-right: 15px;
        border-radius: 5px;
      }
      .sendcomment {
            float:right;
            width: 80px;
            height: 35px;
            background: red;
            color: #fff;
            text-align: center;
            line-height: 35px;
            border-radius: 5%;
            // 鼠标小手
            cursor:pointer;
      }
      .sendcommentLi {
        margin-bottom: 35px;
        height: 70px;
        img {
          float: left;
          width: 50px;
          border-radius: 50%;
          margin-top: 18px;
          margin-right: 20px;
        }
        .sendcommentLi-div {
          width: 93%;
          float: left;
          .commentContent {
            background: #e9e9e9;
            box-sizing: border-box;
            padding: 10px;
            line-height: 20px;
            font-size: 13px;
            border-radius: 5px;
            margin-top: 5px;
          }         
          .sendcommentLi-div-vertical {
             margin: 0 8px;
          }
          .like {
            margin-right: 5px;
          }
        }
        .sendtime {
          font-size: 12px;
          margin: 0 5px;
          color: rgb(158, 158, 158);
        }
        .sendcommentLi-div-one {
          span {
            font-size: 14px;
          }
        }
      }
    }

   
    
  }
  
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


// 右
// personalRight {

// }
.grid-content-right {
    margin: 10px;
    border-radius: 5px;
    width: 90%;
    box-sizing: border-box;
    padding: 15px;
    margin-top: 10px;
    box-shadow: 4px 4px 55px 1px #e0e0e0;
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

    .introduce-time {
      margin-top: 15px;
    }
    .introduce-num,
    .introduce-time {
      color: rgb(168, 168, 168);
      font-size: 14px;
    }
    .introduce-dec {
      margin-top: 15px;
      font-size: 14px;
    }
      .grid-content-right-ul {
          width: 100%;
          box-sizing: border-box;
          li{
                display: inline-block;
                width: 95%;
                margin: 10px;
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

// 按钮样式
.btn {
    display: inline-block;
    width: 70px;
    height: 32px;
    // background: #ff0000;
    border:1px solid  #e6e6e6;
    border-radius: 24px;
    line-height: 32px;
    text-align: center;
    font-weight: 600;
    // color: whitesmoke;
    font-size: 14px;
    margin: 15px;
}
.el-textarea {
  width: 92%;
  height: 100%;
      margin-bottom: 10px;
}
</style>
