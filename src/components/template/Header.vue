<template>
 <b-navbar toggleable="sm" type="dark" variant="info">

    <b-navbar-brand href="#">WeParty</b-navbar-brand>
   
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/" >Home</b-nav-item>
            <b-nav-item to="/news" >News</b-nav-item>
            <b-nav-item to="/games" >Search</b-nav-item>
            <b-nav-item to="/about"  >About</b-nav-item>       
            <b-nav-item to="/admin" :hidden="admin === 0">Admin</b-nav-item>     
            <b-nav-item to="/signup" v-if="$mq === 'xs' && !user" >Sign up</b-nav-item>       
            <b-nav-item to="/signin" v-if="$mq === 'xs' && !user" >Sign in</b-nav-item> 
            <b-nav-item @click.prevent="logout" v-if="$mq === 'xs' && !hideUserDropdown" >Sign out</b-nav-item>
      </b-navbar-nav>
      

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-form :hidden="hideLogin && $mq !== 'xs'">
            <b-button :hidden="hideLogin" variant="success"  to="/signup" size= "sm"                
            class="ml-2 mr-2">Sign up</b-button>
            <b-button :hidden="hideLogin" variant="light"  to="/signin" size= "sm" 
            class="mr-2">Sign in</b-button>
        </b-nav-form>

           

          <b-nav-item-dropdown right :hidden="hideUserDropdown" v-if="($mq !== 'xs')">
            <!-- Using 'button-content' slot -->
                <template  #button-content>      
                    <em><b-avatar :badge="notifications ? notifications.toString() : ''" src="https://placekitten.com/300/300"></b-avatar></em>
                </template>
           
            <b-dropdown-item to="/profile">Profile</b-dropdown-item>
            <b-dropdown-item to="/dashboard/main">Dashboard</b-dropdown-item>
             <b-dropdown-item to="/notifications"> 
             Notifications 
             <b-badge variant="light">{{notifications}}</b-badge>                    
            </b-dropdown-item>
            <b-dropdown-item @click.prevent="logout">Sign Out</b-dropdown-item>
            
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right v-if="!hideUserDropdown && ($mq === 'xs')">
           
           
            <b-dropdown-item to="/profile">Profile</b-dropdown-item>
            <b-dropdown-item to="/dashboard">Dashboard</b-dropdown-item>
             <b-dropdown-item to="/profile"> 
             Notifications 
             <b-badge variant="light" :badge="notifications ? notifications.toString() : ''">{{notifications}}</b-badge>                    
            </b-dropdown-item>
            
        </b-nav-item-dropdown>

      </b-navbar-nav>
      
    </b-collapse>
          
  </b-navbar>

</template>

<script>
import { mapState } from 'vuex'
import {userKey} from '../../../global'

export default {
    name: "Header",
    data(){
        return {
            admin : 0
        }
    },
    computed: mapState(['user', 'hideUserDropdown','notifications','hideLogin']),
    methods:{
        logout(){
            localStorage.removeItem(userKey)
            this.$store.commit('setUser',null)
            this.$store.commit('setHideUserDropdown', true)
             this.$store.commit('setHideLogin', false)
            this.$store.commit('setNotifications', null)
            this.$router.push({name: 'signin'})
            sessionStorage.clear();
        },
        getNotifications(){
            if(this.notifications){
                return this.notifications.toString()
            } else {
                return ""
            }
        }
    },
    watch:{
        'notifications': function(){
            return
        },
        '$store.state.user': function(){
            if(this.$store.state.user){
                if(this.$store.state.user.admin === 1){
                    this.admin = 1
                } else{
                    this.admin =0
                }
            }
        }
    }
}
</script>

<style scoped>
    *{
        
		font-family: Arial, Helvetica, sans-serif;
        font-size: 1.4rem;
        
    }
    /* Extra small devices (phones, 600px and down) */
    @media only screen and (max-width: 600px) {
        *{font-size: 1.0rem;}   
        .navbar-nav > li{
        display: flex;
        flex-direction: column;
        padding-left: 7px !important;
        margin-bottom: 0;
        list-style: none;
         background-color:#6600cc!important;
        color: #fff;
    }

    }

    /* Small devices (portrait tablets and large phones, 600px and up) */
    @media only screen and (min-width: 600px) {
        *{font-size: 1rem;}
    }

    /* Medium devices (landscape tablets, 768px and up) */
    @media only screen and (min-width: 768px) {
        *{font-size: 1rem;}
    }
    /* Large devices (laptops/desktops, 992px and up) */
    @media only screen and (min-width: 992px) {
        *{font-size: 1rem;}
    }

    /* Extra large devices (large laptops and desktops, 1200px and up) */
    @media only screen and (min-width: 1200px) {
        *{font-size: 1.1rem;}
    }

    @media only screen and (min-width: 1400px) {
        *{font-size: 1.4rem;}
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

    .navbar{
         background-color:#6600cc!important;
        color: #fff;
    }

    .navbar{
        z-index: 9999;
    }


</style>