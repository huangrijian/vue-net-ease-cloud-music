# vue_project_music 仿网易云音乐网站

## 后端项目地址 

[Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)

## 线上项目地址 

[vue_project_music 仿网易云音乐网站](http://bao.lqjhome.cn:13008)


## 安装运行
```
$后端
$ git clone https://github.com/Binaryify/NeteaseCloudMusicApi
$ cd NeteaseCloudMusicApi
$ npm install
$ npm start
$ 成功后访问localhost:3000是否正常，正常下一步

$前端
$ git clone https://gitee.com/huang-rijian/vue-net-ease-cloud-music.git
$ cd vue-net-ease-cloud-music
$ npm install
$ npm run serve
```



**技术栈**

- vue 
  -  条件循环、条件判断、组件插槽、传参、事件总线等
- vue-cli 
  -  生成脚手架 
- vue-router  
  - 路由传参、路由守卫等
- axios  
  -  发起ajax网络请求 
- element-ui 
  - 登录验证、各种ui组件、比如分页、加载、输入框、轮播图等等





| 登录 ＋ 首页                                        |                                               |                                               |
| --------------------------------------------------- | --------------------------------------------- | --------------------------------------------- |
| <img src="https://gitee.com/huang-rijian/vue-net-ease-cloud-music/raw/master/img/登录.png"  /> | <img src="https://gitee.com/huang-rijian/vue-net-ease-cloud-music/raw/master/img/首页1.png"  />    | <img src="https://gitee.com/huang-rijian/vue-net-ease-cloud-music/raw/master/img/首页2.png"  />    |
| **排行榜＋详情**                                    |                                               |                                               |
| <img src="https://gitee.com/huang-rijian/vue-net-ease-cloud-music/raw/master/img/%E6%8E%92%E8%A1%8C%E6%A6%9C.png"  />         | <img src="https://gitee.com/huang-rijian/vue-net-ease-cloud-music/raw/master/img/歌单详情.png"  /> | <img src="https://gitee.com/huang-rijian/vue-net-ease-cloud-music/raw/master/img/%E6%AD%8C%E6%9B%B2%E8%AF%A6%E7%BB%86.png"  /> |
| **歌单**                                            |                                               |                                               |
| <img src="https://gitee.com/huang-rijian/vue-net-ease-cloud-music/raw/master/img/歌单1.png"  />          | <img src="https://gitee.com/huang-rijian/vue-net-ease-cloud-music/raw/master/img/歌单2.png"  />    | <img src="https://gitee.com/huang-rijian/vue-net-ease-cloud-music/raw/master/img/歌单分页.png"  /> |
| **搜索+歌手+朋友+个人主页**                         |                                               |                                               |
| <img src="https://gitee.com/huang-rijian/vue-net-ease-cloud-music/raw/master/img/搜索1.png"  />          | <img src="https://gitee.com/huang-rijian/vue-net-ease-cloud-music/raw/master/img/搜索2.png"  />    | <img src="https://gitee.com/huang-rijian/vue-net-ease-cloud-music/raw/master/img/搜索4.png"  />    |
|<img src="https://gitee.com/huang-rijian/vue-net-ease-cloud-music/raw/master/img/歌手2.png"  />          |                                               |                                               |
| <img src="https://gitee.com/huang-rijian/vue-net-ease-cloud-music/raw/master/img/歌手.png"  />           | <img src="https://gitee.com/huang-rijian/vue-net-ease-cloud-music/raw/master/img/朋友.png"  />     | <img src="https://gitee.com/huang-rijian/vue-net-ease-cloud-music/raw/master/img/个人主页.png"  /> |



#### 一点小体会

花了差不多1个月写的vue项目，这是我的第一个项目，刚写的时候还没体会到vue组件化的思想，所有前半个月一直埋头写也没考虑的优化、封装等问题，后半个逐步学习开始试试着去将功能点封装成独立组件，这才有了一点像样的代码结构，但总的来说，这个项目还是有非常多的结构问题，目前还存在代码结构胡乱的问题，所以我会进行更新、重构。作为一名大三学生，这是去年11月开始自学前端以来的第一个项目，我会把它保存好，等到知识更新了继续重构优化以及添加接口实现，当然如果有大佬能指出我的问题，或者一起探讨我会非常乐意，本人企鹅号923691372，欢迎大佬前来指正、探讨技术。


### 难点分析

### 难点一：Vue实现当前组件重新加载

需要把当前组件完全还原成初始化状态，不要页面全部刷新

例如：点击重置按钮，只刷新当前加载组件

其他办法：
使用vue-router重新定向到当前页面，页面不刷新
使用window-reload（） 页面全部刷新，用户体验太差

解决方法：
*使用v-if provide inject和this.$nextTick()【版本限制 vue2.2.0】*

原理：
使用v-if控制router-view的显示或隐藏（v-if会把事件监听器和自组件适当的销毁或者重建）
使用provide / inject组合解决自组件层级比较深的问题
使用this.$nextTick()实现页面异步刷新

provide / inject
就是父组件中使用provide提供变量(对象或者是一个函数),在子组件中通过inject来注入变量
不管层级有多深，并在起上下游关系成立的时间始终生效

this.$nextTick()
当dom发生变化，更新后执行的回调

实际代码：
在App.vue里面，声明reload方法，然后通过provide把reload方法注入，使用bol值控制router-view隐藏（销毁），再通过this.$nextTick()在dom更新之后利用bol控制router-view重新加载，实现页面刷新的效果

```js
<template>
  <div id="app">
    <router-view v-if="isRouterShow"/>
  </div>
</template>
<script>
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterShow: true
    }
  },
  methods: {
    //先隐藏
    this.isRouterShow = false
      this.$nextTick(()=> {
       //当dom发生变化，再次显示，实现组件局部刷新效果
        this.isRouterShow = true
      })
    },
}
</script>
```

在子组件里面
使用inject注入App.vue提供的reload依赖，然后在需要的地方直接调用this.reload()方法即可

```js
export default {
  inject: ['reload'],
  methods: () {
  	reloadFun () {
  		this.reload()//在需要的地方直接调用this.reload()方法即可
  	}
  }
 }
```

### 难点二：SongList.vue歌单页面的实现



```js
歌单页面实现的大体思路：
1.该页面整体分为3个组件：

<song-list-nav>歌单导航

<song-list>歌单展示

<el-pagination>分页


1.在父组件SongList.vue中发网络请求获取数据并保存到data中： 
热门歌单数据
全部歌单数据 
歌单内容数据
	 /*
      *
      * 网络请求相关
      * 
      */ 
    //  获取热门歌单分类
     GetHotPlaylist(){
       GetHotPlaylist().then(res => {
         this.HotPlaylist = res.tags
       })
     },
    // 获取 全部歌单分类 
    GetAllPlaylist(){
      GetAllPlaylist().then(res => {
        this.categories = res.categories//歌单全部分类名称，一个对象
        console.log("歌单全部分类名称",this.categories);
        console.log(res.sub);//全部歌单分类数据
        // 过滤数据
        this.ArrayData = this.FilterData(res.sub)// 过滤数据得到一个二维数组里面装着全部分类数据
         console.log("全部分类数据",this.ArrayData);//全部分类数据 (5) [Array(5), Array(22), 				Array(12), Array(12), Array(18), __ob__: Observer]  
      })
    },
        
    //  获取歌单内容
     GetPlaylistContent(order,cat,limit,offset){
        GetPlaylistContent(order,cat,limit,offset).then(res => {
          this.playlists = res.playlists//获取歌单内容
        })
      },
          
2.调用钩子函数进行页面数据初始化
    mounted() {
      // 展示默认热门歌单分类
      this.GetHotPlaylist();
      // 展示默认歌单数据
      this.GetPlaylistContent(this.order,this.cat,this.limit,this.offset)
      // 展示全部歌单分类
      this.GetAllPlaylist();
    },
          
          
2.页面数据初始化完成：

	1.给子组件（歌单列表分类导航）传值进行页面渲染，然后监听子组件的3个点击事件
    <song-list-nav 
            :tags="HotPlaylist"//热门歌单
            :categories="categories"//歌单全部分类名称
            :ArrayData="ArrayData"//全部分类数据

            @GetSongType="GetSongType"//监听点击热门歌单分类列表
            @GetAllSongType="GetAllSongType"//监听点击全部歌单分类列表
            @GetHotOrNew="GetHotOrNew"////监听点击热门或者最新
    />
    2.给子组件（歌单列表内容）传值进行页面渲染
    <song-list :SongListData="playlists"/>
    
    3.分页组件
     <el-pagination
            background
            layout="prev, pager, next"
            :total="220"
            :key="elementui_page_component_key"
            @current-change="currentChange"
          />
            
/**
   * 监听子组件（歌单列表分类导航）的3个点击事件，当某一个分类被点击了，调用下面3个函数其中之一，
   然后初始化生成相对应的歌单列表
   
   * 获取全部歌单
   * 获取歌单
   * 获取最新或者热门
   * 
   * */ 

   //监听全部歌单分类的点击
   GetAllSongType(data){
    //  data为全部歌单分类中的一个分类
    // 当子组件点击全部歌单分类中的一个分类会把这个分类传过来
    // 再调用 InitializePage 进行歌单内容初始化
     this.InitializePage(data)
     console.log("GetAllSongType",data);
   },
 	
    //监听热门歌单分类的点击
   GetSongType(index){
        // 华语流行摇滚民谣电子另类/独立轻音乐综艺影视原声ACG
        switch(index) {
          case 0: 
            this.InitializePage('华语')
            break;
          case 1:
            this.InitializePage('流行')
            break;
          case 2: 
            this.InitializePage('摇滚')
            break;
          case 3:
            this.InitializePage('民谣')
            break;
          case 4: 
            this.InitializePage('电子')
            break;
          case 5:
            this.InitializePage('另类/独立')
            break;
          case 6: 
            this.InitializePage('轻音乐')
            break;
          case 7:
            this.InitializePage('综艺')
            break;
          case 8: 
            this.InitializePage('影视原声')
            break;
          case 9: 
            this.InitializePage('ACG')
            break;
        }
        
    },

    // 点击热门或最新
  GetHotOrNew(index){
    switch(index){
      case 1:
        this.order = 'hot'
        this.GetPlaylistContent(this.order,this.cat,this.limit,this.offset)
        break;
      case 2:
        this.order = 'new'
        this.GetPlaylistContent(this.order,this.cat,this.limit,this.offset)
        break;
    }
  },
      // 初始化歌单分类数据（提供给监听点击全部歌单和热门歌曲这两个函数使用的）
      InitializePage(cat){
        this.cat = cat;//cat就是歌单分类名称
        this.offset = 0;//偏移量---用于分
         //调用该函数发起获取歌单内容的网络请求
        this.GetPlaylistContent(this.order,this.cat,this.limit,this.offset)
      },
        

          
    /*
    *
    *	分页相关方法
    *
    */      
    //  当前页数改变
      currentChange(currentPage){
          //currentPage为当前页数
       this.offset = (currentPage-1) * 60
       this.GetPlaylistContent(this.order,this.cat,this.limit,this.offset)
      },

```

### 难点三：下拉刷新评论列表

```js
SongDetails.vue

data() {
    return {
        ...
        Songid:this.$route.query.id,
         // 默认偏移量
            offset:0,
        ...
    }
}

// 引入监听下拉的js文件
import { getDocumentTop,getWindowHeight, getScrollHeight } from '@/assets/js/downLoad.js'

 created(){
     //初始化评论内容
       this.getAllComment(this.Songid,this.offset);
      //  添加下拉监听事件函数
       window.addEventListener( 'scroll', this.scrollHander)
},

 methods: {
       //下拉加载事件内容
     scrollHander(){
     if (getScrollHeight() == getWindowHeight() + getDocumentTop()) {
        this.loading = true
        //当滚动条到底时,这里是触发获取评论的函数
          this.getAllComment(this.Songid,this.offset);
        }
     },
         
       // 获取全部评论 
        async getAllComment(Songid, offset){
            const result = await this.$http.get("/comment/music?id="+ Songid +'&limit=50&offset='+ offset);
            this.total = result.data.total
            // 解构对象
            this.AllComments.push(...result.data.comments)
            this.offset += 50
            //解除下拉动画
            this.loading = false
        },
}


```



### 难点四：歌曲数据与音乐组件的通讯(事件总线)

```js
main.js
....
// 注册事件总线
Vue.prototype.$bus = new Vue()
....
```



```html
home.vue
<!-- latestsong 是通过网络请求获取到的音乐数据 -->
<!-- 推荐新歌 -->
<li :key="index" v-for="(item,index) in latestsong" @mouseover="showdiv(index + 1 )"  @click="playSong(item.id)">
    .....
</li>
```

```js
 // 播放音乐
  playSong(id){
    //发起请求获取歌曲数据
    playMisic(id).then(musicdata => {
      // 通过事件总线把歌曲数据传给跟组件
      this.$bus.$emit('getMusicMessage',{musicdata,id})
      // 路由跳转到歌曲详情（评论区）并携带相关参数
      this.$router.push({name:'SongDetails',query: {id:id,data:musicdata}})
    });
  },

```

```js
App.vue

<!--music：当前播放的音乐。 list：播放列表 ：showlrc：是否显示歌词-->
       <aplayer :music="audio[0]" :showLrc="true" :autoplay="true"  id="play" class="Aplayer"/>

data() {
    return {
		....
      // 音频数据存放在次
      audio:  [{  }],
        ....
	}
}

created(){
    // 接收音乐数据
    this.$bus.$on('getMusicMessage', (val) => {
   		...
      //  用一个data对象接收获取得到的音乐数据 
        var data = {
            src: val.musicdata.playUrl,
            title:val.musicdata.picname,
            artist:val.musicdata.Singer,
            pic:val.musicdata.picUrl,
            lrc: val.musicdata.lyric,
        }
     ...

        // 把接收到的音乐数据添加到audio[0]中  令播放组件获取数据后进入待播放
        this.$set(this.audio,0,data);
    })
  },
```

### 难点六：登录后个人信息的缓存(刷新不丢失数据)

#### 用到的技术：

1.父子组件传参props/$emit

2.window.sessionStorage.setItem('userToken', token);设置sessionStorage对象的数据

window.sessionStorage.getItem("userToken");获取sessionStorage对象的数据

3.element ui 表单验证

#### 实现过程

1.login.vue中发起登录请求，等到用户数据后通过window.sessionStorage.setItem存储相关的用户信息

2.然后通过  this.$emit('getUserid', this.id); 把id给父组件（app.vue),然后跳转到home.vue

