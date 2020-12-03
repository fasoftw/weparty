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
import Recommendations from '../components/dashboard/recommendation/Recommendations'
import NewParty from '../components/dashboard/party/NewParty'
import MyParties from '../components/dashboard/party/MyParties'
import GameProfile from '../components/dashboard/gameProfile/GameProfile'
import PartyGame from '../components/dashboard/PartyGame'

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
    meta: {
        requiresAdmin: true
    },   
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
    component: News,
    meta: {
        requiresAuth: true
    }
},
{ 
    path: '/post/:id', 
    component: PostDetail,
    meta: {
        requiresAuth: true
    }
},
{
    name: 'about',
    path: '/about',
    component: About,
    meta: {
        requiresAuth: true
    }
},{
    name: 'dashboard',
    path: '/dashboard',
    component: Dashboard, 
    meta: {
        requiresAuth: true
    },   
    children: [
        {
          path: 'party',
          name: 'Party',
          component: NewParty
        }, 
        {
            path: 'edit/:party',
            name: 'EditParty',
            component: NewParty
        }, 
        {
            path: 'party/view',
            name: 'MyParties',
            component: MyParties
        }, 
        {
          path: 'game/profile',
          name: 'Profile',
          component: GameProfile
        },
        {
            path: '',
            name: 'Recommendations',
            component: Recommendations
        }]
    }  
,{
    name: 'PartyGameId',
    path:'/partiesgame/:id',
    component: PartyGame,
    meta: {
        requiresAuth: true
    }
  },{
    name: 'PartyGameAll',
    path:'/partiesgame/',
    component: PartyGame,
    meta: {
        requiresAuth: true
    }
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