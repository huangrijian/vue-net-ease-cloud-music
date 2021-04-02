<template>
  <div v-loading="loading">
    <layout>
      <song-list title="云村特色版" :SongListData="featureRanking" :ShowPlayCount="false"/>
    </layout>

    <layout>
      <song-list title="云村特色版" :SongListData="featureRankingglobal" :ShowPlayCount="false"/>
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
    };
  },
  methods: {
    //  获取排行榜单
     getniceSongList(){
       this.$http.get('/toplist')
       .then(result=>{
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
