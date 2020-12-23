import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Button from 'vue-js-toggle-button'
import {baseApiUrl} from '../../global'


import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
Vue.use(Button)

export default new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    state: {
        user:  null,
        hideAdminFunctions: false,
        hideUserDropdown : true,
        hideLogin: true,
        notifications: null
    },  
    mutations:{
        setUser(state, user){
            state.user = user
            if(user){
                axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
            } else{
                delete axios.defaults.headers.common['Authorization']
            }
        },
        setHideUserDropdown(state, hide){
            state.hideUserDropdown = hide
        },
        setHideLogin(state, hide){
            state.hideLogin = hide
        },
        setNotifications(state,user){
            if(user !== undefined){           
                axios.get(`${baseApiUrl}/notifications/user/${user}`)
                .then(res =>{
                    state.notifications = res.data[0].count                    
                }).catch(err => {return err})   
            }    
            
        }
           
    },
    getters:{
        getUser (state) {
            return state.user.id;
        },
        getHideUserDropdown(state){
            return state.hideUserDropdown
        },
        getHideLogin(state){
            return state.hideLogin
        },
        getNotifications(state){
            return state.notifications
        }
    }
})