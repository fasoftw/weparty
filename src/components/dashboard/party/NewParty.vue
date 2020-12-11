<template>
<div class="new-party">
  <b-container fluid>
           <b-row cols="1" cols-sm="2" cols-md="4" cols-lg="1">
               
            <b-card no-body>
                 <template #header>
                        <h6 class="mb-0">Create party</h6>
                </template>
                <b-card-body class="text-left">
                   
                <b-card-text>
                    <b-form @submit="onSubmit">
                    <label for="input-name">Party name </label>  
                    <b-icon icon="question-circle" 
                    v-b-tooltip.hover.rightbottom.v-light="'Name of your party. Ex: Searching for DPS'"
                    id="icon-name" scale="1" aria-hidden="true" class="ml-1 mt-2"
                    width="12px" heigth="12px"></b-icon>
                    
                    <b-form-input
                        id="input-name"
                        name="input-name"
                        :state="validateState('name')"
                        v-model="party.name"
                        aria-describedby="input-live-help input-live-feedback">
                    </b-form-input>

                    <b-form-invalid-feedback
                    id="input-1-live-feedback">This is a required field.
                    </b-form-invalid-feedback>



                    <label for="games">Select game</label>
                    <b-form-select id="games" v-model="party.gameSelected" 
                        :state="validateState('gameSelected')"
                        :options="games"
                        aria-describedby="input-games-feedback"
                        v-on:change="getGameId">
                    </b-form-select>

                        <b-form-invalid-feedback
                        id="input-games-feedback">This is a required field.
                        </b-form-invalid-feedback>

                        <b-form-group v-show="showForm">

                            <label for="platform"> Selected platform</label>
                            <b-form-select id="platform" v-model="party.platformSelected"
                            :state="validateState('platformSelected')" 
                            aria-describedby="input-platforms-feedback"
                            :options="platforms">
                            </b-form-select>

                            <b-form-invalid-feedback
                            id="input-platforms-feedback">This is a required field.
                            </b-form-invalid-feedback>

                
                            <label for="textarea-default">Party Description</label>
                            <b-form-textarea
                                id="textarea-default"
                                :state="validateState('description')"
                                aria-describedby="input-textarea-default-feedback"
                                v-model="party.description">
                            </b-form-textarea>

                            <b-form-invalid-feedback
                            id="input-textarea-default-feedback">This is a required field.
                            </b-form-invalid-feedback>

                            <label for="numberPlayers">Number of Players</label>
                             <b-icon icon="question-circle" 
                                v-b-tooltip.hover.rightbottom.v-light="'Number of spots game to find new players to your party'"
                                scale="1" aria-hidden="true" class="ml-1 mt-2"
                                width="12px" heigth="12px">
                            </b-icon>
                    
                            <b-input id="numberPlayers" type="number" min="0"
                            :state="validateState('numberPlayers')"
                            aria-describedby="input-numberPlayers-feedback"
                             :max="maxPlayers" v-model="party.numberPlayers" ></b-input>

                            <b-form-invalid-feedback
                            id="input-numberPlayers-feedback">This is a required field and max number players is {{maxPlayers}}.
                            </b-form-invalid-feedback>

                            <b-form-group v-show="rankParty">
                            <label for="rank">Rank</label>
                            <b-icon icon="question-circle" 
                                v-b-tooltip.hover.rightbottom.v-light="'If you want choose a rank to invite players'"
                                scale="1" aria-hidden="true" class="ml-1 mt-2"
                                width="12px" heigth="12px">
                            </b-icon>
                    
                            <b-form-input
                                id="rank"
                                type="number"
                                v-model="party.rank"
                                aria-describedby="input-live-help input-live-feedback"
                            ></b-form-input>
                            </b-form-group>

                        <b-form-group >
                            <label for="tags">Tags</label>
                            <b-icon icon="question-circle" 
                                v-b-tooltip.hover.rightbottom.v-light="'Tags to describe your spots of the game'"
                                scale="1" aria-hidden="true" class="ml-1 mt-2"
                                width="12px" heigth="12px">
                            </b-icon>
                    
                            <b-form-tags id="tags" v-model="value" no-outer-focus class="mb-2">
                            <template v-slot="{ tags, disabled, addTag, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                    <b-form-tag
                                    @remove="removeTag(tag)"
                                    :title="tag"
                                    :disabled="disabled"
                                    variant="info"
                                    >{{ tag }}</b-form-tag>
                                </li>
                                </ul>

                            <b-dropdown size="sm" variant="outline-secondary" block menu-class="w-100">
                            <template #button-content>
                                <b-icon icon="tag-fill"></b-icon> Choose tags
                            </template>
                            <b-dropdown-form @submit.stop.prevent="() => {}">
                                <b-form-group
                                label-for="tag-search-input"
                                label="Search tags"
                                label-cols-md="auto"
                                class="mb-0"
                                label-size="sm"
                                :description="searchDesc"
                                :disabled="disabled"
                                >
                                <b-form-input
                                    v-model="search"
                                    id="tag-search-input"
                                    type="search"
                                    size="sm"
                                    autocomplete="off"
                                ></b-form-input>
                                </b-form-group>
                            </b-dropdown-form>
                            <b-dropdown-divider></b-dropdown-divider>
                            <b-dropdown-item-button
                                v-for="option in availableOptions"
                                :key="option"
                                @click="onOptionClick({ option, addTag })"
                            >
                                {{ option }}
                            </b-dropdown-item-button>
                            <b-dropdown-text v-if="availableOptions.length === 0">
                                There are no tags available to select
                            </b-dropdown-text>
                            </b-dropdown>
                            
                            </template>
                            </b-form-tags>
                            </b-form-group>
                    </b-form-group>
                    </b-form>
                    
                </b-card-text>
                
                    <b-form-group>
                    <b-button class="mr-2" variant="primary" :disabled="!showForm" @click="onSubmit">Cadastrar</b-button>
                    <b-button type="reset" class="mr-2" @click="onReset" variant="danger">Limpar</b-button>
                    </b-form-group>
            
                </b-card-body>
            </b-card>
           </b-row>
  </b-container>

    </div>
