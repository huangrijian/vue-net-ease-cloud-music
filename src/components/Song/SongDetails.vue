<template>
    <div>
          <el-row :gutter="10">
            <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3"><div class="grid-content bg-purple visibilityBox"></div></el-col>
            <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="12">
                <div class="grid-content">
                   <div class="top">
                       <div class="top-left">
                           <img :src="data.picUrl" alt="">
                       </div>
                        <div class="top-right">
                            <div>
                                <span class="el-icon-loading"></span>
                                <span class="title">{{data.picname}}</span>
                            </div>
                            <div>歌手：{{data.Singer}}</div>
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
                           <span>共141260条评论</span>
                       </div>
                       <div class="CommentInput">
                           <img src="http://p1.music.126.net/hcx4MIKS1fc_JuSdu_W9lA==/109951165000584159.jpg" alt="">
                           <el-input
                            type="textarea"
                            :rows="3"
                            placeholder="请输入内容"
                            v-model="textarea"
                            class="inputbox"
                            size="350"
                            maxlength="350"
                            resize="none">
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
                                            <span class="timer">2017年12月15日</span>
                                            
                                            <span class="el-icon-thumb" @click="clickLike(item.commentId)"></span>
                                            
                                            <span>({{item.likedCount}})</span>
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
export default {
    name:'SongDetails',
    data() {
        return {
            Songid:this.$route.query.id,
            // 接收的是对象
            data:this.$route.query.data,
            hotComments:'',
            textarea:''
        }
    },
    methods: {
        // 获取热门评论
        async getHotComment(){
            const result = await this.$http.get("/comment/hot?id="+this.Songid +"&type=0");
             if (result.status !== 200) {
                return this.$message.error(" 获取热门评论失败！");
            }
            console.log("评论");
            console.log(result.data.hotComments);
            this.hotComments = result.data.hotComments
        },

        // 给评论点赞 /comment/like 
        async clickLike(commentId){
            
            // 先判断用户有没有登录 /comment/like?id=29178366&cid=12840183&t=1&type=0
            if(window.sessionStorage.getItem("userToken")){
                this.$message.success(" 点击了");
                 const result = await this.$http.get("/comment/like?id="+this.Songid +"&cid=" + commentId + "&t=1&type=0");
                // const result = await this.$http.get("/comment/like?id=29178366&cid=12840183&t=1&type=0");
                 if(result.status !== 200) {
                    return this.$message.error(" 获取点赞失败！");
                 }
                 console.log("点赞");
                 console.log(result);

            }else {
                return  this.$message.error(" 请登录后再操作！");
            }
        }
    },
    // DOM渲染完毕可执行
    mounted() {
        this.getHotComment();
    },
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
</style>