<template>
  <div>
    <ul>
        <li class="TopSongli" style="color:rgb(100, 100, 100)">
          <div>序号</div>
          <div>歌曲</div>
          <div>歌手</div>
          <div>专辑</div>
          <div>时长</div>
        </li>

        <div class="Songli">
            <slot name="songli">
            </slot>    
        </div>
       
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>

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
    flex: 2;
  }
   // 专辑
  div:nth-of-type(4) {
     flex: 2;
  }

}


</style>