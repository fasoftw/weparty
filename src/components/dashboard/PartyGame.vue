<template>
    <div class="parties-games">
    <b-container fluid>  
            <b-row :cols="cols[0]" :cols-sm="cols[1]" :cols-md="cols[2]" :cols-lg="cols[3]">
             <b-col
             v-for="party in data" :key="party.id"
              col
              no-gutters
              class="mb-2">

             <PartyItem :party="party" :type="type"/>

             </b-col>
            </b-row>
        <div class="load-more">
            <button v-show="!isComp" v-if="loadMore" @click="loadMoreGames"    
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
    props:['parties', 'isComp','type'],
    data: function(){
        return{
            page: 1,
            loadMore: true,
            data: [],
            cols: [1,2,3,3]
        }
    },
    methods:{
         getGamesAll(){

             if(this.data.length <= 2) this.cols[3] =2
             
             if(this.$mq === 'lg'){
                 this.cols = [1,2,3,3]
             } else if(this.$mq === 'xl'){
                  this.cols = [1,2,2,4]
             } else if(this.$mq === 'exl'){
                  this.cols = [1,2,2,5]
             }             

            this.data = this.parties
        },        
        getGamesById(){
             axios.get(`${baseApiUrl}/game/${this.$route.params.id}/parties/?page=${this.page}`).then((res) => {
                this.data = this.data.concat(res.data.parties)
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
    },
    watch: {
    parties: function(){
       this.$emit('update:parties',this.parties)
       this.data = this.parties
    }
  },
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