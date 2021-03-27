<template>
    <el-row :gutter="10" class="el-row01" style="margin-bottom: 10px">
        <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="3"><div class="grid-content bg-purple"></div></el-col>
        <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="18">
            <div class="grid-content">
                 <slot></slot>
            </div>
        </el-col>
        <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="3"><div class="grid-content"></div></el-col>
    </el-row>
</template>
<script>
export default {
  
}
</script>
<style lang="less" scoped>

</style>