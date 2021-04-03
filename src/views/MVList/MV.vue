<template>
    <div>
      <layout>
        <div>
            <!-- 第一层 语言-->
            <div>
                  <div class="btn" :class="{btnActive:areaflag == index}" @click="languageStyle(index,item)"  :key="index" v-for="(item,index) in area">{{item}}</div>
            </div>
              <!-- 第二层 -->
            <div>
                  <div class="btn" :class="{btnActive:typeflag == index}" @click="typeStyle(index,item)" :key="index" v-for="(item,index) in type">{{item}}</div>
            </div>
              <!-- 第三层 -->
            <div>
                  <div class="btn" :class="{btnActive:orderflag == index}" @click="alphabetStyle(index,item)" :key="index" v-for="(item,index) in order">{{item}}</div>
            </div>
        </div>
      </layout>
    <router-view :currentarea="currentarea" :currenttype="currenttype" :currentorder="currentorder"></router-view>
    </div>
</template>
<script>
import layout from '../../components/content/layout/layout.vue';
export default {
  components: { layout },
    data() {
        return {
            area:['全部','内地','港台','欧美','韩国','日本'],
            type:['全部','官方版','原生','现场版','网易出品'],
            order:['上升最快','最热','最新',],
            // 默认第一个被选中
            areaflag:0,
            typeflag:0,
            orderflag:0,

            // 当前选择的歌手类型
            currentarea:[],
            currenttype:[],
            currentorder:[],

        }
    },
    methods: {
        languageStyle(index,item){
            // 改样式 存数值
         this.areaflag = index;
         this.currentarea = item;
        },
        typeStyle(index,item){
            this.typeflag = index;
            this.currenttype = item;
        },
        alphabetStyle(index,item){
            this.orderflag = index;
            this.currentorder = item;
        },

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
       // 鼠标小手
   cursor:pointer;
}
.btnActive {
    background: #ff0000;
    color: whitesmoke;
}
</style>