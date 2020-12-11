<template>
    <div class="party-item" v-if="party" >
        
        <div class="party-inner"   :class="{'flip':!isFlipped }" >        
            
            <div class="flip-card-front"> 
                    <div class="party-game-info">
                        <div class="party-game-name">
                            <span> <strong>{{ party.partyName }}</strong></span>
                        </div>
                        <div class="party_icon" v-on:click="flipCard" v-if="type !== 'edit'">
                            <i class="fas fa-info-circle"></i>
                        </div>
                        <div class="party_icon_back" v-on:click="editParty(party)" v-if="type === 'edit'">
                            <b-icon icon="pencil-square"> </b-icon>
                        </div>
                        <div class="party_icon_remove ml-2" v-on:click="remove(party)" v-if="type === 'edit'">
                            <b-icon icon="trash"> </b-icon>
                        </div>
                    </div>

                    <div class="party_players_button">
                        <div class = "party-description">
                            <span> Platform: <strong>   {{party.platformName}}  </strong></span><br>                           
                            <span> Rank: <strong>   {{party.rank}} </strong></span><br>
                            <span> Level:<strong>   {{party.level}} </strong></span><br>
                            <span> Party Leader: <strong> {{party.name}}</strong> </span> <br>
                            <span> Description: {{party.description}}</span><br>
                        </div>

                    </div>

            </div>

            <div class="flip-card-back" v-show="!isFlipped">
                    <div class="card-back-top">
                        <div class="card-back-leader">
                            <span><strong>{{party.partyName}}</strong></span>
                        </div>
                        
  
                        <div class="party_icon_back" v-on:click="flipCard" v-if="type !== 'edit'">
                            <i class="fas fa-undo-alt"></i>
                        </div>
                    </div>
                    <div class="party_players_button">
                     <div class="party-players-all">
                            <ul class="party-players">
                                <li class="party-player" v-for="player in players" :key="player.id">
                                    <div class="party-player-img">
                                        <img class="player-img"
                                            src="@/assets/desconhecido.jpg"
                                            height="25" width="25" alt="Player"
                                        >
                                    </div>
                                    <div class="party-player-info">
                                        <span style="font-size: 15px"> {{player.nickname}} </span>
                                    </div>

                                    
                                </li>
                            </ul>
                    </div>
                    </div>

                            
                    <div class="party-buttons">
                            <b-button class="activated"   @click="enterParty"  v-show="showStatusParty === 'Enter'"> 
                                    <i class="fas fa-arrow-alt-circle-right"></i> <span>{{this.showStatusParty}} </span>
                                    <span><strong>- {{ party.spotsFilled}} / {{party.numberPlayers}} </strong></span><br>
                            </b-button>

                            <b-button class="activated closed" v-show="showStatusParty === 'Closed'"> 
                                    <i class="fas fa-lock"></i> <span>{{this.showStatusParty}} </span>
                                    <span><strong>- {{ party.spotsFilled }} / {{party.numberPlayers}} </strong></span><br>
                            </b-button>
                        </div>
               
            </div>
       
        </div>

    </div>
</template>

<script>
import { baseApiUrl,showError } from '../../../global.js'
import axios from 'axios'
export default {
    name: 'PartyItem',
    props: ['party','type'],
    data(){
        return{
            statusParty: null,
            showStatusParty: 'Open',
            isFlipped: false,
            counter: 0,
            players: [],
            numbers: 1,
            confirmDel: '',
            userId: null,

        }
    },
    methods:{
        getPlayers(){
            axios.get(`${baseApiUrl}/party/${this.party.id}/players`).then((res) => {
                this.players = res.data.party
             })
        },
        getTags(id){
             axios.get(`${baseApiUrl}/party/${id}/filters`).then((res) => {
                this.party.filters = res
               // console.log(this.party.filters)
             })
        },
        toParty(id, party){
            this.$router.push({ name:'EditParty', params: {party: party}})
        },
        enterParty(){
            this.statusParty = !this.statusParty
            axios.post(`${baseApiUrl}/party/${this.party.id}/players`, {...this.party, playerId: this.userId})
            .then(res =>{
                if(res.data === 'closed party'){
                    this.showStatusParty = 'Closed'    
                    this.getPlayers()
                }
                this.getPlayers()
            }) 
            .catch(showError)
        },
        editParty(value){
            this.toParty(value.id, value)
        },
        remove(value){
          
            this.msgBoxConfirm = ''
            this.$bvModal.msgBoxConfirm('Are you sure you want to delete?', {
            title: 'Please Confirm',
            size: 'sm',
            buttonSize: 'sm',
            okVariant: 'danger',
            okTitle: 'YES',
            cancelTitle: 'NO',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true
            })
            .then(res => {

                if(res){
                    axios.delete(`${baseApiUrl}/parties/${value.id}`)
                    .then(() =>{
                    this.$toasted.global.defaultSuccess();
                    this.party = null
                    this.$forceUpdate();
                    }) 
                    .catch(showError)
                }

            })
            .catch(showError)
        },
        flipCard(){
            this.isFlipped = !this.isFlipped 
        }
    },
    mounted(){
        this.userId = this.$store.getters.getUser
        this.statusParty = this.party.isOpen
        this.statusParty === 1 ? this.showStatusParty = 'Enter' : this.showStatusParty ='Closed'
        this.getPlayers()
    },
    watch: {
        statusParty() {
            this.statusParty === 1 ? this.showStatusParty = 'Enter' : this.showStatusParty = 'Closed'
        },
        party: function(){
            this.$emit('update:party', this.party)
            this.numberPlayers = this.party.numberPlayers
        }
    }
}
</script>

