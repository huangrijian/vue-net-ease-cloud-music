<template>
    <div>
          <el-row :gutter="10">
            <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3"><div class="grid-content bg-purple visibilityBox"></div></el-col>
            <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="12">
                <div class="grid-content">
                   <div class="top">
                       <div class="top-left">
                           <img :src="currentData.picUrl" alt="">
                       </div>
                        <div class="top-right">
                            <div>
                                <span class="el-icon-loading"></span>
                                <span class="title">{{currentData.picname}}</span>
                            </div>
                            <div>歌手：{{currentData.Singer}}</div>
                            <div>所属专辑：Joy</div>
                        </div>
                         <div class="top-right-btn">
                                <el-button type="primary">评论<i class="el-icon-edit el-icon--right"></i></el-button>
                                <el-button type="primary">分享<i class="el-icon-share el-icon--right"></i></el-button>
                                <el-button type="primary">收藏<i class="el-icon-upload el-icon--right"></i></el-button>
                        </div>
                   </div>
                   <div class="bottom">
                       <div class="dec">
                           <span>评论</span>
                           <span>共999+条评论</span>
                       </div>
                       <div class="CommentInput">
                           <img src="http://p1.music.126.net/hcx4MIKS1fc_JuSdu_W9lA==/109951165000584159.jpg" alt="">
                           <el-input
                            type="textarea"
                            :rows="3"
                            placeholder="请输入内容并按回车键发送"
                            v-model="textarea"
                            class="inputbox"
                            size="350"
                            maxlength="350"
                            resize="none"
                            @keyup.13.native="SendComment(textarea)">
                           </el-input>

                       </div>
                       <!-- 评论区 -->
                       <ul class="Commentarea">
                           <h3>热门评论</h3>
                            <li :key="index" v-for="(item,index) in hotComments">
                               <div class="Commentareabox">
                                   <div class="pic">
                                        <img :src="item.user.avatarUrl" alt="">
                                   </div>
                                    <div class="side">
                                        <div class="CommentTitle">
                                            <span class="nickname">{{item.user.nickname}}：</span>
                                            <span>{{item.content}}</span>
                                        </div>
                                        <div class="timerorlike">
                                            <span class="timer">{{item.time | filtrationTime(that)}}</span>
                                            
                                            <span class="My-new-icondianzan" @click="clickLike(item.commentId,$event)">{{item.likedCount}}</span>
                                            <span class="vertical">|</span>
                                            <span>回复</span>
                                            
                                        </div>
                                    </div>
                               </div>
                           </li>
                       </ul>

                        <ul class="Commentarea">
                           <h3>最新评论</h3>
                            <li :key="index" v-for="(item,index) in AllComments" v-loading="loading">
                               <div class="Commentareabox">
                                   <div class="pic">
                                        <img :src="item.user.avatarUrl" alt="">
                                   </div>
                                    <div class="side">
                                        <div class="CommentTitle">
                                            <span class="nickname">{{item.user.nickname}}：</span>
                                            <span>{{item.content}}</span>
                                        </div>
                                        <div class="timerorlike">
                                            <span class="timer">{{item.time | filtrationTime(that)}}</span>
                                            
                                           <span class="My-new-icondianzan" @click="clickLike(item.commentId,$event)">{{item.likedCount}}</span>
                                            <span class="vertical">|</span>
                                            <span>回复</span>
                                            
                                        </div>
                                    </div>
                               </div>
                           </li>
                       </ul>
                   </div>
                   
                </div>
            </el-col>
            <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="6">
                <div class="grid-content">
                   
                </div>
            </el-col>
            <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3"><div class="grid-content visibilityBox"></div></el-col>
        </el-row>
    </div>
</template>

