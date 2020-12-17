import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Button from 'vue-js-toggle-button'



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
        path: '/',
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
           
    }
})