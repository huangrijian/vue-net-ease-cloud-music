<template>
  <div id="app">

    <!-- 弹出框 -->
    <popup-search-box></popup-search-box>

        <!-- 导航栏 -->
      <nav-bar :UserId="Uid"></nav-bar>

      <!-- 局部刷新以下页面 -->
      <keep-alive exclude="search,SongDetails,rankingdetails,MVdetails,SingerDetails,user">
        <router-view @getUserid="UserId" @getMusicMessage="showMusicMessage"  v-if="isRouterShow"></router-view>
      </keep-alive>
    <!-- :searchKeyword="searchKeyword" -->

    <!--music：当前播放的音乐。 list：播放列表 ：showlrc：是否显示歌词-->
    <aplayer :music="audio[0]"  :showLrc="true" :autoplay="true"  class="Aplayer"></aplayer>

    <h1>{{$store.state.counter}}</h1>
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
      // 音频数据存放在次
         audio:  [{  }],
        // 局部刷新变量
         isRouterShow: true,

        // 登录后的用户id
         Uid:''

    }
  },
  methods: {
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


</style>
