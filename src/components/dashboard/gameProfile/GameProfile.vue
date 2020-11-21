<template>
  <div class="game-profile">
      <Nav />
      <b-card no-body>
        <b-card-header header-tag="nav">
        <b-nav card-header tabs>
            <b-nav-item active>Game Profile</b-nav-item>
        </b-nav>
        </b-card-header>

        <b-card-body class="text-left">
        <b-form>
           <label for="games">Select game</label>
            <v-select :options="options"
                            id="games"
                            @input="changedValue"
                            v-model="game.gameId">
            </v-select>

          <label for="platform" class="mt-2">Select platform </label>
          <b-form-select id="platform"
                            value-field="item"
                            text-field="name"
                            required                            
                            v-model="platformSelected" 
                            :options="platforms">
          </b-form-select>


         <label for="nickname">Nickname or Tag/ID</label>
          <b-form-input
            id="nickname"
            required
            v-model="name"
            aria-describedby="input-live-help input-live-feedback"
          ></b-form-input>      

            <b-form-group>
          <b-button class="mr-2 mt-2" variant="primary" @click="onSubmit">Cadastrar</b-button>
          <b-button type="reset" class="mr-2 mt-2" @click="onReset" variant="danger">Limpar</b-button>
        </b-form-group>
        </b-form>

           <b-table
                borderless
                outlined
                small
                hover 
                fixed
                no-border-collapse
                :items="this.profileUser"
                :fields="fields"
                head-variant
                table-variant
                 @row-clicked="myRowClickHandler"
            >  
            <template #cell(actions)="row">
              <b-button @click="onDelete(row.item)">
                <i class="fas fa-trash-alt"></i>
              </b-button>
           </template>
          </b-table>

        </b-card-body>
    </b-card>
  </div>
</template>

<script>
import Nav from '../Nav'
import vSelect from "vue-select";
import axios from 'axios'
import {baseApiUrl, showError} from '../../../../global.js'
import {mapState} from 'vuex'
export default {

    name: 'GameProfile',
    components: {Nav, vSelect},
    data(){
        return{
            options: [],
            gameProfile: {},
            name:'',
            game:{},
            profileUser: [],
             fields: [
                {key:'name', label: 'Name', sortable:true},
                {key:'gameName', label: 'Game', sortable:true},
                {key:'platformName', label: 'Platform', sortable:true},
                {key: "actions", label: "Actions" },
             ],
            platformSelected :'',
            platforms:[],
            disabled: true
        }
    },
    methods:{
        loadGames(){
          axios.get(`${baseApiUrl}/games`)
          .then(res =>{
            this.options = res.data.map(game => {
                      return {  value: game.id, label: game.name }
            })
          })
        },
        loadProfile(){
            axios.get(`${baseApiUrl}/game/profile/user/${this.$store.state.user.id}`)
            .then(res =>{
                this.profileUser = res.data
            })
        },
        async getPlatforms(id){
          
            await axios.get(`${baseApiUrl}/game/${id}/platforms`)
            .then( res => { 
                this.platforms  = res.data.map( platform =>{
                  return { ...platform, item: platform.platformId, name: platform.name }
              })
              this.platformSelected = this.platforms[0].platformId
            })   
            
        },
        onSubmit(){
          if(this.$store.state.user.id && this.platformSelected &&
              this.game.gameId.value && this.name){

              this.gameProfile.userId = this.$store.state.user.id
              this.gameProfile.platformId = this.platformSelected
              this.gameProfile.gameId = this.game.gameId.value
              this.gameProfile.name = this.name
         
              axios.post(`${baseApiUrl}/game/profile/user`, this.gameProfile)
              .then(() =>{
                  this.$toasted.global.defaultSuccess();
                  this.loadProfile()
                  this.onReset()
              }).catch(showError);  
            }
        },
        onReset(){
              this.name =""
              this.game={}
              this.platformSelected = ""
              this.platforms = []
              this.gameProfile = {}
        },
        onDelete(item){
              axios.delete(`${baseApiUrl}/game/profile/user/${item.id}`)
              .then(() =>{
                  this.$toasted.global.defaultSuccess();
                  this.loadProfile()
                  this.onReset()
              }).catch(showError);  
            
        },
        changedValue: function(value) {
             this.getPlatforms(value.value)

        },
        myRowClickHandler(record) {
              this.game.gameId = {value: record.gameId, label: record.gameName}
              this.name =record.name
              this.getPlatforms(record.gameId)
              this.platformSelected = record.platformId
        }
      },
      computed:{
            ...mapState(['user'])
      },
      mounted(){
            this.loadGames()
            this.loadProfile()
      }
      
}
</script>

<style>
    .game-profile{
        margin-top: 2%;
    }
</style>