<template>
  <div id="app">

    <!-- 搜索弹框 -->
    <el-dialog
      title="珍惜所有的不期而遇，看淡所有的不辞而别~"
      :visible.sync="dialogVisible"
      width="30%">
       <el-input prefix-icon="el-icon-search" v-model="input" 
       placeholder="请输入关键词并按下回车键" 
        @change="GotosearchDetails(input)" clearable></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

        <!-- 导航栏 -->
      <nav-bar :UserId="Uid" @ClickSearch="ClickSearch"></nav-bar>

      <!-- 局部刷新以下页面 -->
      <keep-alive exclude="search,SongDetails,rankingdetails,MVdetails,SingerDetails,user">
        <router-view @getUserid="UserId" @getMusicMessage="showMusicMessage"  v-if="isRouterShow"></router-view>
      </keep-alive>
    <!-- :searchKeyword="searchKeyword" -->

    <!--music：当前播放的音乐。 list：播放列表 ：showlrc：是否显示歌词-->
    <div @mouseover="mouseover" :class="{IsShow:!IsShow}">
      <aplayer :music="audio[0]"  :showLrc="true" :autoplay="true"  class="Aplayer"></aplayer>
    </div>
    

  <!-- 底部 -->
  <Bottom></Bottom>

  </div>


</template>

<script>
import aplayer from "vue-aplayer";  
import Bottom from '@/components/content/Bottom'
import PopupSearchBox from '@/components/content/PopupSearchBox'
import NavBar from '@/components/content/navbar/NavBar'

export default {
  components: { 
    aplayer,
    Bottom,
    PopupSearchBox,
    NavBar
  },

  //局部刷新组件要用到的方法 
  provide () {
    return {
      reload: this.reload,
    }
  },
  data() {
    return {
       dialogVisible: false,

      // 音频数据存放在次
      audio:  [{  }],
        // 局部刷新变量
      isRouterShow: true,

        // 登录后的用户id
      Uid:'',

      IsShow:false,

      input:''

    }
  },
  methods: {
  //  搜索弹框处理函数 
  GotosearchDetails(keyword){
  // 跳转路由并把关键词传过去
    this.$router.push({name:'search',query: {key:keyword}});
  //  清空输入框内容
    this.input = '' 
  },

  // 点击搜索
  ClickSearch(){
      this.dialogVisible = true
  },
    mouseover(){
      console.log(99);
      // this.IsShow = !this.IsShow
    },
    // 将登录后传入的用户id再次
    UserId(val){
      console.log(val);
      this.Uid = val;
      console.log(this.Uid);
    },
      //局部刷新组件要用到的方法 
    async reload () {
      this.isRouterShow = false
      await this.$nextTick()
      this.isRouterShow = true
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
@import '~@/assets/css/base.less';

  // 音乐组件
.Aplayer {
  width: 100%;
  position: fixed!important;
  bottom: -5px;
  left: -5px;
  z-index: 1;
}

// 弹出框的样式

.el-dialog {
background: url('~@/assets/img/bj88.jpg')!important;
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
