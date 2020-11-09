import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/home/Home'
import Games from '../components/admin/AdminPages.vue'
import SignUp from '../components/user/SignUp'
import SignIn from '../components/user/SignIn'
import Profile from '../components/user/Profile'
import Community from '../components/navigation/Community'
import About from '../components/navigation/About'
import Dashboard from '../components/dashboard/Dashboard'

import {userKey} from '../../global'

Vue.use(VueRouter)

const routes = [{
    name:'home',
    path: '/',
    component: Home
},{
    name: 'games',
    path: '/games',
    component: Games
},{
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
    name: 'community',
    path: '/community',
    component: Community
},{
    name: 'about',
    path: '/about',
    component: About
},
  {
    name: 'dashboard',
    path:'/dashboard',
    component: Dashboard
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