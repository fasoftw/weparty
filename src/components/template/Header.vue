<template>
    <div class="header">
     
    <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">WeParty</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
            <b-nav-item href="#">Home</b-nav-item>
            <b-nav-item href="#">Search</b-nav-item>
            <b-nav-item href="#">New Party</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
            

            <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
                <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
        </b-navbar-nav>
        </b-collapse>
  </b-navbar>
    </div>
</template>

<script>
export default {
    name: "Header"
}
</script>

<style scoped>
   .bg-info {
         background-color:#6600cc !important;
    }
    
    .header{
        grid-area: header;
        background-color:#6600cc!important  ;

    }

    .navbar-brand{
            background-color:#6600cc !important;
    }
    .navbar-dark .navbar-nav .nav-link {
        color:#fff;
    }

     .navbar-dark .navbar-nav .nav-link:hover{
        background-color: 	#8c1aff;
    }



 
</style>