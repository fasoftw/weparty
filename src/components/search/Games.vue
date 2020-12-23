<template>
  <div class="search-games">
      <b-container fluid>
            <b-row>
                 <b-col>
                    
                        <b-card-group deck>

                            <b-card bg-variant="light" header="Primary" class="text-left">
                                 <v-select :options="games" v-model="selected"></v-select>
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
            selected: null
        }
    },
    methods:{
        loadGames(){
            axios.get(`${baseApiUrl}/games`)
            .then(res =>{
                this.games = res.data.map(item =>{
                    return {label: item.name, key: item.id}
                })
            }).catch(showError)
        }

    },
    created(){
        this.loadGames()
    }
}
</script>

<style>

</style>