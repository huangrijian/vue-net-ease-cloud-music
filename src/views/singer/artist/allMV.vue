<template>
  <div class="Determinelocation">
      <h1>所有MV
      </h1>
       <ul>
           <li :key="index" v-for="(item,index) in allMV">{{item.name}}</li>
       </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      SingerId: this.$route.params.SingerId,
      allMV:''
    };
  },
  methods: {
    async gethotSingerHotworks() {
      const result = await this.$http.get("/artist/mv?id=" + this.SingerId);
      if (result.status !== 200) {
        return this.$message.error("获取失败！");
      }
      // this.$message.success("获取MV成功！");
        console.log(result.data.mvs);
        this.allMV = result.data.mvs
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
