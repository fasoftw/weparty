<template>
    <div class="parties-games">
    <b-container fluid>  
           <b-row
           :cols="cols[0]" :cols-sm="cols[1]" :cols-md="cols[2]" :cols-lg="cols[3]" :cols-xl="cols[4]" >
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
            cols: [],
        }
    },
    methods:{
         getGamesAll(){
            this.data = this.parties
            this.setSize()
        },        
        getGamesById(){
             axios.get(`${baseApiUrl}/game/${this.$route.params.id}/parties/?page=${this.page}`).then((res) => {
                this.data = this.data.concat(res.data.parties)
                this.page++
                if(res.data.parties.length === 0) this.loadMore = false
                this.setSize()
             })

        },
        loadMoreGames(){
            this.$route.params.id ? this.getGamesById() : this.getGamesAll()
        },
        setSize(){
            if(this.data.length == 1){
                this.cols = [1,1,1,1,1]
            }else{
                if(this.$mq === 'xs'){
                    this.cols = [1,1,2,3,3]
                }
                else if(this.$mq === 'Z0'){
                    this.cols = [1,1,2,3,3]
                }
                else if(this.$mq === 's'){
                    this.cols = [1,2,2,3,3]
                }
                else if(this.$mq === 'Z2'){
                    this.cols = [1,2,2,2,3]
                }  
                else if(this.$mq === 'md'){
                    console.log('Z2')
                    this.cols = [1,2,3,3,3]
                } 
                else if(this.$mq === 'lg'){
                    this.cols = [1,2,3,3,3]
                }
                else if(this.$mq === 'Z3'){
                    this.cols = [1,2,3,3,3]
                } 
                else if(this.$mq === 'xl'){
                    this.cols = [1,2,2,3,4]
                }
            }
        }

    },
    mounted(){
        this.$route.params.id ? this.getGamesById() : this.getGamesAll() 
    },
    watch: {
        parties: function(){
        this.$emit('update:parties',this.parties)
        this.data = this.parties
        },
        $mq: function(){
            this.setSize()
        }
  },
}
</script>

<style>

</style>