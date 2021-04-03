<template>
<div v-loading="loading">
  <layout>
    <!-- 歌手列表 -->
    <singer-list :hotSinger="dataShow"></singer-list>
 </layout>
  
  </div>
</template>
<script>
import layout from '../../components/content/layout/layout.vue';
// 歌手组件
import SingerList from '@/components/content/singer_list/SingerList.vue'
// 引入下拉需要的函数
import { getDocumentTop,getWindowHeight, getScrollHeight } from '@/assets/js/downLoad.js'
export default {
  components: { layout, SingerList },
    props: ['currentlanguage','currenttype','currentalphabet'],

    watch: {
      // 监听来自父组件的数据
      currentlanguage: function (val) {       
                switch (val) {
                case '全部':
                    this.currentlanguage1 = -1;
                    break;
                case '华语':
                    this.currentlanguage1 = 7;
                    break;
                case '欧美':
                    this.currentlanguage1 = 96;
                    break;
                case '日本':
                    this.currentlanguage1 = 8;
                    break;
                case '韩国':
                    this.currentlanguage1 = 16;
                    break;
                case '其他':
                    this.currentlanguage1 = 0;
                    break;
            } 
            // 监听父类传来的数据的变化，直接通过发请求响应变化
             this.getSingerlist(1,this.offset);
      },

       currenttype: function (val) {       
       //console.log(val);   // 接收父组件的值
             switch (val) {
                case '全部':
                    this.currenttype1 = -1;
                    break;
                case '男歌手':
                    this.currenttype1 = 1;
                    break;
                case '女歌手':
                    this.currenttype1 = 2;
                    break;
                case '乐队':
                    this.currenttype1 = 3;
                    break;
            } 
            // 监听父类传来的数据的变化，直接通过发请求响应变化
             this.getSingerlist(1,this.offset);
      },
       currentalphabet: function (val) {       
       //console.log(val);   // 接收父组件的值
       if(val === '热门'){
           this.currentalphabet1 = -1;
       }else {
           this.currentalphabet1 = val.toLowerCase()
       }
    
        // 监听父类传来的数据的变化，直接通过发请求响应变化
        this.getSingerlist(1,this.offset);
      },

    },
    data() {
        return {
            loading: true,
            currentlanguage1:'',
            currenttype1:'',
            currentalphabet1:'',
            
            offset:0,
      // 当前显示的数据
      dataShow:[],
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
    // 跳转歌手详情
        goSingerdetails(id) {
            console.log(id);
            // 传递参数  -- this.$router.push({name: ' 路由的name ', params: {key: value}}) 参数取值  -- this.$route.params.key
            this.$router.push('/SingerDetails/' + id )
        },


         async getSingerlist(type,offset){
          //  获取MV有两种情况，一是下拉获取，二是更新获取
           if(type == 1){
            //  当type == 1 时，属于更新获取  所以不需要offset
              const result = await this.$http.get("/artist/list?type=" + this.currenttype1 
              +"&area="+ this.currentlanguage1 +"&initial=" + this.currentalphabet1 +
              '&limit=30');
              this.dataShow = result.data.artists;
           }else {
              const result = await this.$http.get("/artist/list?type=" + this.currenttype1 
              +"&area="+ this.currentlanguage1 +"&initial=" + this.currentalphabet1 +
              '&limit=30&offset='+ offset);
              // 解构对象
              this.dataShow.push(...result.data.artists)
              this.offset += 30
           }

           this.loading = false
        },
   },
    mounted() {
        this.getSingerlist(1,this.offset)
    },

    created(){
      //  添加下拉监听事件函数
       window.addEventListener( 'scroll', this.scrollHander);
    },
    // vue实例销毁时  该组件被alive包裹着，所以不会被销毁，所以用deactivated （不活跃）
    deactivated () {
      // 移除下拉监听事件
      console.log("歌手列表deactivated ");
	    window.removeEventListener('scroll', this.scrollHander);
    },

}


</script>
<style lang="less" scoped>
.SingerList {
    width: 100%;
    box-shadow: 4px 4px 55px 1px #e0e0e0;
    .SingerListLi {
       display: inline-block;
       width: 7%;
       height: 106px;
       text-align: center;
       margin: 29px;
       img {
           width: 100%;
           height: 100px;
           border-radius: 50%;
       }
       .name {
           font-size: 14px;
           // 强制两行
            overflow:hidden;
            text-overflow:ellipsis;
            display:-webkit-box;
            -webkit-box-orient:vertical;
            -webkit-line-clamp:1;//以此类推，3行4行直接该数字就好啦
       }
        span {
           width: 100%;
           margin-top: 5px;
           font-size: 14px;
           color: rgb(112, 112, 112);
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