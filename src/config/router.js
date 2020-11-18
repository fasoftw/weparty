import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/home/Home'
import Games from '../components/admin/Main.vue'
import NewGames from '../components/admin/AdminPages.vue'
import NewArticles from '../components/admin/news/Articles.vue'
import SignUp from '../components/user/SignUp'
import SignIn from '../components/user/SignIn'
import Profile from '../components/user/Profile'
import News from '../components/navigation/News'
import PostDetail from '../components/navigation/blog/PostDetail'
import About from '../components/navigation/About'
import Dashboard from '../components/dashboard/Main'
import NewParty from '../components/dashboard/NewParty'
import GameProfile from '../components/dashboard/gameProfile/GameProfile'

import {userKey} from '../../global'

Vue.use(VueRouter)

const routes = [{
    name:'home',
    path: '/',
    component: Home
},{
    name: 'admin',
    path: '/admin',
    component: Games,    
    children: [{
          path: 'articles',
          name: 'Articles',
          component: NewArticles
        }, {
          path: 'games',
          name: 'Games',
          component: NewGames
        }]
    }
  
,{
    name:'signup',
    path: '/signup',
    component: SignUp
},{
    name: 'signin',
    path: '/signin',
    component: SignIn
},{
    name: 'profile',
    path: '/profile',
    component: Profile,
    meta: {
        requiresAuth: true
    }
},{
    name: 'news',
    path: '/news',
    component: News
},
{ 
    path: '/post/:id', 
    component: PostDetail },
{
    name: 'about',
    path: '/about',
    component: About
},
  {
    name: 'dashboard',
    path:'/dashboard',
    component: Dashboard
  },
  {
    name: 'gameProfile',
    path:'/gameProfile',
    component: GameProfile
  },{
    name: 'newParty',
    path:'/newParty',
    component: NewParty
  }
  
]

 

const router = new VueRouter({
    mode: 'history',
    routes: routes
})


router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)
 
    if(to.matched.some(record => record.meta.requiresAdmin)) {
        const user = JSON.parse(json)
        user && user.admin ? next() : next({ path: '/' })
    } else if(to.matched.some(record => record.meta.requiresAuth)) {

        console.log(localStorage.getItem(userKey));

        if (localStorage.getItem(userKey) == null) {

            next({
                path: '/',
                params: { nextUrl: to.fullPath }
            })
        } else{
            next()
        }
    }
    else {
        next()
    }
})
export default router;