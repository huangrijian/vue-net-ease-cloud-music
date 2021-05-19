import Vue from 'vue'
import Vuex from 'vuex'
import { setSessionStorageItem, getSessionStorageItem } from '@/Storage/storage'

const MUSICDATA = "MUSICDATA"//当前播放的歌曲数据（封面，标题，歌手名称）

const USERID = "USERID"
const USERTOKEN = "USERTOKEN"
const COOKIE = "COOKIE"
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    musicData:getSessionStorageItem(MUSICDATA),
    userId:getSessionStorageItem(USERID),
    userToken:getSessionStorageItem(USERTOKEN),
    cookie:getSessionStorageItem(COOKIE),
  },
  // 同步用mutations
  mutations: {
    // 方法
    setMusicData(state,data){
      state.musicData = data // 保存userToken
      setSessionStorageItem(MUSICDATA,data) // 调用函数用sessionStorage将userToken持久化
    },
    setUserId(state,data){
      state.userId = data
      setSessionStorageItem(USERID,data)
    },
    setUserToken(state,data){
      state.userToken = data
      setSessionStorageItem(USERTOKEN,data)
    },
    setCookie(state,data){
      state.cookie = data
      setSessionStorageItem(COOKIE,data)
    },

  },
  // 异步用actions
  actions: {

  },
  getters: {

  },
  modules: {
    
  }
})

export default store