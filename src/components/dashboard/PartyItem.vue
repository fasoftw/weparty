<template>
    <div class="party-item">

        <div class="party-game-name">
            <span> Grupo:  <strong>{{ party.name }}</strong></span>
        </div>


        <div>
                <ul class="party-players">
                    <li class="party-player" v-for="player in party.numberPlayers" :key="player">
                        <div class="party-player-img">
                            <img 
                                src="@/assets/desconhecido.jpg"
                                height="50" width="50" alt="Player"
                            >
                        </div>
                        <div class="party-player-name">
                            {{party.numberPlayers}}
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

        <div class="party-status">
            <span>{{this.qtdPlayers}}/{{party.numberPlayers}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PartyItem',
    props: ['party'],
    numbers: 1,
    data(){
        return{
            statusParty: null,
            showStatusParty: 'Aberto',
            qtdPlayers: 1
        }
    },
    methods:{
        getPlayer(){

        },
        enterParty(){
            this.statusParty = 0;
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
    }
}
</script>

<style>

.party-item{
    border-radius: 25px;
    margin-bottom: 15px;
    background-color: #f2f2f2;
    padding: 0px 20px 20px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
}


.party-game-name{
    display: flex;
    justify-content: center;
    color:black;
    border-width: 5px;
    border-style: solid;
    border-image: 
        linear-gradient( 
        #6666ff,
        rgba(0, 0, 0, 0)
        ) 0 0 90%;
}

.party-game-name span{
    font-family:sans-serif;
    font-weight: 400;
}
.party-game-name strong{
    font-family:sans-serif;
    font-weight: 800;
}


.party-players{
    flex: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    padding-left: 0;
}

.party-player{
    
    margin: 5px;
    margin-bottom: 20px;
    background-color: #f2f2f2;
    padding: 20px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
}






.party-buttons{
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: center;
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
    cursor: not-allowed !important;
    opacity: .7;
    background-color: #af2424 !important;
    color: black !important;
}





        

</style>