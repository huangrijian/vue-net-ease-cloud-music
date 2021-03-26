<template>
  <div class="SingerDetails" v-loading="loading">

<!-- 弹出框 -->

<el-dialog
  title="珍惜所有的不期而遇，看淡所有的不辞而别。"
  :visible.sync="dialogVisible"
  width="30%">
  <el-input prefix-icon="el-icon-search" v-model="input" placeholder="请输入关键词"></el-input>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>


  

    <!-- 云音乐特色版榜单 -->
     <el-row :gutter="10" class="el-row01">
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3"><div class="grid-content"></div></el-col>
        <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="18">
            <div class="grid-content">
              <h2>云音乐特色版</h2>
              <ul class="rankingUl">
                  <li :key="index" v-for="(item,index) in featureRanking " @click="GotorankingDetails(item.id)">
                      <img :src="item.coverImgUrl" alt="">
                      <div class="rankingfeatureName">{{item.name}}</div>
                  </li>
              </ul>
            </div>
            </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3"><div class="grid-content"></div></el-col>
    </el-row>

     <!-- 全球媒体榜特色版榜单 -->
     <el-row :gutter="10" class="el-row01">
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3"><div class="grid-content"></div></el-col>
        <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="18">
            <div class="grid-content">
              <h2>全球媒体榜</h2>
               <ul class="rankingUl">
                   <!-- featureRankingglobal -->
                  <li :key="index" v-for="(item,index) in featureRankingglobal" @click="GotorankingDetails(item.id)">
                      <img :src="item.coverImgUrl" alt="">
                       <div class="rankingNameglobal">{{item.name}}</div>
                  </li>
              </ul>
            </div>
            </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3"><div class="grid-content"></div></el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
        // 特色榜(4条）
        featureRanking:'',
         // 全球榜(n-4条）
        featureRankingglobal:'',

         // 弹出框相关变量
        dialogVisible: false,
        input:'',
    };
  },
  methods: {

    // goto 排行榜详情页
    GotorankingDetails(id){
       this.$router.push("/rankingdetails/" + id);
    },

    //  获取排行榜单
     getniceSongList(){
    
       this.$http.get('/toplist')
       .then(result=>{
        if (result.status !== 200) {
        return this.$message.error("获取失败！");
      }
      console.log("排行榜单");
      console.log(result.data);
    //   特色榜单
    this.featureRanking = result.data.list.slice(0,4);
    //  全球榜单
    this.featureRankingglobal = result.data.list.slice(4,29);
     this.loading = false;
    })
     

    },


  
  },
  // 生命周期函数  页面刷新时调用
  mounted() {
      this.getniceSongList();
  },
};
</script>
<style lang="less" scoped>

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
li {
    // 鼠标小手
  cursor:pointer;
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


.el-row {
    box-sizing: border-box;
    margin-left: 0!important;
    margin-right: 0!important;
}

 .Determinelocation {
    width: 100%;
    height: 100%;
  }

// 榜单
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



</style>