<script>
import { getDocumentTop,getWindowHeight, getScrollHeight } from '@/assets/js/downLoad.js'
export default {
    name:'SongDetails',
    data() {
        return {
            Songid:this.$route.query.id,
            // 接收的是对象
            data:this.$route.query.data,
            hotComments:'',
            textarea:'',
            // 当前数据
            currentData:'',
            that:this,
            // AllComments
            AllComments:[],

            flag:"false",

            // 默认偏移量
            offset:0,

            // 下拉加载等待
            loading: false
        }
    },
    filters:{
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
    },
    methods: {

       //下拉加载事件内容
     scrollHander(){
     if (getScrollHeight() == getWindowHeight() + getDocumentTop()) {
        this.loading = true
        //当滚动条到底时,这里是触发内容
          this.getAllComment(this.Songid,this.offset);
        }
     },
    //  点赞+1
      setlike(val,e){
        console.log(e);
        return val++
      },
      // 补零函数
      zeroize(date){
        return date > 10 ? date : '0' + date
      },

      GetData(data){
        console.log("路由传来的数据对象");
        console.log(data);
       this.currentData = data
       console.log( this.currentData);
      },

      // 发表评论
      async SendComment(content){
        let cookie = window.sessionStorage.getItem('cookie', cookie);
        const result = await this.$http.get("/comment?t=1&type=0&id="+ this.Songid +"&content="+ content +"&cookie="+cookie);
        // 清空输入域
        this.textarea = '';
        // 新增数据
        this.AllComments.unshift(result.data.comment)
      },

        // 获取热门评论
        async getHotComment(){
            const result = await this.$http.get("/comment/hot?id="+ this.Songid +"&type=0");
             if (result.status !== 200) {
                return this.$message.error(" 获取热门评论失败！");
            }
            this.hotComments = result.data.hotComments
        },

        // 获取全部评论 
        async getAllComment(Songid, offset){
            const result = await this.$http.get("/comment/music?id="+ Songid +'&limit=50&offset='+ offset);
            // 解构对象
            this.AllComments.push(...result.data.comments)
            this.offset += 50
            this.loading = false
        },

        // 给评论点赞 /comment/like 
        clickLike(commentId,e){
            // 先判断用户有没有登录 /comment/like?id=29178366&cid=12840183&t=1&type=0
            if(window.sessionStorage.getItem("userToken")){
              // 先判断有没有点过赞
              if(e.target.getAttribute("data-islike")){
                 // 如果已经点赞了
                  return

              } else {
              // 如果没有点赞
              // 给点击的对象添加自定义属性以及红色样式 然后给数字+1 
                e.target.setAttribute("data-islike","1");
                e.target.textContent = parseInt(e.target.textContent)+1;
                e.target.setAttribute('style', 'color: red');
                  // 获取cookie 然后发起点赞请求接口
                var cookie = window.sessionStorage.getItem("cookie");
                // 然后发起点赞请求接口
                 this.$http.get("/comment/like?id=" +
                  this.Songid + "&cid=" +
                  commentId + "&t=1&type=0"+
                  "&cookie=" + cookie)
              }
            }else {
              // 没登录则请登录后再操作
                this.$message.warning(" 请登录后再操作！");
                return  this.$router.push("/login");
            }
        }
    },
    created(){
       this.getAllComment(this.Songid,this.offset);
      //  添加下拉监听事件函数
       window.addEventListener( 'scroll', this.scrollHander)
       console.log("created");
       
    },
    // DOM渲染完毕可执行
    mounted() {
      
        this.getHotComment();
        this.GetData(this.data);
        console.log("mounted");
    },
    // vue实例销毁时
    destroyed () {
      // 移除下拉监听事件
	      window.removeEventListener('scroll', this.scrollHander)
    }
}
</script>

<style lang="less" scoped>
.top {
    overflow: hidden;
    position: relative;
    margin-bottom: 85px;
    .top-left,
    .top-right {
        float: left;
    }
    .top-left {
        margin-right:25px;
        img {
            width: 130px;
        }
    }
    .top-right {
       div {
           margin: 15px 0;
       }
       .title {
           font-size: 25px;
           font-weight: 400;
       }
       
    }
    .top-right-btn {
          position: absolute;
          bottom: 1px;
          right: 0px;
    }
}
.bottom {
    .dec {
        margin-bottom: 25px;
    }
    .CommentInput {
        margin-bottom: 55px;
        img {
            width: 70px;
            margin: 0 15px;
            border-radius: 5px;
        }
    }
}


.Commentarea {
    li {
        font-size: 14px;
        margin: 10px 0;
        width: 100%;
        border-bottom: 1px dashed  rgb(204, 204, 204);
        .Commentareabox {
            padding: 15px 0;
            overflow: hidden;
            .pic,
            .side {
                float: left;
                .nickname {
                    color: skyblue;
                }
                .timerorlike {
                    margin-top: 15px;
                    .timer {
                        color: #999;
                    }
                    .vertical {
                        margin: 0 10px;
                    }
                }
            }
            .pic {
                img {
                    width: 50px;
                    margin-right: 10px;
                }
            }

             .side {
                width: 93%;
                .timerorlike {
                     .timer {
                    float: left;
                }
                span {
                    float: right;
                }
                }
               
            
            }


        }
    }
}
.el-textarea {
    width: 89%!important;
}

.My-new-icondianzan {
      // 鼠标小手
  cursor:pointer;
}

</style>