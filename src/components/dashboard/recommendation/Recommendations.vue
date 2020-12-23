<template>
   <div class="list-parties-games">          
                    <PartyGame :parties.sync="parties" :isComp="true" :type="''" />            
    </div>
</template>

<script>

import axios from 'axios'
import PartyGame from '../PartyGame'
import { baseApiUrl} from "../../../../global";
export default {
    name: "Recommendations",
    components:{PartyGame},
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
            }) 
        }
    },
    mounted(){
        this.onLoad()
    }
    
}
</script>

<style>

</style>