<template>
  <div class="main-admin">
      <b-container fluid>
           <b-row cols="1" cols-sm="2" cols-md="4" cols-lg="1">
                       <b-nav pills>
                <b-nav-item-dropdown
                id="admin"
                text="Games"
                toggle-class="nav-link-custom"
                right>
                    <b-dropdown-item to="/admin/games" >New Game</b-dropdown-item>
               </b-nav-item-dropdown>
                
                <b-nav-item-dropdown
                    id="search"
                    text="Articles"
                    toggle-class="nav-link-custom"
                    right>
                    <b-dropdown-item to="/admin/articles">New Article</b-dropdown-item>
    
                    </b-nav-item-dropdown>
            </b-nav>

           </b-row>

           <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
export default {
    named: "Main"

}
</script>

<style>

 .main-admin{
        height: 100%;
        display: flex;
        justify-content: flex-start ;
        align-items: flex-start;
        flex-wrap: wrap;
        background-color: #FFF;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    }

    .nav-dashboard{
        background-color: #FFF;
    }


</style>