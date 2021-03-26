<template>
   <footer>
    <div class="dd">
      <div class="ddson">
        <div class="ddicon"></div>
        <span class="top">岁月很长，人海茫茫，别回头也别将就，自然会有良人来爱你。</span>
      </div>
      <span class="bottom">版权所有©2012-2020 由小健1024设计。</span>
    </div>
  </footer>
</template>

<script>
export default {
  
}
</script>

<style lang="less" scoped>

  footer {
    margin-top: 50px;
    width: 100%;
    height: 190px;
    background-color:#161e27;
    color: #161e27;

    .dd {
      position: relative;
      width: 80%;
      height: 100%;
      margin:0 auto;
      .bottom {
        position:absolute;
        bottom: 0px;
        color: rgba(255, 255, 255,0.3);
        font-size: 12px;
        padding:15px 0;
      }

      .ddson {
        position:absolute;
        top: 25px;
      }

      .top {
        font-size: 14px;
        color: rgba(255, 255, 255,0.6);
      }
      .ddicon {
        display: inline-block;
        width: 3px;
        height: 15px;
        background: red;
        margin-right: 10px;
      }
    }
    
  }
</style>