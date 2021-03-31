<template>
  <div class="grid-content">
    <div class="grid-content-tit">
      <div class="TitSpan"></div>
      <span>{{title}}</span>
    </div>

     <ul class="rankingUl">
       <slot name="songlist"></slot>
     </ul>

  </div>
</template>
<script>
export default {
  props:['title']
}
</script>
<style lang="less">
.rankingUl {
  width: 100%;
  display: flex;
  flex-wrap:wrap;
  li {
    width: 10%;
    margin-top: 15px;
  }
  img{
    width: 100px;
    border-radius: 10px;
    box-shadow: 6px 6px 3px -1px rgba(37, 37, 37, 0.3);
}
}

  // 榜单名称
  .rankingUl>li>div {
    width: 100px;
    font-size: 12px;
    transform: translateX(5%);
  }
  .rankingNameglobal {
    width: 95px;
    font-size: 12px;
    transform: translateX(15%);
     // 强制一行
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:1;//以此类推，3行4行直接该数字就好啦
  }
.grid-content-tit {
  display: flex;
  margin-bottom: 10px;
  // 垂直居中
  align-items: center;
  span {
    font-size: 18px;
    font-weight: 600;
  }
  .TitSpan{
      width: 3px;
      height: 20px;
      background-color: red;
      margin-right: 7px;
  }
}

</style>