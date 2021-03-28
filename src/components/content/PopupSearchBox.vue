<template>
  <div>
    <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button> -->
    
  </div>
</template>
<script>

  export default {
    props:{
      ClickSearch: {
        type:Boolean,
        default:false
      } 
    },
    data() {
      return {
        dialogVisible: false
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  };
</script>