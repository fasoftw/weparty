<template>
    <div class="header">
     
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="#">WeParty</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item href="#">Home</b-nav-item>
                    <b-nav-item href="#">Games</b-nav-item>
                    <b-nav-item href="#">New Party</b-nav-item>                        
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
    components: {UserDropDown}
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



    .navbar-brand{
            background-color:#6600cc !important;
            font-family: 'Fredoka One', cursive;
    }
    .navbar-dark .navbar-nav .nav-link {
        color:#fff;
        font-family: "Arial", sans-serif;
    }

     .navbar-dark .navbar-nav .nav-link:hover{
        background-color: 	#8c1aff;
    }



 
</style>