<template>
  <div v-loading="loading">
    
    <layout>
      <song-list title="云村特色版">
        <li slot="songlist" :key="index" v-for="(item,index) in featureRanking" @click="GotorankingDetails(item.id)">
          <img :src="item.coverImgUrl" alt="">
          <div>{{item.name}}</div>
        </li>
      </song-list>
    </layout>

    <layout>
      <song-list  title="全球媒体榜">
        <li slot="songlist" :key="index" v-for="(item,index) in featureRankingglobal" @click="GotorankingDetails(item.id)">
          <img :src="item.coverImgUrl" alt="">
          <div>{{item.name}}</div>
        </li>
      </song-list>
    </layout>
  </div>
</template>

<script>
import layout from '@/components/content/layout/layout.vue'
import SongList from '@/components/content/song_list/SongList.vue'
export default {
  components:{
    SongList,
    layout
  },
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
</style>
