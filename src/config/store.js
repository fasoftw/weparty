import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            email: 'deboracrisf91@gmail.com',
            name: 'Débora'
        },
        menuVisible: true,
        hideAdminFunctions: false,
        path: '/'
    },
    mutations:{
        hideMenu(){
        
            if(this.state.path != '/') {
                this.state.menuVisible = false
                
            }

        },
        showMenu(){
            if(this.state.path === '/') this.state.menuVisible = true
        }

           
    }
})