<style>

.party-item{
    display: flex;
    flex-wrap: wrap;
    max-width: 327px;
    height: 270px;
    background-color: transparent;
    perspective: 1000px;
    border-radius: 25px;
    margin-bottom: 15px;
    background-color: #ffffff;
    padding: 0px 20px 20px;
    border: 2px solid rgba(176, 6, 255, 0.2);
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
}

.party-inner{
    display:flex;
    flex-direction: column;
    flex-grow: 1; 
    transition: transform 0.6s;
    transform-style: preserve-3d;
}

.flip {
  transform: rotateY(180deg) ;
  
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-card-front {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.flip-card-back {    
    display: flex;
    flex-grow: 1;
    transform: rotateY(180deg);
}


.party-back{
  padding: 18px 0;
}

.party-game-info{
    display: flex;
    flex-direction: row;
    text-align: center;
    justify-content: space-around;    
    border-bottom: 2px inset #6600cc;
}

.party-game-name{
    flex-grow: 1;
}

.party-game-name span{
    font-family:sans-serif;
    font-weight: 400;
}
.party-game-name strong{
    font-family:sans-serif;
    font-weight: 800;
}


.party-players-all{
    flex-grow: 1;
}

.party-description{
    flex-grow: 1;
}
.party-players{
    display: flex;
    flex-grow: 1;
    flex-direction: row;
    justify-content: space-around !important;
    flex-wrap: wrap;
    padding-left: 0;
}

.party-player{
    text-align: center;
    padding: 10px;
     list-style-type: none;
}



.party_players_button{
    flex-grow: 1;
    display:flex;
    flex-direction: column;
}

.party-buttons{
    display: flex;
}

.party-buttons button{
    flex-grow: 1;
}

.party-buttons .activated{ 
    display:inline-block; 
    padding:0.46em 1.6em; 
    border:0.1em solid #000000; 
    margin:0 0.2em 0.2em 0; 
    border-radius:0.8em; 
    box-sizing: border-box;
    text-decoration:none; 
    font-family:'Roboto',sans-serif; 
    font-weight:700; 
    background-color:#42cc8c;
    color:#000000; 
    text-shadow: 0 0.04em 0.04em rgba(0,0,0,0.35); 
    text-align:center; 
    transition: all 0.15s; 
} 

.activated:hover{ 
    background-color:#42cc8c;
    text-shadow: 0 0 2em rgba(255,255,255,1); 
    color:#FFFFFF; 
    border-color:#FFFFFF; 
}

.closed{
    cursor: not-allowed !important;
    opacity: .7;
    background-color: #af2424 !important;
    color: black !important;
}

.closed:hover{
    cursor: not-allowed ;
    opacity: .7;
    background-color: #af2424 !important;
    color: black !important;
}



.flip-card-back{
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}
.card-back-top{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    text-align: center;   
    border-bottom: 2px inset #6600cc;
}
.card-back-leader{
    flex-grow: 1;
}

.card-back-leader span{
    font-family:sans-serif;
    font-weight: 400;
}
.card-back-leader strong{
    font-family:sans-serif;
    font-weight: 800;
}

.card-back-description{
    margin-left: 10px;
    flex-grow: 1;
}


.player-img{
    border-radius: 50%;
}

</style>