3.app.vue再把id给自己的子组件nav-bar

4.nav-bar中通过props接收id,使用  watch: {
    // 接收传来的UserId触发监听器
      UserId: function () {       
        this.getUserDetails();
        this.judgelogin();
      }
    },监听id变化

然后调用getUserDetails();获取用户详细信息，再存储到sessionStorage，

通过judgelogin();判断有无登录，有则显示头像和个人中心，没有就不显示

当页面被刷新 调用 this.showMsg(window.sessionStorage.getItem("UserId"));

// 刷新后防止头像数据丢失
      showMsg (val) {   
        this.UserId = val;
        // UserId更新后又会触发监听器watch: 函数
      },

防止数据丢失

```JS
login.vue

methods: {
    login() {
          this.$refs.loginFormRef.validate(async (valid) => {
            //    表单预验证，通过则valid返回true
            if (!valid) return;
              //获取输入框的信息发起登录请求
            const result = await this.$http.get("/login/cellphone?phone=" + this.ruleForm.phone + "&password=" + this.ruleForm.password);
            if (result.data.code == 502) {
              return this.$message.error("密码错误，请重新输入！");
            }
            if(result.data.code == 200){
              this.$message.success("登录成功！");
              // 保存用户id
              this.id = result.data.account.id;
              // 获取后端返回的token
              var token = result.data.token;

               //存放userTokenb 到sessionStorage
              window.sessionStorage.setItem('userToken', token);
              //存放userid 到sessionStorage
              window.sessionStorage.setItem('UserId', this.id);

              // 保存 cookie (大部分需要登录的接口都要用到)
              var cookie = result.data.cookie
              // 存放cookie 到sessionStorage
              window.sessionStorage.setItem('cookie', cookie);
            }else return this.$message.error("登录失败");

            // 跳转到首页
            this.$router.push('/home')
            //把用户id传给APP.vue
            this.$emit('getUserid', this.id);
          })    
        },
}
```

