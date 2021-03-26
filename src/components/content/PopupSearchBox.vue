<template>
      <!-- 弹出搜索框 -->
<el-dialog
  title="珍惜所有的不期而遇，看淡所有的不辞而别。"
  :visible.sync="dialogVisible"
  width="30%"
  :destroy-on-close="flag"
  custom-class="dialogBox">
  <el-input prefix-icon="el-icon-search" v-model="input" placeholder="请输入关键词并按下回车键"  @change="GotosearchDetails(input)" clearable></el-input>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
export default {
    data() {
      return {
        //弹出框相关变量
        dialogVisible: true,
        input:'',
        flag:true,
      }
    },
    methods: {
         //  搜索弹框处理函数 
  GotosearchDetails(keyword){

      // 跳转路由并把关键词传过去
       this.$router.push({name:'search',query: {key:keyword}});
      //  清空输入框内容
      this.input = ''
       
  }
    },
}
</script>

<style lang="less" scoped>
// 弹出框
.el-dialog {
background: url('~@/assets/img/bj88.jpg')!important;
background-size: 100%!important;
width: 920px!important;
height: 468px;
filter:(2px)!important;
}
.el-input__inner {
  width: 100px;
  height: 60px!important;
   background-color:rgba(233, 233, 233, 0.2)!important;
   color: #fff!important;
   font-size: 16px!important;
}
.el-dialog__title {
  margin: 0 auto!important;
  color: #fff!important;
}
.dialog-footer {
  display: none!important;
}
</style>