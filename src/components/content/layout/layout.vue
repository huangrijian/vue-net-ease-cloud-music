<template>
    <el-row :gutter="10" class="el-row01" style="margin-bottom: 10px">
        <el-col  :lg="1" :xl="3"><div class="grid-content bg-purple"></div></el-col>
        <el-col  :lg="22" :xl="18">
            <div class="grid-content">
                 <slot></slot>
            </div>
        </el-col>
        <el-col  :sm="1" :md="1" :lg="1" :xl="3"><div class="grid-content adapt"></div></el-col>
    </el-row>
</template>
<script>
export default {
  
}
</script>
<style lang="less" scoped>

</style>