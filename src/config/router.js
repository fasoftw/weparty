import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/home/Home'
import Games from '../components/games/Games.vue'
import NewParty from '../components/parties/NewParty'
import SignUp from '../components/auth/SignUp'
import SignIn from '../components/auth/SignIn'

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
    name: 'party',
    path: '/party',
    component: NewParty
},{
    name:'signup',
    path: '/signup',
    component: SignUp
},{
    name: 'signin',
    path: '/signin',
    component: SignIn
}]

const router = new VueRouter({
    mode: 'history',
    routes: routes
})

export default router;