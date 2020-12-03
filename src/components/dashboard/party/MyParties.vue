<template>
  <div id="my-parties">
       <div class="list-parties-games"> 
            <b-card title="My Parties">          
        <hr>                 
                    <PartyGame :parties.sync="parties" :isComp="true" :type="'edit'" />    
            </b-card>
    </div>
  </div>
</template>

<script>
import { baseApiUrl } from '../../../../global.js'
import PartyGame from '../PartyGame'
import axios from 'axios'
export default {
    name:"MyParties",
    components:{PartyGame},
    data(){
        return{
            parties:[]
        }
    },
    methods:{
        onLoad(){
            axios.get(`${baseApiUrl}/party/user/${this.$store.state.user.id}`)
            .then( res => {

                this.parties = res.data
            }) 
        }
    },
    mounted(){
        this.onLoad()
    }
}
</script>

<style>

.list-parties-games{
    margin-top:2%;
    
}

</style>