<template>
    <layout>
      <h1>MV</h1>
      <mv-list  :artists="artists"/>
    </layout>
</template>
<script>
import layout from '../../components/content/layout/layout.vue'
import MvList from '@/components/content/MVlist/MvList.vue'
// 引入下拉需要的函数
import { getDocumentTop,getWindowHeight, getScrollHeight } from '@/assets/js/downLoad.js'
export default {
    props: ['currentarea','currenttype','currentorder'],
    components: { layout, MvList },
    watch: {
      // 监听父类传来的数据
      currentarea: function (val) {       
        this.currentarea1 = val
        this.getSingerlist(1,this.offset);
      },
       currenttype: function (val) {       
        this.currenttype1 = val   
        this.getSingerlist(1,this.offset);
      },
       currentorder: function (val) {       
        this.currentorder1 = val
        this.getSingerlist(1,this.offset);
      },

    },
    data() {
        return {
            currentarea1:'',
            currenttype1:'',
            currentorder1:'',
            offset:0,
            // 歌手
            artists:[],
        }
    },
    methods: {
           //下拉加载事件内容
     scrollHander(){
     if (getScrollHeight() == getWindowHeight() + getDocumentTop()) {
        //当滚动条到底时,这里是触发内容
          console.log("scrollHander");
          this.getSingerlist(2,this.offset)
    }
     },

       async getSingerlist(type,offset){
          //  获取MV有两种情况，一是下拉获取，二是更新获取
           if(type == 1){
            //  当type == 1 时，属于更新获取  所以不需要offset
              const result = await this.$http.get("/mv/all?area=" + this.currentarea1 
              +"&type="+ this.currenttype1 +"&order=" + this.currentorder1 +
              '&limit=50');
              this.artists = result.data.data;
           }else {
              const result = await this.$http.get("/mv/all?area=" + this.currentarea1 
              +"&type="+ this.currenttype1 +"&order=" + this.currentorder1 +
              '&limit=50&offset='+ offset);
              // 解构对象
              this.artists.push(...result.data.data)
              this.offset += 50
           }
           this.loading = false
        },

        GoToMVdetails(id){
            this.$router.push({name:'MVdetails',params: {id:id}})
        },
    },
    mounted() {
        this.getSingerlist(1,this.offset);
    },
         created(){
      //  添加下拉监听事件函数
       window.addEventListener( 'scroll', this.scrollHander);
    },
    // vue实例销毁时
    deactivated  () {
      // 移除下拉监听事件
      console.log("MV的deactivated ");
	    window.removeEventListener('scroll', this.scrollHander);
    }
    
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

</style>