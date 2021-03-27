<template>
  <div>
      <ul>
        <li class="all">全部  ↓</li>
        <li class="HotLaybel">热门标签：</li>
        <li :key="index" v-for="(item,index) in tags"
         @click="ChangeColor(index)" 
         :class="{activeColor: index === currentItim}">
         {{item.name}}
        </li>
        <li class="LastListHot"><span class="hot" :class="{activeBackgroundColor: 1 == currentRightItim}" @click="(ChangerRightColor(1))">热门</span></li>
        <li class="LastListNew"><span class="new" :class="{activeBackgroundColor: 2 == currentRightItim}" @click="(ChangerRightColor(2))">最新</span></li>
      </ul>
    
  </div>
</template>
<script>
export default {
  props:{
    tags:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      currentItim:'',
      currentRightItim:1
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
  },
}
</script>

<style lang="less" scoped>
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
}
.activeColor {
  color: rgb(236, 28, 28);
}
</style>