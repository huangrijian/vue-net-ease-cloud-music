<template>
    <div>
      <!-- 导航 -->
      <layout>
        <song-list-nav 
        :tags="HotPlaylist"
        :categories="categories"
        :ArrayData="ArrayData"
        @GetSongType="GetSongType"
        @GetAllSongType="GetAllSongType"
        @GetHotOrNew="GetHotOrNew"
        />
      </layout>

      <!-- 歌单展示区 -->
      <layout>
        <song-list :SongListData="playlists"/>
      </layout>

      <!-- 分页 -->
      <layout class="PagingBox">
        <div class="paging">
          <!--  :current-page="currentPage" @prev-click="prev"   @next-click="next"-->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="220"
            :key="elementui_page_component_key"
            @current-change="currentChange"
          />
        </div>
      </layout>
    </div>
</template>
<script>
import layout from '@/components/content/layout/layout.vue'
import SongListNav from './component/SongListNav'
import SongList from '@/components/content/song_list/SongList.vue'

import { GetHotPlaylist, GetPlaylistContent, GetAllPlaylist } from '@/network/SongList.js'
export default {
    components:{
      SongListNav,
      SongList,
      layout
    },
    data() {
      return {
        // 热门标签
        HotPlaylist:[],
        // 当前key -> 用于解决当前页码不能手动刷新的问题
        elementui_page_component_key:1,

        // 默认数据
        order:'hot',
        cat:'全部',
        limit:60,
        offset:0,

        // 当前展示的数据数组
        playlists:[],

        // 歌单全部分类名称
        categories:{},

        // 具体分类数据 -> 二维数组
       ArrayData:[]
      }
    },
    methods: {
    
    // 用于解决当前页码不能手动刷新的问题
    autoIncrasePageComKey() {
        this.elementui_page_component_key ++
    },

    // 过滤数组
    FilterData(arr){
      let array = [];
      // 将需要的分类数据过滤，并且保存
      let res0 = arr.filter(function(item){
        return (item.category == 0);
      });
      let res1 = arr.filter(function(item){
        return (item.category == 1);
      });
      let res2 = arr.filter(function(item){
        return (item.category == 2);
      });
      let res3 = arr.filter(function(item){
        return (item.category == 3);
      });
      let res4 = arr.filter(function(item){
        return (item.category == 4);
      });
      // 把得到的数据再push到一个新数组  得到一个二维数组
      // 一维（ArrayData）装的是 大分类 -> 比如 语种、风格
      // 二维（res0、res1）装的是 小分类 -> 比如 华语、欧美、日语、
      array.push(res0,res1,res2,res3,res4);
      return array
     
    },

    // goto 排行榜详情页
    GotorankingDetails(id){
       this.$router.push("/rankingdetails/" + id);
    },


  /**
   * 
   * 获取全部歌单
   * 获取歌单
   * 获取最新或者热门
   * 
   * */ 
   GetAllSongType(data){
    //  data为全部歌单分类中的一个分类
    // 当子组件点击全部歌单分类中的一个分类会把这个分类传过来
    // 再调用 InitializePage 进行歌单内容初始化
     this.InitializePage(data)
     console.log("GetAllSongType",data);
   },
 
   GetSongType(index){
        // 华语流行摇滚民谣电子另类/独立轻音乐综艺影视原声ACG
        switch(index) {
          case 0: 
            this.InitializePage('华语')
            break;
          case 1:
            this.InitializePage('流行')
            break;
          case 2: 
            this.InitializePage('摇滚')
            break;
          case 3:
            this.InitializePage('民谣')
            break;
          case 4: 
            this.InitializePage('电子')
            break;
          case 5:
            this.InitializePage('另类/独立')
            break;
          case 6: 
            this.InitializePage('轻音乐')
            break;
          case 7:
            this.InitializePage('综艺')
            break;
          case 8: 
            this.InitializePage('影视原声')
            break;
          case 9: 
            this.InitializePage('ACG')
            break;
        }
        
    },

    // 点击热门或最新按钮 -> 初始化数据
  GetHotOrNew(index){
    switch(index){
      case 1:
        this.order = 'hot'
        this.GetPlaylistContent(this.order,this.cat,this.limit,this.offset)
        break;
      case 2:
        this.order = 'new'
        this.GetPlaylistContent(this.order,this.cat,this.limit,this.offset)
        break;
    }
  },
      // 点击热门标签 -> 初始化数据
      InitializePage(cat){
        this.cat = cat;
        this.offset = 0;
        // 用于解决切换分类当前页码不能刷新的问题
        this.autoIncrasePageComKey();
        this.GetPlaylistContent(this.order,this.cat,this.limit,this.offset)
      },

    //  当前页数改变
      currentChange(currentPage){
        console.log(currentPage);
       this.offset = (currentPage-1) * 60//设置偏移量，一页60个歌单
       this.GetPlaylistContent(this.order,this.cat,this.limit,this.offset)
      },

      /*
      *
      * 网络请求相关
      * 
      */ 
    //  获取热门歌单分类
     GetHotPlaylist(){
       GetHotPlaylist().then(res => {
         this.HotPlaylist = res.tags
       })
     },

    //  获取歌单内容
     GetPlaylistContent(order,cat,limit,offset){
        GetPlaylistContent(order,cat,limit,offset).then(res => {
          this.playlists = res.playlists
        })
      },
    // 获取 全部歌单分类 -> 然后分类 
    GetAllPlaylist(){
      GetAllPlaylist().then(res => {
        this.categories = res.categories //歌单全部分类名称(对象)
        this.ArrayData = this.FilterData(res.sub)// 过滤数据得到一个二维数组,里面装着全部分类数据
        console.log("全部分类数据",this.ArrayData);//全部分类数据 (5) [Array(5), Array(22), Array(12), Array(12), Array(18), __ob__: Observer]
      })
    }
  },
    mounted() {
      // 展示默认热门歌单分类
      this.GetHotPlaylist();
      // 展示默认数据
      this.GetPlaylistContent(this.order,this.cat,this.limit,this.offset)
      // 展示全部歌单分类
      this.GetAllPlaylist();
    },
}
</script>
<style lang="less" scoped>
//分页
.PagingBox {
  position: relative;
}
.paging {
  position:absolute;
  right: 50%;
  transform: translateX(50%);
}
</style>