<template>
    <div class="new-party">
<b-card no-body>
    <b-card-header header-tag="nav">
      <b-nav card-header tabs>
        <b-nav-item active>Criar Party</b-nav-item>
        <b-nav-item>Editar Party</b-nav-item>
      </b-nav>
    </b-card-header>

    <b-card-body class="text-left">

      <b-card-text>
        <b-form @submit="onSubmit">
          <label for="input-live">Nome do Grupo</label>
          <b-form-input
            id="input-live"
            v-model="party.name"
            aria-describedby="input-live-help input-live-feedback"
            trim
          ></b-form-input>


          <label for="games">Selecione o jogo</label>
          <b-form-select id="games" v-model="gameSelected" :options="games" 
            v-on:change="getGameId"></b-form-select>

          <label for="platform">Selecione a plataforma</label>
          <b-form-select id="platform" v-model="platformSelected" :options="platforms"></b-form-select>

          <label for="numberPlayers">Número de Jogadores</label>
          <b-form-input
            id="numberPlayers"
            v-model="party.numberPlayers"
            aria-describedby="input-live-help input-live-feedback"
          ></b-form-input>

            <label for="textarea-default">Descrição</label>

            <b-form-textarea
              id="textarea-default"
              v-model="party.description"
            ></b-form-textarea>



          <b-form-group  label="Rank: " label-for="rank" v-show="verRank">
            <b-form-input
              id="rank"
              type="number"
              v-model="party.rank"
              aria-describedby="input-live-help input-live-feedback"
            ></b-form-input>
          </b-form-group>
        </b-form>

         <b-form-group label="Tags:">
      <b-form-tags v-model="value" no-outer-focus class="mb-2">
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
          
      </b-card-text>
      
        <b-form-group>
          <b-button class="mr-2" variant="primary" @click="onSubmit">Cadastrar</b-button>
          <b-button type="reset" class="mr-2" @click="onReset" variant="danger">Limpar</b-button>
        </b-form-group>
    </b-card-body>
  </b-card>

    </div>
</template>

<script>
import axios from 'axios'
import {baseApiUrl, showError} from '../../../global.js'
export default {
      name:'NewParty',
      data() {
      return {
        verRank: 0,
        party: {},
        gameSelected: '',
        platformSelected: '',
        optionsTags: ['Nenhum jogo foi selecionado'],
        search: '',
        value: [],
        platforms:['Nenhum jogo foi selecionado'],
        games:[],
        gameId: null
      }
    },
    methods: {
      async onSubmit(evt) {
        evt.preventDefault()
        this.party.filters = this.value
        this.party.gameId = this.gameId
        this.party.userId = this.$store.state.user.id
        this.party.platformId = this.platformSelected
        this.party.isOpen = 1

        await axios.post(`${baseApiUrl}/parties`, this.party)
          .then(()=>{           
              this.$toasted.global.defaultSuccess();
              this.party = {}
              this.$router.push({path: '/dashboard'})
          })
          .catch(showError); 
      },
      onReset(evt) {
        evt.preventDefault()
        this.party= {}
        this.gameSelected= ''
        this.platformSelected = ''
        this.optionsTags = ['Nenhum jogo foi selecionado']
        this.search = ''
        this.value = []
        this.platforms=['Nenhum jogo foi selecionado']
        this.games=[]
        this.gameId= null
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
      getGameId: async function(gameId) { // Just a regular js function that takes 1 arg
        this.gameId = gameId
        await axios.get(`${baseApiUrl}/games/${gameId}`)
          .then(res =>{
            this.verRank = res.data
          })
          this.verRank = this.verRank.rank ? 1 : 0
          this.getFilters()
          this.getPlatforms()
      },
      getFilters(){
        axios.get(`${baseApiUrl}/filters/${this.gameId}`)
          .then( res => {
            this.optionsTags = res.data.map( filter =>{
              return filter.name
            })
          })
      },
       getPlatforms(){
        axios.get(`${baseApiUrl}/platforms/${this.gameId}`)
          .then( res => {
            this.platforms  = res.data.map( platform =>{
               return { ...platform, value: platform.id, text: platform.name }
            })
          })
      }
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
      }
    },
    mounted(){
      this.loadGames()
     
    }
    


}
</script>

<style>
    .new-party{
        margin-top: 2%;
    }
</style>