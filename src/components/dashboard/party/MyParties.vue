<template>
  <div id="my-parties">
       <div class="list-parties-games"> 
                          
        <PartyGame :hidden="!resultsFound" :parties.sync="parties" :isComp="true" :type="'edit'" />    

            <!-- Hero content: will be in the middle -->
        <div class="hero-body" style="height: 400px" :hidden="resultsFound">
        <div class="d-flex justify-content-center">
            <h1 class="title">
            No parties to show. 
            </h1>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import { baseApiUrl } from '../../../../global.js'
import PartyGame from '../PartyGame'
import {mapState} from 'vuex'
import axios from 'axios'
export default {
    name:"MyParties",
    components:{PartyGame},
    data(){
        return{
            parties:[],
            resultsFound: true
        }
    },
    computed:{
        ...mapState(['hideButtonNewParty'])
    },
    methods:{
        onLoad(){
            axios.get(`${baseApiUrl}/party/user/${this.$store.state.user.id}`)
            .then( res => {
                if(res.data.length === 0){
                    this.resultsFound = false
                }

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