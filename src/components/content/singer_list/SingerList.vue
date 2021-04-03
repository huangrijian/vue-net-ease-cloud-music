<template>
  <div>
      <ul class="RecommendSinger">
        <li :key="index" v-for="(item,index) in hotSinger" @click="goSingerdetails(item.id)">
          <img :src="item.img1v1Url" alt="" class="hotSingerimg">
            <div class="hotSingerdiv">
              <span>{{item.name}}</span>
              <div>单曲数：<span class="SongCount">{{item.musicSize}}</span></div>
            </div>
        </li>
      </ul>
  </div>
</template>
<script>
export default {
  props:{
    hotSinger:{
      type:Array,
      default:() => []
    }
  },
  methods:{
    // 跳转歌手详情
    goSingerdetails(id) {
      console.log(id);
      // 传递参数  -- this.$router.push({name: ' 路由的name ', params: {key: value}}) -> 参数取值  -- this.$route.params.key
      this.$router.push('/SingerDetails/' + id )
    },
  }
}
</script>
<style lang="less" scoped>
.RecommendSinger li {
    text-align:center;
    float: left;
    width: 98px;
    border-radius: 50%;
    margin: 20px;
    margin-top: 35px;
    height: 98px;
    font-size: 12px;
    cursor:pointer;
  .SongCount {
    color: red;
  }

    .hotSingerimg {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
</style>