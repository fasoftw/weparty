<template>
    <div class="dashboard">
    <b-container class="bv-example-row">
        <b-row class="nav-dashboard" align-v="center" cols="16" >
           
            <b-nav pills>
                <b-nav-item-dropdown
                id="party"
                text="Party"
                toggle-class="nav-link-custom"
                right>
                    <b-dropdown-item to="/newParty">New Party</b-dropdown-item>
                    <b-dropdown-item to="/gameProfile" >Game Profile</b-dropdown-item>
                    <b-dropdown-divider ></b-dropdown-divider>
                    <b-dropdown-item to="/highlights" >Recomendações de Grupos</b-dropdown-item>
                    </b-nav-item-dropdown>
                
                <b-nav-item-dropdown
                    id="search"
                    text="Search"
                    toggle-class="nav-link-custom"
                    right>
                    <b-dropdown-item to="/searchParty">Party</b-dropdown-item>
                    <b-dropdown-item>Friends</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown
                    id="friends"
                    text="Friends"
                    toggle-class="nav-link-custom"
                    right>
                    <b-dropdown-item>One</b-dropdown-item>
                    <b-dropdown-item>Two</b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item>Three</b-dropdown-item>
                    </b-nav-item-dropdown>
            </b-nav>
           
        </b-row>   
    </b-container>
    </div>
</template>

<script>

export default {
    name:'Dashboard'
}
</script>

<style>
     .dashboard{
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

    .card-header {
        background-color: rgb(42 169 230 / 11%);
    }


</style>