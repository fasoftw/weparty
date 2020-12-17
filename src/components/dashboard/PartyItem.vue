<template>
    <div class="party-item" v-if="party" >
        
        <div class="party-inner"   :class="type !== 'edit' ? {'flip':!isFlipped } : {'flip':isFlipped }" >        
            
            <div class="flip-card-front"> 
                    <div class="party-game-info">
                        <div class="party_icon_exit" v-if="statusIn === true" v-on:click="leftParty">
                            <i class="fas fa-sign-out-alt"></i>
                        </div>
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
                        <div class="party_icon_exit"  v-if="statusIn === true" v-on:click="leftParty">
                            <i class="fas fa-sign-out-alt"></i>
                        </div>
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
                            <b-button class="btn green"   @click="enterParty"  v-show="showStatusParty === 'Enter'"> 
                                    <i class="fas fa-arrow-alt-circle-right"></i> <span>{{this.showStatusParty}} </span>
                                    <span><strong>- {{ cParty.spotsFilled}} / {{party.numberPlayers}} </strong></span><br>
                            </b-button>

                            <b-button class="btn red" v-show="showStatusParty === 'Closed'"> 
                                    <i class="fas fa-lock"></i> <span>{{this.showStatusParty}} </span>
                                    <span><strong>- {{ cParty.spotsFilled }} / {{party.numberPlayers}} </strong></span><br>
                            </b-button>

                            <b-button class="btn orange" v-show="showStatusParty === 'Waiting'"> 
                                    <i class="far fa-clock"></i> <span>{{this.showStatusParty}} </span>
                                    <span><strong>- {{ cParty.spotsFilled }} / {{party.numberPlayers}} </strong></span><br>
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
            showStatusParty: 'Open', //Party aberta ou fechada (ou usuario nela)
            isFlipped: false,
            counter: 0,
            players: [],
            numbers: 1,
            confirmDel: '',
            userId: null,   
            statusIn: null, 
            partyPlayerId: null, 
            profiles: null,
            cParty: {}

        }
    },
    methods:{
        enterParty(){
            if(this.profiles.length > 0)
            {
                this.party.profiles = this.profiles[0].id
                axios.post(`${baseApiUrl}/party/${this.party.id}/players`, {...this.party, playerId: this.userId})
                .then(() =>{
                    //if(res.data === 'closed party'){
                    //}
                    this.init();
                }) 
                .catch(showError)
            }
            else{
                console.log('voce nao tem profile')
            }
        },
        leftParty(){
            this.msgBoxConfirm = ''
            this.$bvModal.msgBoxConfirm('Are you sure you want to leave the party?', {
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
                    axios.delete(`${baseApiUrl}/party/${this.party.id}/user/${this.userId}`)
                    .then(() =>{
                        this.$toasted.global.defaultSuccess();
                        //this.party = null
                        //alterar tamanho da party // se for igual a 0 deletar a party. 
                        
                        this.init();
                    }) 
                    .catch(showError)
                }

            })
            .catch(showError)
        },
         remove(){
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
                    axios.delete(`${baseApiUrl}/parties/${this.party.id}`)
                    .then(() =>{
                        this.$toasted.global.defaultSuccess();
                    }) 
                    .catch(showError)
                }

            })
            .catch(showError)
        },
        toParty(id, party){
            this.$router.push({ name:'EditParty', params: {party: party}})
        },
        editParty(value){
            this.toParty(value.id, value)
        },

        flipCard(){
            this.isFlipped = !this.isFlipped 
        },


        getTags(id){
             axios.get(`${baseApiUrl}/party/${id}/filters`).then((res) => {
                this.party.filters = res
               // console.log(this.party.filters)
             })
        },
       
        getPlayers(){
            axios.get(`${baseApiUrl}/party/${this.party.id}/players`).then((res) => {
                this.players = res.data.party
             })
        },
        inTheParty(){
                axios.get(`${baseApiUrl}/party/${this.party.id}/user/${this.userId}`)
                .then( (res) => {
                    if(res.data.party.length >= 1){  //Se user esta na party
                         this.statusIn = true
                         this.partyPlayerId = res.data.party[0].id
                         
                    }
                    else{ // User nao esta na party
                        this.statusIn = false
                        this.partyPlayerId = null
                    }
                    this.isPartyClosed() //Verificando vagas da party
                })
        },
        isPartyClosed(){
            if(this.cParty.isOpen === 1){
                if(this.statusIn === true){
                    this.showStatusParty = 'Waiting'
                }else{
                    this.showStatusParty = 'Enter'
                }
            }else{
                if(this.statusIn === true){
                    this.showStatusParty = 'Closed'
                }else{
                    this.showStatusParty = 'Closed'
                }   
            }

        },
        getProfileGame(){
            axios.get(`${baseApiUrl}/user/${this.userId}/game/${this.party.gameId}/platform/${this.party.platformId}`)
            .then( res => {
                this.profiles = res.data
            })
            .catch(showError)
        },
        getParty() {
            axios.get(`${baseApiUrl}/parties/${this.party.id}`)
            .then( res => {
                this.cParty = res.data.party[0]
                this.inTheParty() 
                this.getPlayers()
            })
            .catch(showError)
        },
        init(){
            this.userId = this.$store.state.user.id
            this.getParty()
            this.getProfileGame()
        }
    },
    mounted(){
        this.init()
    },
    watch: {
        party: function(){
            this.$emit('update:party', this.party)
            this.numberPlayers = this.party.numberPlayers
        }
    }
}
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Open+Sans);
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


.link:hover {
  color: #2ecc71;
  border-bottom: 2px dotted #2ecc71;
}

/* button div */
#buttons {
  padding-top: 50px;
  text-align: center;
}

/* start da css for da buttons */
.party-buttons .btn {
  border-radius: 5px;
padding:0.46em 1.6em; 
  font-size: 18px;
  text-decoration: none;
  margin: 20px;
  color: #fff;
  position: relative;
  display: inline-block;
}

.btn:active {
  transform: translate(0px, 5px);
  -webkit-transform: translate(0px, 5px);
  box-shadow: 0px 1px 0px 0px;
}

.green {
  background-color: #2ecc71;
  box-shadow: 0px 5px 0px 0px #15B358;
}

.green:hover {
  background-color: #48E68B;
}

.red {
  background-color: #e74c3c;
  box-shadow: 0px 5px 0px 0px #CE3323;
}

.red:hover {
  background-color: #FF6656;
}

.orange {
  background-color: #e67e22;
  box-shadow: 0px 5px 0px 0px #CD6509;
}

.orange:hover {
  background-color: #FF983C;
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


/* Botoes antigo
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
*/

</style>


