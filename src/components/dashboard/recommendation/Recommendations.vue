<template>
   <div class="list-parties-games">
            <ul>
                <li v-for="party in parties" :key="party.id">
                    <PartyItem :party="party" />
                </li>
            </ul>
        </div>
</template>

<script>

import axios from 'axios'
import PartyItem from '../PartyGame'
import { baseApiUrl} from "../../../../global";
export default {
    name: "Recommendations",
    components:{PartyItem},
    data(){
        return{
            parties:[]
        }
    },
    methods:{
        onLoad(){
            axios.get(`${baseApiUrl}/party/user/${this.$store.state.user.id}/recommendation`)
            .then( res => {
                this.parties = res.data.parties
                console.log(this.parties)
            }) 
        }
    },
    created(){
        this.onLoad()
    }
    
}
</script>

<style>

</style>