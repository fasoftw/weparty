<template>
    <div class="header">
     
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="#">WeParty</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/"  @click="showMenu">Home</b-nav-item>
                    <b-nav-item to="/games" @click="hideMenu">Games</b-nav-item>
                    <b-nav-item to="/party"  @click="hideMenu">New Party</b-nav-item>                        
                </b-navbar-nav>
            </b-collapse>
         </b-navbar>

        <div class="userdropdown">
            <UserDropDown />
        </div>
    </div>
</template>

<script>

import UserDropDown from './UserDropDown.vue'
export default {
    name: "Header",
    components: {UserDropDown},
    methods:{
        hideMenu() {
            this.$store.commit('hideMenu')
        },
        showMenu(){
            this.$store.commit('showMenu')
        }
    }
}
</script>

<style scoped>
   .bg-info {
         background-color:#6600cc !important;
    }
    
    .header{
        grid-area: header;
        background-color:#6600cc!important  ;
        display:flex;
        justify-content: space-between


    }

    .navbar-dark .navbar-nav .nav-link {
        background-color:#6600cc!important;
        padding-left: 5px;
        
    }

    .navbar-brand{
        background-color:#6600cc !important;
        font-family: 'Fredoka One', cursive;
    }
    .navbar-dark .navbar-nav .nav-link {
        font-size: 0.95em;
        color:#fff;
        font-family: "Arial", sans-serif;
    }

     .navbar-dark .navbar-nav .nav-link:hover{
        background-color:	#9B30FF !important;
        color: #fff;
    }



 
</style>