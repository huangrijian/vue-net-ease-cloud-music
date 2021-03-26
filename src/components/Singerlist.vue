<template>
    <div v-loading="loading">
         <el-row :gutter="10" class="el-row01" style="margin-bottom: 20px">
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3"><div class="grid-content bg-purple"></div></el-col>
        <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="18">
            <div class="grid-content">
                  <!-- 歌手列表 -->
                 <div class="SingerList" style="dispaly:block">
                     <div class="SingerListLi" :key="index" v-for="(item,index) in dataShow" @click="goSingerdetails(item.id)">
                         <img :src="item.picUrl" alt="">
                         <div class="name">{{item.name}}</div>
                         <span>单曲数: {{item.musicSize}}</span>
                     </div>
                </div>
                <!-- 分页 -->
                <el-pagination
                background
                layout="prev, pager, next"
                :total="artists.length"
                :page-size="pageSize"
                @next-click="NextClick"
                @prev-click="PrevClick"
                @current-change="currentChange">
                </el-pagination>
            </div>
            </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3"><div class="grid-content"></div></el-col>
    </el-row>
       
    </div>
</template>
<script>
export default {
    props: ['currentlanguage','currenttype','currentalphabet'],

    watch: {
      currentlanguage: function (val) {       
       //console.log(val);   // 接收父组件的值
    //    area
                switch (val) {
                case '全部':
                    this.currentlanguage1 = -1;
                    break;
                case '华语':
                    this.currentlanguage1 = 7;
                    break;
                case '欧美':
                    this.currentlanguage1 = 96;
                    break;
                case '日本':
                    this.currentlanguage1 = 8;
                    break;
                case '韩国':
                    this.currentlanguage1 = 16;
                    break;
                case '其他':
                    this.currentlanguage1 = 0;
                    break;
            } 
            // 监听父类传来的数据的变化，直接通过发请求响应变化
             this.getSingerlist();
      },
       currenttype: function (val) {       
       //console.log(val);   // 接收父组件的值
             switch (val) {
                case '全部':
                    this.currenttype1 = -1;
                    break;
                case '男歌手':
                    this.currenttype1 = 1;
                    break;
                case '女歌手':
                    this.currenttype1 = 2;
                    break;
                case '乐队':
                    this.currenttype1 = 3;
                    break;
            } 
            // 监听父类传来的数据的变化，直接通过发请求响应变化
             this.getSingerlist();
      },
       currentalphabet: function (val) {       
       //console.log(val);   // 接收父组件的值
       if(val === '热门'){
           this.currentalphabet1 = -1;
       }else {
           this.currentalphabet1 = val.toLowerCase()
       }
    
    // 监听父类传来的数据的变化，直接通过发请求响应变化
     this.getSingerlist();
      },

    },
    data() {
        return {
            loading: true,
            currentlanguage1:'',
            currenttype1:'',
            currentalphabet1:'',
            
     


      // 分页数据

       // 歌手总条数
      artists:[],
      // 所有页面的数据
      totalPage: [],
      // 每页显示数量
      pageSize: 45,
      // 共几页
      pageNum: 3,
      // 当前显示的数据
      dataShow: "",
      // 默认当前显示第一页
      currentPage: 0
    
        }
    },
    methods: {
    // 跳转歌手详情
        goSingerdetails(id) {
            console.log(id);
            // 传递参数  -- this.$router.push({name: ' 路由的name ', params: {key: value}})
            // 参数取值  -- this.$route.params.key
            // 路由跳转
            this.$router.push('/SingerDetails/' + id )
        },


            // 获取歌手列表
        getSingerlist(){
            this.$http.get("/artist/list?type=" 
            + this.currenttype1 +"&area="
            + this.currentlanguage1 +"&initial=" 
            + this.currentalphabet1+"&limit=100&offset=100")
            .then(result=> {
                  
                if (result.status !== 200) {
                return this.$message.error("获取用户信息失败！");
            }
                console.log("获取歌手列表！！！！！！");
                
                // 歌手总条数
                console.log(result.data.artists);
                this.artists = result.data.artists;
                
                  // 根据后台数据的条数和每页显示数量算出一共几页,得0时设为1 ;
                this.pageNum = Math.ceil(this.artists.length / this.pageSize) || 1;
                // 一共几页
                console.log(this.pageNum);


                 for (let i = 0; i < this.pageNum; i++) {
                // 每一页都是一个数组 形如 [['第一页的数据'],['第二页的数据'],['第三页数据']]
                // 根据每页显示数量 将后台的数据分割到 每一页,假设pageSize为5， 则第一页是1-5条，即slice(0,5)，
                //第二页是6-10条，即slice(5,10)...
                    this.totalPage[i] = this.artists.slice(this.pageSize * i, this.pageSize * (i + 1))
                }
            // 获取到数据后显示第一页内容
            this.dataShow = this.totalPage[this.currentPage];

            })
        },

        // 下一页
        NextClick(){
          if (this.currentPage === this.pageNum - 1) return ;
          this.dataShow = this.totalPage[++this.currentPage];
        },
        // 上一页
        PrevClick(){
          if (this.currentPage === 0) return ;
          this.dataShow = this.totalPage[--this.currentPage];
        },

        currentChange(){
            console.log(8);
            var text = document.querySelector('.active')
            console.log(text.innerText);
             this.dataShow = this.totalPage[text.innerText-1];
        },

        // 延时方法
        get(){
            this.loading = false;
        }
        

    },
    mounted() {
        this.getSingerlist()
        // 延时器
        setTimeout(this.get,1000)
    },
    
}
</script>
<style lang="less" scoped>
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

// 按钮样式
.btn {
    color: rgb(255, 255, 255);
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
    background: rgb(255, 0, 0);
}
</style>