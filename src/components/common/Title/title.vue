<template>
    <div class="grid-content-tit">
      <div class="TitSpan" v-if="flag"></div>
      <span>{{title}}</span>
    </div>
</template>
<script>
export default {
  props:{
      title:{
        type: String,
        default(){
          return null
        }
      },
  },
  computed:{
    flag(){
      if(this.title) return true
      return false
    }
  }
}

</script>
<style lang="less" scoped>
.grid-content-tit {
  display: flex;
  margin-bottom: 5px;
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
