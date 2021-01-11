import Vue from 'vue'
import VueRouter from 'vue-router'

import AdminGames from '../components/admin/Main.vue'
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
import GameProfile from '../components/dashboard/gameProfile/GameProfile'
import Notification from '../components/notification/Notifications'

// When we register our components this way, webpack automatically splits our code into chunks.
// It is also possible to group these files into one chunk.
// A great scenario would be grouping components related by route into one chunk.
// By using the comment to explicitly specify the chunk name, 
// webpack automatically bundles the compiled components into the same chunk.

const Home = () => import (/* webpackChunkName: "games" */'../components/home/Home')
const Games = () => import(/* webpackChunkName: "games" */'../components/search/Games')
const PartyGame = () => import(/* webpackChunkName: "party" */'../components/dashboard/PartyGame')
const NewParty = () => import(/* webpackChunkName: "party" */'../components/dashboard/party/NewParty')
const MyParties = () => import(/* webpackChunkName: "party" */'../components/dashboard/party/MyParties')

import {userKey} from '../../global'

Vue.use(VueRouter)

const routes = [{
    name:'home',
    path: '/',
    component: Home
},{
    name: 'admin',
    path: '/admin',
    component: AdminGames, 
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
    path: '/dashboard',
    components: {default: Dashboard}, 
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
            path: 'main',
            component: Recommendations
        }]
    }  
,{
    name: 'PartyGameId',
    path:'/game/:id/parties',
    component: PartyGame,
    meta: {
        requiresAuth: true
    },
	children: [
		{
        path: 'new',
        name: 'newParty',
        component: NewParty
    }], 
  },{
    name: 'PartyGameAll',
    path:'/game/parties',
    component: PartyGame,
    meta: {
        requiresAuth: true
    }
  },
  {
    name: 'Notifications',
    path:'/notifications',
    component: Notification,
    meta: {
        requiresAuth: true
    }
  },
  {
      name:'SearchGame',
      path: '/games',
      component: Games,
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
                path: '/signin',
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