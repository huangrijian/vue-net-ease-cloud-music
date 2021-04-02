<template>
    <div>
      <layout>
         <div class="top">
            <div class="top-title">搜索结果</div>
            <div :key="index"  :class="{fontcolor: current == index }" v-for="(item,index) in option" 
            @click="current=index">{{item}}</div>
         </div>
        <div class="main">
            <!-- 单曲 -->
            <play-song v-show="current==0" :SearchSongData="searchValSong"></play-song>
            <!-- 歌手 -->
              <div v-show="current==1" class="SingerList" style="dispaly:block">
                <div class="SingerListLi" :key="index" v-for="(item,index) in searchValSinger" @click="goSingerdetails(item.id)">
                    <img :src="item.picUrl" alt="">
                    <div class="name">{{item.name}}</div>
                    <span>专辑数: {{item.albumSize}}</span>
                </div>
              </div>      
              <!-- 歌单 -->
               <song-list v-show="current==2" :SongListData="searchValAlbums"/>

        </div>
      </layout>
    </div>
</template>
<script>
import layout from '@/components/content/layout/layout.vue'
import PlaySong from '@/components/common/play_song/PlaySong'
// 歌单组件
import SongList from '@/components/content/song_list/SongList.vue'
export default {
  components:{
    layout,
    PlaySong,
    SongList
  },
    // 从父组件接受参数
  props: ['searchValSong','searchValSinger','searchValAlbums'],
  data() {
    return {
     // 选项数组
      option:['单曲','歌手','歌单','专辑'],
      // 当前的选项 歌曲
      current:0,

    };
  },

   methods: {
     // 跳转歌手详情
  goSingerdetails(id) {
      // 传递参数  -> this.$router.push({name: ' 路由的name ', params: {key: value}}) ->  参数取值  -- this.$route.params.key
      this.$router.push('/SingerDetails/' + id )
  },

  },
};
</script>
<style lang="less" scoped>
.top {
    margin-top: 20px;
    overflow: hidden;
    margin-bottom: 20px;
    div {
      float: left;
      margin: 0 25px;
      font-size: 14px;
    }
    
    .top-title {
        font-size: 18px;
        font-weight: 600;
    }
}

    .main {
        // 歌手列表
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
}

.fontcolor {
    color: red;
}
</style>