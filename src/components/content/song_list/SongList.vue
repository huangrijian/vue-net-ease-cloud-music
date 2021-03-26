<template>
     <el-row :gutter="10" class="el-row01">
        <el-col :xs="1" :sm="3" :md="4" :lg="3" :xl="3"><div class="grid-content"></div></el-col>
        <el-col :xs="22" :sm="18" :md="16" :lg="18" :xl="18">
            <div class="grid-content">
              <h2>{{title}}</h2>
              <ul class="rankingUl">
                 <slot name="songlist"></slot>
              </ul>
            </div>
            </el-col>
        <el-col :xs="1" :sm="3" :md="4" :lg="3" :xl="3"><div class="grid-content"></div></el-col>
    </el-row>
</template>
<script>
export default {
  props:['title']
}
</script>
<style lang="less">
.rankingUl {
  width: 100%;
  li {
    float: left;
    width: 10%;
    margin-top: 15px;
  }
  img{
    width: 100px;
    border-radius: 10px;
}
}

  // 榜单名称
  .rankingUl>li>div {
    width: 100px;
    font-size: 12px;
    transform: translateX(30%);
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

</style>