</template>

<script>
import axios from 'axios'
import { validationMixin } from "vuelidate";
import { required,between } from "vuelidate/lib/validators";
import {baseApiUrl, showError} from '../../../../global.js'

export default {
      mixins: [validationMixin],
      name:'NewParty',
      props: ['type', 'partySelected'],
      data() {
      return {
        rankParty: 0,
        gameChoosed: {},
        party: {},
        maxPlayers: 0,
        optionsTags: ['Nenhum jogo foi selecionado'],
        search: '',
        value: [],
        platforms:['Nenhum jogo foi selecionado'],
        game: null,
        games:[],
        gameId: null,
        showForm: false
      }
    },
    validations: {
      party: {
        name: {
          required
        },
        gameSelected:{
          required
        },
        platformSelected:{
          required
        },
        description:{
          required
        },
        numberPlayers:{
          required,
         between (value) {
           return between(0, this.maxPlayers)(value)
          }
        }
      }
    },
    methods: {
      async onSubmit(evt) {
        evt.preventDefault()
        this.$v.party.$touch();

        if (this.$v.party.$anyError) {
          return;
        }
        if(!this.$route.params.party){
            this.party.gameId = this.gameId
            this.party.userId = this.$store.state.user.id
            this.party.isOpen = 1
        }
        this.party.platformId = this.party.platformSelected
      
        this.party.filters = this.value
        const method = this.party.id ? "put" : "post";
        const id = this.party.id ? `/${this.party.id}` : "";
      

        await axios[method](`${baseApiUrl}/parties${id}`, this.party)
          .then((res)=>{ 
              this.addPlayerParty(res.data[0])  //Id Party
          })
          .catch(showError);
           
      },
      addPlayerParty(partyId){

        axios.post(`${baseApiUrl}/party/${partyId}/players`, {...this.party, playerId: this.party.userId})
            .then( () => {
                this.$toasted.global.defaultSuccess();
                this.party = {}
                console.log('ola'+this.gameId)
                this.$router.push({path: `/partiesgame/${this.gameId}` })
              //this.$router.push({path: '/dashboard/party/view'})
            }) 
        .catch(showError)
       
      },
      onReset(evt) {
        evt.preventDefault()
        this.party= {}
        this.gameSelected= ''
        this.platformSelected = ''
        this.numberPlayers = '',
        this.optionsTags = ['Nenhum jogo foi selecionado']
        this.search = ''
        this.value = []
        this.platforms=['Nenhum jogo foi selecionado']
        this.games=[]
        this.gameId= null
        this.loadGames()
      },
      onOptionClick({ option, addTag }) {
        addTag(option)
        this.search = ''
      },
      loadGames(){
          axios.get(`${baseApiUrl}/games`)
          .then(res =>{
            this.games = res.data.map(game => {
                      return { ...game, value: game.id, text: game.name }

          })
        })
      },
      getGameId: async function(gameId) { 
        this.gameId = gameId
        await axios.get(`${baseApiUrl}/games/${gameId}`)
          .then(res =>{
            this.gameChoosed = res.data            
          })
          this.maxPlayers = this.gameChoosed.maxPlayers
          this.rankParty = this.gameChoosed.rank ? 1 : 0         
 
          this.getFilters()
          this.getPlatforms()
      },
      getFilters: async function(){
        axios.get(`${baseApiUrl}/game/${this.gameId}/filters`)
          .then( res => {
            this.optionsTags = res.data.map( filter =>{
              return filter.name
            })
          })
      },
       getPlatforms(){
        axios.get(`${baseApiUrl}/game/${this.gameId}/platforms`)
          .then( res => {
            this.platforms  = res.data.map( platform =>{
               return { ...platform, value: platform.id, text: platform.name }
            })
          })
      },
      validateState(name) {
        const { $dirty, $error } = this.$v.party[name];
        return $dirty ? !$error : null;
      },
    },
    computed: {
      criteria() {
        // Compute the search criteria
        return this.search.trim().toLowerCase()
      },
      availableOptions() {
        const criteria = this.criteria
        // Filter out already selected options
        const options = this.optionsTags.filter(opt => this.value.indexOf(opt) === -1)
        if (criteria) {
          // Show only options that match criteria
          return options.filter(opt => opt.toLowerCase().indexOf(criteria) > -1);
        }
        // Show all options available
        return options
      },
      searchDesc() {
        if (this.criteria && this.availableOptions.length === 0) {
          return 'There are no tags matching your search criteria'
        }
        return ''
      },
      maxPlayersFunction(gameid){
        if(gameid){
          return 1
        } else{
          return 0
        }
      
      }
    },
    mounted(){
      if(this.$route.params.party){
          //console.log(this.$route.params.party)
         this.party =  this.$route.params.party 
         this.maxPlayers = this.party.maxPlayers
         this.rankParty = this.party.gameRank ? 1 : 0   
        
         this.party.gameSelected = this.party.gameId
         this.party.platformSelected = this.party.platformId
         this.gameId = this.party.gameId
         this.value = this.party.filters
         this.party.name = this.party.partyName
         this.value = this.value.map( filter =>{
              return filter.name
          })


        this.getFilters()
      }
      //this.getPlatforms()
      this.loadGames()   
      
     
    },
    watch:{
      'party.gameSelected': function(value){
        if(value !== ''){
          this.showForm = true
        }
      }
    }
    


}
</script>

<style>
    .new-party{
        margin-top: 2%;
    }
</style>