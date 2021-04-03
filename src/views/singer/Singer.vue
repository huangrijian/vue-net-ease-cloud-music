<template>
    <div>
      <layout>
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
      </layout>     
    <router-view :currentlanguage="currentlanguage" :currenttype="currenttype" :currentalphabet="currentalphabet"></router-view>
    </div>
</template>
<script>
import layout from '../../components/content/layout/layout.vue';
export default {
  components: { layout },
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
    cursor:pointer;
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