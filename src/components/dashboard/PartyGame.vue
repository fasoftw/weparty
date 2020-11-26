<template>
    <div class="parties-games">
    <b-container fluid>   
            <b-row cols="1" cols-sm="2" cols-md="3" cols-lg="3">
             <b-col
             v-for="party in parties" :key="party.id"
              col
              no-gutters
              class="mb-2"
            >
            <PartyItem :party="party" />

             </b-col>
            </b-row>
        <div class="load-more">
            <button v-if="loadMore" @click="loadMoreGames"    
                class="btn btn-lg btn-outline-primary"
                >Carregar Mais Grupos</button>
        </div>
    </b-container>
    </div>
</template>

<script>
import { baseApiUrl } from '../../../global.js'
import PartyItem from './PartyItem'
import axios from 'axios'

export default {
    name: 'PartyGame',
    components: { PartyItem },
    data: function(){
        return{
            parties: [],
            page: 1,
            loadMore: true,
        }
    },
    methods:{
         getGamesAll(){
             axios.get(`${baseApiUrl}/parties?page=${this.page}`).then((res) => {
                this.parties = this.parties.concat(res.data.parties)
                this.page++

                if(res.data.parties.length === 0) this.loadMore = false
                /*this.parties = res.data.party.map(data => {
                      return { ...data }
                })*/
             })
        },
        getGamesById(){
             axios.get(`${baseApiUrl}/game/${this.$route.params.id}/parties/?page=${this.page}`).then((res) => {
                this.parties = this.parties.concat(res.data.parties)
                this.page++
                if(res.data.parties.length === 0) this.loadMore = false
             })
        },
        loadMoreGames(){
            this.$route.params.id ? this.getGamesById() : this.getGamesAll()
        }

    },
    mounted(){
        this.$route.params.id ? this.getGamesById() : this.getGamesAll()
        
    }
}
</script>

<style>
.parties-games {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 20px;
}
</style>