```HTML
APP.vue

   <!-- 导航栏 -->
	 <!-- 再次传给导航组件  -->
      <nav-bar :UserId="Uid" @ClickSearch="ClickSearch"></nav-bar>

<router-view @getUserid="UserId"  v-if="isRouterShow"></router-view>

    // 将登录后传入的用户id进行存储
    UserId(val){
      this.Uid = val;
    },
```

```js
NavBar.vue

props:['UserId'],
    
 watch: {
    // 接收传来的UserId触发监听器
      UserId: function () {       
        this.getUserDetails();
        this.judgelogin();
      }
    },

  methods:{
        // 获取用户详情
  async getUserDetails(){
        const result = await this.$http.get("/user/detail?uid=" + this.UserId);
        if (result.status !== 200) {
          return this.$message.error("获取用户信息失败！");
        }
        // 获取用户详情
        console.log(result.data);
       if(result.data.code !== 400){
       // 保存头像地址
        this.avatarUrls = result.data.profile.avatarUrl;
        // 保存在本地
       window.sessionStorage.setItem('avatarUrls', this.avatarUrls);
        // 保存昵称
        this.nickname = result.data.profile.nickname
        // 保存用户id值
        this.Userid = result.data.profile.Userid
       } else return

  },

  // 根据token值判断当前页面是否登录了，如果登录则显示头像 隐藏'登录‘    
  judgelogin(){
      var userToken = window.sessionStorage.getItem("userToken");
      if(userToken) {
        // 显示头像
        this.dialogFlag = true
        // 隐藏登录
        this.islogin = false
      }
    }, 	  
      
  }

    // 刷新后防止头像数据丢失
      showMsg (val) {   
        this.UserId = val;
        // UserId更新后又会触发监听器watch: 函数
      },
          
          
    // 生命周期函数  页面刷新(重新渲染)时调用
  mounted() {
     this.showMsg(window.sessionStorage.getItem("UserId"));
      
  },        
```



### 难点七 ....