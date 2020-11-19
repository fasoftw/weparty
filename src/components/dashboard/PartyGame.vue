<template>
    <div class="parties-games">
        <div class="list-parties-games">
            <ul>
                <li v-for="party in parties" :key="party.id">
                    <PartyItem :party="party" />
                </li>
            </ul>
        </div>
        <div class="load-more">
            <button v-if="loadMore" @click="loadMoreGames"    
                class="btn btn-lg btn-outline-primary"
                >Carregar Mais Grupos</button>
        </div>

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
.parties-games{
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.list-parties-games ul {
	display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
}

.list-parties-games li {
    list-style-type: none;
    padding: 10px;
}

.parties-games .load-more{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 25px;
}
</style>