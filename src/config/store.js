import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    state: {
        user:  null,
        menuVisible: false,
        hideAdminFunctions: false,
        path: '/'
    },
    mutations:{
        hideMenu(){        
          
        },
        showMenu(){
          
        },
        toggleMenu(state,path){
            if(path === '/') {
              state.menuVisible = true
            }
            else{
              state.menuVisible = false                
            }
 
            //console.log("toggleMenu=" + state.isMenuInvisible);
        },

        setUser(state,user){
            state.user = user
            if(user){
                axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
            } else{
                delete axios.defaults.headers.common['Authorization']
            }
        }

           
    }
})