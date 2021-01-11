<template>
  <div class="search-games">
      <b-container fluid class="bv-example-row">
       <b-row>
         <b-col>
                    
            <b-card-group deck>
               

                    <b-card header="Search games" class="text-left">


                    <b-row cols="1" cols-sm="1" cols-md="2" cols-lg="2">
                        <b-col> 
                               <b-row align-v="center" cols="1" cols-sm="1" cols-md="2" cols-lg="1">
                                 <b-row class="ml-2"  style="width:100%" align-v="center">
                                    <label for="teste" class="mt-2">Game:</label>
                                    <v-select id="teste" class="ml-3 mt-2" style="width:50%" :options="games" v-model="selected"></v-select>
                                 </b-row>
                             </b-row>
                        </b-col>

                            <b-row align-h="end" align-v="center" cols="1" cols-sm="1" cols-md="2" cols-lg="2">
                                 <b-col> 
                               <b-row align-v="center" cols="1" cols-sm="1" cols-md="2" cols-lg="1">
                                 <b-row class="ml-4"  style="width:100%" align-v="center">
                                    <label for="teste1" class="mt-2">Filter by:</label>
                                 <v-select class="ml-3 mt-2"  style="width:60%"  :options="categories" v-model="selectedCategory"></v-select>   </b-row>
                             </b-row>
                               </b-col>
                         </b-row>
                    </b-row>
  
                    
            <b-row cols="1" cols-sm="2" cols-md="3" cols-lg="4">
       
            <b-col
              v-for="(game, id) in filterGames"
              :key="id"
              col
              no-gutters
              class="mb-2 mt-3">
            
              <b-card 
                :title="game.name"
                :img-src="getPic(game.imageUrl)"
                :img-alt="game.imageUrl"
                img-height="170px"
                img-top
                style="max-width: 18rem; margin-top: 10px"> 
                
                <b-card-text>
                  {{ game.spots }} spots
                </b-card-text>
                
                <b-button variant="outline-primary" @click="toParty(game.id)">Visualizar</b-button>
                    </b-card>  
                    </b-col>
            
                </b-row>  
            </b-card>
    </b-card-group>

    </b-col>
   </b-row>
 </b-container>
  </div>
</template>

<script>

import axios from 'axios'
import {baseApiUrl, showError} from '../../../global'

export default {
    name: 'Games',
    data(){
        return{
            games:[],
            selected: null,
            selectedCategory: null,
            listGames: [],
            categories: []
        }
    },
    methods:{
         getPic(index) {
            return require('../../assets/games/'+index+'.jpg')
        },
        loadCombo(){
            axios.get(`${baseApiUrl}/games`)
            .then(res =>{
                this.games = res.data.map(item =>{
                    return {label: item.name, key: item.id}
                })
            }).catch(showError)
        },
        loadGames(){
            axios.get(`${baseApiUrl}/game/parties`)
            .then(res =>{                
                this.listGames = res.data
            }).catch(showError)
        },
        loadCategories(){
             axios.get(`${baseApiUrl}/categories`)
            .then(res =>{                
                this.categories = res.data.map(item =>{
                    return {label: item.name, key: item.id}
                })
            }).catch(showError)
        },toParty(gameId){
             this.$router.push({ name:'PartyGameId', params: {id: gameId}})
        }

    },
    created(){
        this.loadCombo()
        this.loadGames()
        this.loadCategories()
    },
    computed:{
        filterGames(){
            if(this.selected !== null){
                return this.listGames.filter((item) => {
                    return item.id === this.selected.key;
                });
            
            }else if(this.selectedCategory !== null){
                 return this.listGames.filter((item) => {
                    return item.category === this.selectedCategory.key;
                });
            
            }else{
                return this.listGames;
            }
        }
    },
    watch:{
        'selected': function(){
           return

        }
    }
}
</script>

<style>

</style>