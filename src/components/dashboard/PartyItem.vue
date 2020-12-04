<template>
    <div class="party-item" v-if="party" >
        
        <div class="party-inner"   :class="{'flip':!isFlipped }" >        
            
            <div class="flip-card-front">
                    <div class="party-game-info">
                        <div class="party-game-name">
                            <span> Grupo:  <strong>{{ party.name }}</strong></span>
                        </div>
                        <div class="party_icon" v-on:click="flipCard">
                            <i class="fas fa-info-circle"></i>
                        </div>
                    </div>


                    <div class="party_players_button">
                        <div class="party-players-all">
                            <ul class="party-players">
                                <li class="party-player" v-for="player in party.spotsFilled" :key="player">
                                    <div class="party-player-img">
                                        <img 
                                            src="@/assets/desconhecido.jpg"
                                            height="25" width="25" alt="Player"
                                        >
                                    </div>
                                    <div class="party-player-info">
                                    </div>

                                    
                                </li>
                            </ul>
                        </div>

                        <div class="party-buttons">
                            <b-button class="activated"   @click="enterParty"  v-show="showStatusParty === 'Open'"> 
                                    <i class="fas fa-arrow-alt-circle-right"></i> <span>{{this.showStatusParty}}</span>
                            </b-button>

                            <b-button class="activated close" v-show="showStatusParty === 'Closed' && isFlipped"> 
                                    <i class="fas fa-lock"></i> <span>{{this.showStatusParty}}</span>
                            </b-button>
                        </div>

                    </div>
            </div>

            <div class="flip-card-back" v-show="!isFlipped">
                    <div class="card-back-top">
                        <div class="card-back-leader">
                            <span>Leader: <strong>{{party.userName}}</strong></span>
                        </div>
                        <div class="party_icon_back" v-on:click="editParty(party)" v-if="type === 'edit'">
                            <b-icon icon="pencil-square"> </b-icon>
                        </div>
                        <div class="party_icon_remove ml-2" v-on:click="remove(party)" v-if="type === 'edit'">
                            <b-icon icon="trash"> </b-icon>
                        </div>
                        <div class="party_icon_back" v-on:click="flipCard" v-if="type !== 'edit'">
                            <i class="fas fa-undo-alt"></i>
                        </div>
                    </div>
                    <div class="card-back-description">
                        <p>{{party.description}}</p>
                    </div>

                    <b-button variant="info" v-on:click="enterParty" v-show="this.party.isOpen">Enter</b-button>
               
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
            qtdPlayers: null,
            isFlipped: true,
            counter: 0,
            players: [],
            numbers: 1
        }
    },
    methods:{
        getPlayer(){

        },
        getTags(id){
             axios.get(`${baseApiUrl}/party/${id}/filters`).then((res) => {
                this.party.filters = res
                console.log(this.party.filters)
             })
        },
        toParty(id, party){
            this.$router.push({ name:'EditParty', params: {party: party}})
        },
        enterParty(){
            this.statusParty = !this.statusParty
            console.log(this.party)
            axios.post(`${baseApiUrl}/party/${this.party.id}/players`,this.party)
            .then(res =>{
                if(res.data === 'closed party'){
                    this.showStatusParty = 'Closed'    
                }
            }) 
            .catch(showError)
        },
        countPlayers(){
             this.isFlipped = !this.isFlipped 
            // axios.get(`${baseApiUrl}/game/${this.party.gameId}/parties`).then((res) => {
            //     this.players = res.data

            // })
        },
        editParty(value){
            this.toParty(value.id, value)
        },
        remove(value){
            axios.delete(`${baseApiUrl}/parties/${value.id}`)
            .then(() =>{
               this.$toasted.global.defaultSuccess();
               this.party = null
               this.$forceUpdate();
            }) 
            .catch(showError)
        },
        flipCard(){
            this.isFlipped = !this.isFlipped 
        }
    },
    watch: {
        statusParty() {
            this.statusParty === 1 ? this.showStatusParty = 'Open' : this.showStatusParty = 'Closed'
        },
        party: function(){
            this.$emit('update:party',this.party)
            this.numberPlayers = this.party.numberPlayers

        }
    },
    mounted(){
        this.statusParty = this.party.isOpen
        this.statusParty === 1 ? this.showStatusParty = 'Open' : this.showStatusParty ='Closed'
        this.countPlayers()
    }
}
</script>

<style>

.party-item{
    display: flex;
    width: 300px;
    flex-wrap: wrap;
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
    border-width: 10px;
    border-style: solid;
    border-image: 
        linear-gradient( 
        #6666ff,
        rgba(0, 0, 0, 0)
        ) 0 0 90%;
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
.party-players{
    display: flex;
    flex-grow: 1;
    flex-direction: row;
    justify-content: flex-start !important;
    flex-wrap: wrap;
    padding-left: 0;
}

.party-player{
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

.close{
    cursor: not-allowed !important;
    opacity: .7;
    background-color: #af2424 !important;
    color: black !important;
}

.close:hover{
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
    flex-grow: 1    ;
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


        

</style>