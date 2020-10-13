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
        hideAdminFunctions: false
    },
    props: {
        title: String,
        hideMenu: Boolean,
    },
    mutations:{
        hideMenu(){
            this.state.menuVisible = false
        },
        showMenu(){
            this.state.menuVisible = true
        }

           
    }
})