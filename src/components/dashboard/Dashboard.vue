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
                    <b-dropdown-item @click="show('party')">New Party</b-dropdown-item>
                    <b-dropdown-item @click="show">Game Profile</b-dropdown-item>
                    <b-dropdown-divider ></b-dropdown-divider>
                    <b-dropdown-item @click="show" >Recomendações de Grupos</b-dropdown-item>
                    </b-nav-item-dropdown>
                
                <b-nav-item-dropdown
                    id="search"
                    text="Search"
                    toggle-class="nav-link-custom"
                    right>
                    <b-dropdown-item>Party</b-dropdown-item>
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
        <div class="main">
        <b-container v-if="main" class="border border-secondary">
            <b-row>
                <b-col>Party em andamento</b-col>
            </b-row>
        </b-container>
          <b-container v-if="main" class="border border-secondary" style="margin-top: 1%;">
            <b-row>
                <b-col>Recomendações</b-col>
            </b-row>
        </b-container>
        </div>
         <div class="secao">
        <NewParty v-if="newParty"></NewParty>
        </div>
    </b-container>
   
    </div>
</template>

<script>
import NewParty from './NewParty'
export default {
    name:'Dashboard',
    components:{NewParty},
    data(){
        return {
            newParty: false,
            searchParty: false,
            main: true
        }
    },
    methods:{
        show(parametro){
           if(parametro === 'party'){
             this.newParty = true 
             this.main = false
           }
        }
    }
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


</style>