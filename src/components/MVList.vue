<template>
    <div>
         <el-row :gutter="10" class="el-row01" style="margin-bottom: 20px">
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3"><div class="grid-content bg-purple"></div></el-col>
        <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="18">
            <div class="grid-content">
                  <div class="btn" @click="handle">点击更新</div>
                  <h1>MV</h1>
                 <div class="SingerList" style="dispaly:block">
                     <div class="SingerListLi" :key="index" v-for="(item,index) in artists" @click="GoToMVdetails(item.id)">
                         <img :src="item.cover" alt="">
                         <span>{{item.name}}</span>
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
    props: ['currentarea','currenttype','currentorder'],

    watch: {
      currentarea: function (val) {       
       //console.log(val);   // 接收父组件的值
        this.currentarea1 = val
  
      },
       currenttype: function (val) {       
       //console.log(val);   // 接收父组件的值
          this.currenttype1 = val   
   
      },
       currentorder: function (val) {       
       //console.log(val);   // 接收父组件的值
            this.currentorder1 = val
      },

    },
    data() {
        return {
            currentarea1:'',
            currenttype1:'',
            currentorder1:'',
            
            // 歌手
            artists:'',

        }
    },
    methods: {

        GoToMVdetails(id){
            this.$router.push({name:'MVdetails',params: {id:id}})
        },


        // 点击更新 （重新发起请求）
        handle(){
            console.log("更新");
             console.log(this.currentarea1);
             console.log(this.currenttype1);
             console.log(this.currentorder1);
             this.getSingerlist();
        },


            // 获取歌单详情
        async getSingerlist(){

            const result = await this.$http.get("/mv/all?area="+ this.currentarea1 +"&type="+ this.currenttype1 +"&order=" + this.currentorder1 +"&limit=44");
            if (result.status !== 200) {
                return this.$message.error("获取用户信息失败！");
            }
            console.log("获取MV！！列表");
            console.log(result.data);
            this.artists = result.data.data;
            console.log(this.artists);

        },

    },
    mounted() {
        this.getSingerlist()
    },
    
}
</script>
<style lang="less" scoped>
.SingerList {
    width: 100%;
    box-shadow: 4px 4px 55px 1px #e0e0e0;
    .SingerListLi {
       display: inline-block;
       width: 300px;
       box-shadow: 4px 4px 55px 1px #c5c5c5;
    //    width: 100%;
       height: 106px;
       text-align: center;
       margin: 29px;
       img {
        width: 300px;
        display: block;
       }
       span {
           width: 100%;
           margin-top: 5px;
           font-size: 14px;
           color: rgb(112, 112, 112);
               // 强制两行
            overflow:hidden;
            text-overflow:ellipsis;
            display:-webkit-box;
            -webkit-box-orient:vertical;
            -webkit-line-clamp:1;//以此类推，3行4行直接该数字就好啦
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