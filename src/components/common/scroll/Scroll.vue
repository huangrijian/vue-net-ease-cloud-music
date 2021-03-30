<template>
<!-- ref="wrapper" 用于获取元素 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>  
</template>
<script>
// 引入 better-scroll
  import BScroll from 'better-scroll'

export default {
  props:{
    // 由传入的值绝对是否监听滚动位置
    probeType:{
      type:Number,
      // 默认不监听
      default:0
    },
    // 监听上拉加载
    PullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      scroll:null
    }
  },
  methods: {
    // 返回顶部
    scrollTo(x, y, time = 500){
      this.scroll.scrollTo(x, y, time);
    },
    // 再次更新上拉加载
    finishPullUp(){
      this.scroll.finishPullUp();
    },
    
    refresh(){
      this.scroll.refresh();
    }
  },
  // DOM加载完成调用的钩子函数
  mounted(){
    // 创建BScroll对象
    this.scroll = new BScroll (this.$refs.wrapper,{
      // better-scroll 默认会把点击禁用，所以再次放开点击
      click:true,
      probeType:this.probeType,//0,1,不监听   2 -> 只监听手指位置（不包括滑动惯性） 3 -> 监听滚动包括惯性
      pullUpLoad: this.PullUpLoad,
      mouseWheel: true
    })
    // 监听滚动位置
    this.scroll.on('scroll',(position) => {
      // 向父组件emit一个自定义事件,并把position传过去
      this.$emit('ShowTop',position);
    })
    // 监听上拉加载更多
    this.scroll.on("pullingUp", () => {
      this.$emit("pullUp");
    });
      // 重新更新滚动行为
     this.scroll.refresh(); 
  },
  // 数据更新时调用的钩子函数
  updated(){
    // 重新更新滚动行为
     this.scroll.refresh();
  }
}
</script>
<style lang="less" scoped>

</style>