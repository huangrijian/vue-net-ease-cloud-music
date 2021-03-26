<template>
    <div>
             <!-- 导航栏 -->
    <el-row :gutter="10" class="el-row01" style="margin-bottom: 20px">
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3"><div class="grid-content bg-purple"></div></el-col>
        <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="18">
            <div class="grid-content homenav">
                <!-- 按钮层 -->
              <div>
                  <!-- 第一层 语言-->
                  <div>
                       <div class="btn" :class="{btnActive:languageflag == index}" @click="languageStyle(index,item)"  :key="index" v-for="(item,index) in language">{{item}}</div>
                  </div>
                   <!-- 第二层 -->
                  <div>
                       <div class="btn" :class="{btnActive:typeflag == index}" @click="typeStyle(index,item)" :key="index" v-for="(item,index) in type">{{item}}</div>
                  </div>
                   <!-- 第三层 -->
                  <div>
                       <div class="btn" :class="{btnActive:alphabetflag == index}" @click="alphabetStyle(index,item)" :key="index" v-for="(item,index) in alphabet">{{item}}</div>
                  </div>
              </div>
            </div>
            </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3"><div class="grid-content"></div></el-col>
    </el-row>
    <router-view :currentlanguage="currentlanguage" :currenttype="currenttype" :currentalphabet="currentalphabet"></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {
            language:['全部','华语','欧美','日本','韩国','其他'],
            type:['全部','男歌手','女歌手','乐队'],
            alphabet:['热门','A','B','C','D','E','F','G',
                      'H','I','J','K','L','N','M','O','P','Q','R','S','T','U','V','W','X','Y','Z'
            ],
            // 默认第一个被选中
            languageflag:0,
            typeflag:0,
            alphabetflag:0,

            // 当前选择的歌手类型
            currentlanguage:'',
            currenttype:'',
            currentalphabet:'',

            // 需要传给子路由的数组
            dataAarry:[]
        }
    },
    methods: {

        // 点击改变样式
        languageStyle(index,item){
         this.languageflag = index;
         this.currentlanguage = item;
        },
        typeStyle(index,item){
            this.typeflag = index;
            this.currenttype = item;
        },
        alphabetStyle(index,item){
            this.alphabetflag = index;
            this.currentalphabet = item;
        },

    },
    mounted() {

    },
}
</script>
<style lang="less" scoped>
// 按钮样式
.btn {
    display: inline-block;
    width: 70px;
    height: 32px;
    // background: #ff0000;
    border:1px solid  #e6e6e6;
    border-radius: 24px;
    line-height: 32px;
    text-align: center;
    font-weight: 600;
    // color: whitesmoke;
    font-size: 14px;
    margin: 15px;
}
.btnActive {
    background: #ff0000;
    color: whitesmoke;
}
</style>