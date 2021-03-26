<template>
    <div class="Determinelocation">
        <h2>所有专辑</h2>
        <ul>
           <li :key="index" v-for="(item,index) in allAlbum">{{item.name}}</li>
        </ul>
    </div>
</template>

<script>
export default {
  data() {
    return {
      SingerId: this.$route.params.SingerId,
      allAlbum:''
    };
  },
  methods: {
    async gethotSingerHotworks() {
      const result = await this.$http.get("/artist/album?id="+ this.SingerId +"&limit=30");
      if (result.status !== 200) {
        return this.$message.error("获取失败！");
      }
      // this.$message.success("获取成功！");
      console.log(1251);
        console.log(result.data.hotAlbums);
        this.allAlbum = result.data.hotAlbums
    },
  },
    // 生命周期函数  页面刷新时调用
  mounted() {
    this.gethotSingerHotworks();
  },
};
</script>
<style  lang="less" scoped>

</style>
