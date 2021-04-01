<template>
  <div>
    <!-- user.vue的数据展示-->
    <ul v-if="SongData">
        <li class="TopSongli" style="color:rgb(100, 100, 100)">
          <div>序号</div>
          <div>歌曲</div>
          <div>歌手</div>
          <div>专辑</div>
          <div>时长</div>
        </li>

        <div class="Songli">
          <li slot="songli" :key="index" v-for="(item,index) in SongData" @click="playMusic(item.song.id)" @mouseover="ChangeIsShow(index)">
            <div>
              <!-- <span class="My-new-iconyinle" v-show="currentShow == index" ></span> -->
              <span>
                <i class="My-new-iconyinle icnColor" v-show="currentShow == index" ></i>
                <span v-show="currentShow !== index">{{index + 1 }}</span>
              </span>
            </div>
            <div>
              <img :src="item.song.al.picUrl" alt="">
              <span>{{item.song.name}}</span>
            </div>
            <div><span>{{item.song.ar[0].name}}</span></div>
            <div><span>{{item.song.al.name}}</span></div>
            <div><span>{{item.song.dt | GetTime()}}</span></div>
          </li>   
        </div>
    </ul>

    <!-- searchDetails.vue的数据展示 -->
     <ul v-if="SearchSongData">
        <li class="TopSongli" style="color:rgb(100, 100, 100)">
          <div>序号</div>
          <div>歌曲</div>
          <div>歌手</div>
          <div>时长</div>
        </li>

        <div class="Songli">
          <li slot="songli" :key="index" v-for="(item,index) in SearchSongData" @click="playMusic(item.id)" @mouseover="ChangeIsShow(index)">
            <div>
              <span>
                <i class="My-new-iconyinle icnColor" v-show="currentShow == index" ></i>
                <span v-show="currentShow !== index">{{index + 1 }}</span>
              </span>
            </div>
            <div>
              <img :src="item.al.picUrl" alt="">
              <span>{{item.name}}</span>
            </div>
            <div><span>{{item.ar[0].name}}</span></div>
            <div><span>{{item.dt | GetTime()}}</span></div>
          </li>   
        </div>
    </ul>
  </div>
</template>

<script>
import {playMisic } from '@/network/PlayMisic.js'
// 格式化时间
import { filtrationTime } from '@/assets/js/SongTime.js'
export default {
  props:{
    // 来自用户模块的歌曲数据
    SongData:{
      type:Array,
      default: () => false
    },
    // 来自搜索模块的歌曲数据
     SearchSongData:{
      type:Array,
      default: () => false
    }
  },
  filters:{
    GetTime(val){
     return filtrationTime(val);
    }
  },
  data() {
    return {
      currentShow:null,
    }
  },
  methods:{
  ChangeIsShow(index){
    this.currentShow = index;
  },
  playMusic(id){

    playMisic(id).then(musicdata => {
      // 通过事件总线发送事件并传入数据
    this.$bus.$emit('getMusicMessage',musicdata)
    // 跳转到评论区
     this.$router.push({name:'SongDetails',query: {id:id,data:musicdata}})
    });
    },
  }
}
</script>

<style lang="less" scoped>
.icnColor {
  color: red;
}
.Songli li:hover {
   background-color: rgba(207, 204, 204, 0.5)!important;
}
.Songli li:nth-child(odd) {
  background-color: rgba(231, 228, 228,0.5);
}

.TopSongli,
.Songli li{
  display: flex;
  height: 50px;
  margin: 5px 0;
  border-radius: 5px;
  cursor:pointer;
  div {
   line-height: 50px;
   box-sizing: border-box;
   span {
     font-size: 14px!important;
          // 强制一行
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:1;//以此类推，3行4行直接该数字就好啦
   }
  }

  // 序号和时长
  div:nth-of-type(1),
  div:nth-of-type(5) {
    width: 80px;
    text-align: center;
  }

  // 歌名
  div:nth-of-type(2) {
    flex: 2;
    position: relative;
    img {
      width: 35px;
      height: 35px;
      align-content: center;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 5px;
    }
    span {
      position: absolute;
      left: 40px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  // 歌手
  div:nth-of-type(3) {
    flex: 1.5;
  }
   // 专辑
  div:nth-of-type(4) {
     flex: 2;
  }

}


</style>