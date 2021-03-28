<template>
  <div class="SongListNav">
      <ul>
        <li class="all"  @click="show = !show">全部 <i class="My-new-iconbianji"></i></li>
        <li class="HotLaybel">热门标签：</li>
        <li :key="index" v-for="(item,index) in tags"
         @click="ChangeColor(index)" 
         :class="{activeColor: index === currentItim}">
         {{item.name}}
        </li>
        <li class="LastListHot"><span class="hot" :class="{activeBackgroundColor: 1 == currentRightItim}" @click="(ChangerRightColor(1))"><i class="My-new-iconhuore"></i>热门</span></li>
        <li class="LastListNew"><span class="new" :class="{activeBackgroundColor: 2 == currentRightItim}" @click="(ChangerRightColor(2))"><i class="My-new-iconshuaxin"></i>最新</span></li>
      </ul>

      <div class="unfold">
        <transition name="el-fade-in-linear">
          <div v-show="show" class="transition-box">
            <!-- 
              两层循环嵌套  外层循环是 ArrayData 就是 一级分类 比如语言、情感
                            外层循环是 ArrayData的item项  就是 一级分类下的二级分类 比如语言里面的 类别
             -->
            <div class="transition-box-box" :key="index" v-for="(item,index) in ArrayData">
              <div class="transition-box-box-top">
                <i :class="Myicon[index]"></i>{{categories[index]}}
              </div>
              <div class="transition-box-box-bottom">
                <span :key="index" v-for="(item,index) in item"
                :class="{activeBackgroundColor:item.name == currentAllItem}"
                @click="ChangeData(item.name)"
                >{{item.name}}</span>
              </div>
            </div>

          </div>
        </transition>
      </div>

  </div>
</template>
<script>
export default {
  props:{
    // 热门歌单标签
    tags:{
      type:Array,
      default(){
        return []
      }
    },
    // 全部歌单分类的名称
    categories:{
      type:Object,
      default(){
        return {}
      }
    },
    // 具体歌单分类
    ArrayData:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      currentItim:'',
      currentRightItim:1,

      // 所有分类
      currentAllItem:'',
      show:false,
// My-new-iconbianji1
      // 图标数组
      Myicon:[
        'My-new-iconyuyan',
        'My-new-iconhuangguan',
        'My-new-iconyouxi',
        'My-new-iconyaoqing',
        'My-new-iconliangdu',
      ]
    }
  },
  methods: {
    ChangeColor(index){
      this.currentItim = index;
      this.$emit("GetSongType",index)
    },
    ChangerRightColor(index){
      console.log(index);
      this.currentRightItim = index;
      this.$emit("GetHotOrNew",index)
    },
    ChangeData(data){
      this.currentItim = null;
      this.currentAllItem = data;
      this.show = false;
      this.$emit("GetAllSongType",data)
    }
  },
}
</script>

<style lang="less" scoped>
.SongListNav {
  position: relative;
}
ul {
  border-radius: 5px;
  height: 40px;
  background-color: rgb(254, 254, 255);
  line-height: 40px;
  font-size: 14px;
}
.HotLaybel {
  padding-right: 0px;
}
ul li{
  float: left;
  padding: 0px 15px;
}
.all {
  color: #fff;
  border-radius: 5px;
  padding: 0 25px;
  background-color: rgb(236, 28, 28);
      // 鼠标小手
  cursor:pointer;
}
.LastListHot,
.LastListNew{
  float:right;
  span {
    background-color: rgb(235, 235, 235);
    padding: 5px 8px;
    color: #fff;
    border-radius: 3px;
  }
}
.activeBackgroundColor {
  background: rgb(236, 28, 28)!important;
  color: #fff;
}
.activeColor {
  color: rgb(236, 28, 28);
}

// 点击显示
.transition-box {
    margin-bottom: 10px;
    width: 700px;
    height: 400px;
    border-radius: 4px;
    background-color: #fff;
    padding: 20px;
    box-sizing: border-box;
    margin-right: 20px;
    box-shadow: 0 5px 40px -1px rgba(2,10,18,.1);
    overflow-x: hidden;
    overflow-y: scroll;
    .transition-box-box {
      margin-bottom: 20px;
    }
    .transition-box-box-top {
      margin-bottom: 10px;
      font-weight: 600;
      font-size: 14px;
      i {
        margin-right: 5px;
      }
    }
    .transition-box-box-bottom {
      margin-left: -10px;
      span {
        padding: 6px 15px;
        background-color: #ebebeb;
        border-radius: 30px;
        margin: 5px 10px;
        display: inline-block;
        font-size: 12px;
      }
    }
  }
  .transition-box-box-bottom span:hover {
    background-color: rgb(236, 28, 28);
    color: #fff;
    // 鼠标小手
    cursor:pointer;
  }


  .unfold {
    position: absolute;
    top: 50px;
    z-index: 10;
    ul li {
      color: #000;
    }
  }
</style>