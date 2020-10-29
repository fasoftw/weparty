<template>
    <div class="header">
     
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="#">WeParty</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/"  @click="hideMenu">Home</b-nav-item>
                    <b-nav-item to="/community"  @click="hideMenu">Comunidade</b-nav-item>
                    <b-nav-item to="/about"  @click="hideMenu">Sobre</b-nav-item>       
                    <b-nav-item to="/games"  @click="hideMenu">Games</b-nav-item>                         
                </b-navbar-nav>
            </b-collapse>
            
         </b-navbar>
        <div class ="buttons">
             <b-button variant="success" @click="hideMenu" to="/signup" size= "sm"
              v-if="hideUserDropdown"
              class="mr-2">Sign up</b-button>
             <b-button variant="light" @click="hideMenu" to="/signin" size= "sm" 
              class="mr-2"
              v-if="hideUserDropdown">Sign in</b-button>
        </div>
          <div class="notification" >
           <Notification v-if="!hideUserDropdown" />
        </div>
           <UserDropDown v-if="!hideUserDropdown" />

       
    </div>
</template>

<script>
import Notification from './Notification'
import UserDropDown from './UserDropDown.vue'
export default {
    name: "Header",
    components: {UserDropDown,Notification},
    props: {
        hideUserDropdown: Boolean
    },
    methods:{
        hideMenu() {
           this.$store.commit('toggleMenu',this.$route.path)

        }
    },

}
</script>

<style scoped>
    *{
        
		font-family: Arial, Helvetica, sans-serif;
        font-size: 1.4rem;
        
    }
   .bg-info {
         background-color:#6600cc !important;
    }
    
    .header{
        grid-area: header;
        background-color:#6600cc!important  ;
        font-weight: 100;


        display: flex;
        justify-content: space-between;


    }

    .btn-success {
        color: #fff;
        background-color: darkorange !important;
        border-color: darkorange !important;
    }

    .buttons{
        display:flex;
        align-items: center;
        justify-content: space-between;
        margin-left: auto;
        flex-direction: row;
    }

    .notification{
         display:flex;
         justify-content: flex-start;
         align-items: center;
         margin-top: 3px;
         margin-left:8px ;
         padding:5px;
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