<template>
  <div class="SingerList" style="dispaly:block">
      <div class="SingerListLi" :key="index" v-for="(item,index) in artists" @click="GoToMVdetails(item.id)">
          <img :src="item.cover" alt="">
          <span>{{item.name}}</span>
      </div>
  </div>
</template>
<script>
export default {
  props:{
    artists:{
      type:Array,
      default :() => []
    }
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