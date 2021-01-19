<template>
    <div class="dashboard">
    <b-container class="bv-example-row" fluid >
        <b-row class="nav-dashboard"  >
        <b-col class="col-dashboard">
        <b-card-header header-tag="nav">
            <b-nav pills card-header>
                <b-nav-item  :active="tab === 1" @click="tab = 1" to="/dashboard/main" right>Dashboard</b-nav-item>
                
                <b-nav-item-dropdown
                id="party"
                text="Party"
                toggle-class="nav-link-custom"
                :active="tab === 2"
                @toggle="tab = 2"                
                right>
                   
                    <b-dropdown-item to="/dashboard/party">New Party</b-dropdown-item>
                    <b-dropdown-item to="/dashboard/party/view">My Parties</b-dropdown-item>

                </b-nav-item-dropdown>
                
                <b-nav-item-dropdown
                    id="gameProfile"
                    text="Game Profile"
                    @toggle="tab = 3"
                    :active="tab === 3"
                    toggle-class="nav-link-custom"
                    right>
                    <b-dropdown-item to="/dashboard/game/profile" >Game Profile</b-dropdown-item>
                    </b-nav-item-dropdown>

             
            </b-nav>
        </b-card-header> 
        <router-view></router-view>   
        </b-col>
        </b-row>   

         
    </b-container>
    </div>
</template>

<script>

export default {
    name:'Dashboard',
    data(){
        return {
            tab: 0
        }
    },
    watch:{
        'tab': function(){
            //console.log(this.tab)
        }
    }
}
</script>

<style scoped>
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
        background-color: #f8f9fa;
        border-color: 1px solid rgb(158 24 245 / 100%)
    }

    .col-dashboard{
            padding-right: 0px;
    padding-left: 0px;
    }


</style>