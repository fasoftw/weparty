<template>
    <div class="party-item">
        
        <div class="party-inner"   :class="{'flip':isFlipped }">        
            
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
                                <li class="party-player" v-for="player in party.numberPlayers" :key="player">
                                    <div class="party-player-img">
                                        <img 
                                            src="@/assets/desconhecido.jpg"
                                            height="35" width="35" alt="Player"
                                        >
                                    </div>
                                    <div class="party-player-info">
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div class="party-buttons">
                            <b-button class="activated"   @click="enterParty"  v-show="showStatusParty === 'Aberto'"> 
                                    <i class="fas fa-arrow-alt-circle-right"></i> <span>{{this.showStatusParty}}</span>
                            </b-button>

                            <b-button class="activated close" v-show="showStatusParty !== 'Aberto'"> 
                                    <i class="fas fa-lock"></i> <span>{{this.showStatusParty}}</span>
                            </b-button>
                        </div>

                    </div>
            </div>

            <div class="flip-card-back">
                    <div class="card-back-top">
                        <div class="card-back-leader">
                            <span>Lider: <strong>{{party.userId}}</strong></span>
                        </div>
                        <div class="party_icon_back" v-on:click="flipCard">
                            <i class="fas fa-undo-alt"></i>
                        </div>
                    </div>
                    <div class="card-back-description">
                        <p>Description: {{party.description}}</p>
                    </div>
               
            </div>
       
        </div>

    </div>
</template>

<script>
import { baseApiUrl } from '../../../global.js'
import axios from 'axios'
export default {
    name: 'PartyItem',
    props: ['party'],
    numbers: 1,
    players: [],
    data(){
        return{
            statusParty: null,
            showStatusParty: 'Aberto',
            qtdPlayers: null,
            isFlipped: true,
        }
    },
    methods:{
        getPlayer(){

        },
        enterParty(){
            this.statusParty = !this.statusParty
            console.log(this.statusParty)
        },
        countPlayers(){

            axios.get(`${baseApiUrl}/gamesParties/${this.party.gameId}`).then((res) => {
                this.players = res.data

            })
        },
        flipCard(){
            this.isFlipped = !this.isFlipped 
        }
    },
    watch: {
        statusParty() {
            this.statusParty === 1 ? this.showStatusParty = 'Aberto' : this.showStatusParty = 'Fechado'
        }
    },
    mounted(){
        this.statusParty = this.party.isOpen
        this.statusParty === 1 ? this.showStatusParty = 'Aberto' : this.showStatusParty ='Fechado'
        this.countPlayers()
    }
}
</script>

<style>

.party-item{
    display: flex;
    width: 380px;
    height: 270px;
    background-color: transparent;
    perspective: 1000px;
    border-radius: 25px;
    margin-bottom: 15px;
    background-color: #ffffff;
    padding: 0px 20px 20px;
    border: 1px solid rgba(0, 0, 0, 0.2);
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
    margin: 5px;
    background-color: #f2f2f2;
    padding: 20px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 50%;
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
    text-align: center;   
    border-width: 10px;
    border-style: solid;
    border-image: 
        linear-gradient( 
        #6666ff,
        rgba(0, 0, 0, 0)
        ) 0 0 90%;
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