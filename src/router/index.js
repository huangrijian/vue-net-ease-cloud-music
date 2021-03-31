import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from "element-ui";

// 登录
import login from '@/views/login/login.vue'
// 家
import home from '@/views/home/home.vue'

// 用户
import user from '@/views/user/user.vue'

// 排行榜
import ranking from '@/views/ranking/ranking.vue'
// 排行榜细节
import rankingdetails from '@/views/ranking/rankingdetails.vue'


// 歌手
import Singer from '@/views/singer/Singer.vue'
// 歌手子路由 -> 歌手列表
import Singerlist from '@/views/singer/Singerlist.vue'
// 艺人详情页组件
import SingerDetails from '@/views/singer/SingerDetails.vue'

// 艺人详情页组件子路由 -> 艺人介绍
import artistMessage from '@/views/singer/artist/artistMessage.vue'
// 艺人详情页组件子路由 -> 艺人热门作品
import hotworks from '@/views/singer/artist/hotworks.vue'
// 艺人详情页组件子路由 -> 艺人所有专辑
import allAlbum from '@/views/singer/artist/allAlbum.vue'
// 艺人详情页组件子路由 -> 艺人所有MV
import allMV from '@/views/singer/artist/allMV.vue'


// MV
import MV from '@/views/MVList/MV.vue'
// 歌单
import SongList from '@/views/songlist/SongList.vue'

// MV子路由 -> MV列表
import MVList from '@/views/MVList/MVList.vue'
// MV子路由 -> MV列表子路由 -> MV详情页面
import MVdetails from '@/views/MVList/MVdetails.vue'

// 搜索
import search from '@/views/search/search.vue'
// 搜索子路由
import searchDetails from '@/views/search/searchDetails.vue'

// 歌曲详情
import SongDetails from '@/views/Song/SongDetails.vue'

// 朋友
import friend from '@/views/friend/friend.vue'

// 全局使用路由
Vue.use(VueRouter)
    // 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}



const routes = [{
        path: '/',
        redirect: '/home'
    }, //路由重定向
    {
        path: '/SingerDetails',
        redirect: '/home'
    }, //路由重定向
    // 排行榜
    {
        path: '/ranking',
        component: ranking,
        meta: { keepAlive: true, title: "排行榜" },
    },
    // 排行榜细节
    {
        path: '/rankingdetails/:id',
        component: rankingdetails,
        meta: {
            title: '歌单详情'
        }
    },
    // 登录
    {
        path: '/login',
        component: login,
        name: 'login',
        meta: {
            title: '登录'
        }
    },
    // 家
    {
        path: '/home',
        name: 'home',
        component: home,
        meta: {
            title: '首页'
        }
    },
    {
        path: '/SongDetails',
        name: 'SongDetails',
        component: SongDetails,
        meta: {
            title: '歌曲详情'
        }
    },
    // 歌单
    {
        path: '/SongList',
        component: SongList,
        meta: {
            title: '歌单'
        }
    },
    // 歌手
    {
        path: '/Singer',
        component: Singer,
        redirect: '/Singer/Singerlist',
        meta: {
            title: '歌手列表'
        },
        // 歌手子路由  -> 歌手列表
        children: [{
            path: 'Singerlist',
            component: Singerlist,
            meta: {
                title: '歌手列表'
            }

        }, ]
    },
    // 搜索
    {
        path: '/search',
        component: search,
        name: 'search',
        redirect: '/search/searchDetails',
        meta: {
            title: '搜索'
        },
        children: [{
            path: 'searchDetails',
            component: searchDetails,
            meta: {
                title: '搜索'
            }
        }, ]
    },
    {
        path: '/friend',
        component: friend,
        name: 'friend',
        meta: {
            title: '朋友'
        }
    },
    // MV
    {
        path: '/MV',
        component: MV,
        redirect: '/MV/MVList',
        meta: {
            title: 'MV'
        },
        // 歌手子路由  -> 歌手列表
        children: [{
            path: 'MVList',
            component: MVList,
            meta: {
                title: 'MV'
            }
        }, ]
    },
    // MV详情
    {

        path: '/MV/MVList/MVdetails/:id',
        // 定义组件名称
        name: 'MVdetails',
        component: MVdetails,
        meta: {
            title: 'MV详情'
        }


    },
    // 用户详情
    {
        path: '/user/:userdetailid',
        component: user,
        meta: {
            title: '用户详情'
        }

    },
    {
        path: '/SingerDetails/:id',
        component: SingerDetails,
        redirect: '/SingerDetails/:id/hotworks/:id',
        children: [
            // 歌手介绍
            {
                path: 'artistMessage/:SingerId',
                component: artistMessage,
                meta: {
                    title: '歌手介绍'
                }
            },
            // 热门作品
            {
                path: 'hotworks/:SingerId',
                component: hotworks,
                meta: {
                    title: '热门作品'
                }
            },
            // 所有专辑
            {
                path: 'allAlbum/:SingerId',
                component: allAlbum,
                meta: {
                    title: '所有专辑'
                }
            },
            // 所有MV
            {
                path: 'allMV/:SingerId',
                component: allMV,
                meta: {
                    title: '所有MV'
                }
            }

        ]
    }
]

const router = new VueRouter({
    routes,
})

// 在路由跳转之前提交路由导航守卫
router.beforeEach((to, from, next) => {

    let userToken = window.sessionStorage.getItem("userToken")
    if (to.name == 'friend' && !userToken) {
        Message.warning("请登录后再操作")
        next({ name: 'login' })
    }

    document.title = to.matched[0].meta.title;
    next();
})



export default router