<template>
    <div>
        <div class="search">
            <el-input v-model="keyword" placeholder="请输入内容" class="inputbox" @change="GotoSearchDetails(keyword);GotoSearchSinger(keyword);GotoSearchAlbum(keyword)"></el-input>
        </div>
            <!-- 路由占位符 -->
        <router-view :searchVal="searchVal" :searchValSinger="searchValSinger" :searchValAlbums="searchValAlbums"  @getMusicMessage="showMsg"></router-view>
    </div>

</template>
<script>
export default {
    name:'search',
    props: ['searchKeyword'],
    data() {
        return {

            // 接收父路由传来的参数
            key:this.$route.query.key,
            keyword:'',
            // 歌曲data
            searchVal:'',

            // 歌手data
            searchValSinger:'',

            // 专辑
            searchValAlbums:'',
            
            flag:true,
        }
    },
    watch: {
      searchKeyword: function (val) {       
       console.log("搜索框的值");   // 接收父组件的值
    //    
       console.log(val);
       this.GotoSearchDetails(val);
      },
      key:function(val){
          console.log(val);
          this.GotoSearchDetails(val)
      }
    },
    methods: {

        showMsg (val) {   // val即为子组件传过来的值
        console.log(val);
        this.$emit('getMusicMessage', val);
        },
            // 去搜索详情（发送歌曲）   搜索接口 /search?keywords= 
            async GotoSearchDetails(keyword){
                // 
                const result = await this.$http.get("/cloudsearch?keywords=" + keyword);
                if (result.status !== 200) {
                    return this.$message.error("获取搜索歌曲失败！");
                }
                //  将歌曲数据传给子组件
                this.searchVal = result.data.result.songs;
                // console.log(this.searchVal);   // 在需要传值的方法中处理
            },
            
             // 去搜索详情（发送歌手）   搜索接口 /search?keywords= 
            async GotoSearchSinger(keyword){
                // 
                const result = await this.$http.get("/cloudsearch?keywords=" + keyword + "&type=100&limit=36");
                if (result.status !== 200) {
                    return this.$message.error("获取搜索歌手失败！");
                }
                console.log("歌手");
                // console.log(result.data);
                //  将歌手数据传给子组件
                this.searchValSinger = result.data.result.artists;
                console.log(this.searchValSinger);   // 在需要传值的方法中处理
            },

              // 去搜索详情（发送专辑）   搜索接口 /search?keywords= 
            async GotoSearchAlbum(keyword){
                // 
                const result = await this.$http.get("/cloudsearch?keywords=" + keyword + "&type=10&limit=36");
                if (result.status !== 200) {
                    return this.$message.error("获取搜索歌手失败！");
                }
               this.searchValAlbums = result.data.result.albums;
            },



    },
    // DOM加载完成后执行
     mounted: function() {
        //  由搜索弹框进入的处理函数
        if(this.key){
             this.GotoSearchDetails(this.key);
             this.GotoSearchSinger(this.key);
             this.GotoSearchAlbum(this.key);
        }
        // 关闭弹框
        var btn = document.querySelector('.el-button--default')
        btn.click();
    },


}
</script>
<style lang="less" scoped>
    .search {
        width: 100%;
        height: 400px;
         /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: center;
    color:#fff;
    background: url('../../assets/snow.jpg');
    background-position: 50% 42%;
    }
    .inputbox {
        width: 50%;
        background:rgba(241, 241, 241,0.5);
    }
</style>