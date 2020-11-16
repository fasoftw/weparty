<template>
  <div class="game-admin">
    <div class="add-games">
      <b-form>
        <input id="game-id" type="hidden" />

        <b-form-group label="Nome: " label-for="game-name" label-cols-sm="2">
          <b-form-input
            id="game-name"
            type="text"
            v-model="game.name"
            required
            :readonly="mode === 'remove'"
            placeholder="Informe o Nome do Jogo..."
          />
        </b-form-group>

        <b-form-group label="Imagem(URL): " label-for="game-imageUrl"  v-if="mode === 'save'" label-cols-sm="2">
              <b-form-input id="game-imageUrl" size="lg" v-model="game.imageUrl"></b-form-input>
        </b-form-group>

        <b-form-group label="Descrição: " label-for="game-description" v-if="mode === 'save'" label-cols-sm="2">
          <b-form-textarea
            id="ame-description"
            type="text"
            size="md"
            rows="3"
            max-rows="8"
            no-auto-shrink
            v-model="game.description"
            required
            :readonly="mode === 'remove'"
            placeholder="Informe a descrição do jogo..."
          />
        </b-form-group>


        <b-form-group label="Núm. Jogadores:" label-for="game-num-players" v-if="mode === 'save'" label-cols-sm="2"> 
          <b-form-input
            id="game-num-players"
            type="number"
            v-model="game.maxPlayers"
            required
            :readonly="mode === 'remove'"
            placeholder="Informe o número de jogados por grupo..."
          />
        </b-form-group>

        <b-form-group label="Level Máximo: " label-for="game-max-level" v-if="mode === 'save'" label-cols-sm="2">
          <b-form-input
            id="game-max-level"
            type="number"
            v-model="game.levelMax"
            required
            :readonly="mode === 'remove'"
            placeholder="Informe o level máximo do Jogo..."
          />
        </b-form-group>

        <b-form-group label="Categoria: " label-for="game-category" v-if="mode === 'save'" label-cols-sm="2">
          <template>
              <b-form-select v-model="game.categoryId" :options="categories" 
                value-field="id"
                text-field="name"
              >
              </b-form-select>
          </template>
        </b-form-group>

        
        <b-form-group label="Rank: " label-for="game-rank" v-if="mode === 'save'" label-cols-sm="2">
        <toggle-button id="game-rank"
                       :width=75
                       :height=35
                       v-model="game.rank"
                                    
        />
        </b-form-group>
      
        <b-form-group label="Plataformas: " label-for="game-platform" v-if="mode === 'save'" label-cols-sm="2">
           <b-form-select id="game-platform" v-model="game.platformsSelected" 
              :options="platforms" 
              multiple :select-size="Number(platforms.length)"
              value-field="id"
              text-field="name"
           >
           </b-form-select>
          <div class="mt-3">Selecionados: <strong>{{ game.platformsSelected }} </strong></div>
        </b-form-group>

        <b-form-group>
           <b-form-tags  v-if="mode === 'save'" v-model="game.filtersSelected" no-outer-focus class="mb-2">
              <template v-slot="{ tags, inputAttrs, inputHandlers, addTag, removeTag }">
                <b-input-group aria-controls="my-custom-tags-list">
                  <input
                    v-bind="inputAttrs"
                    v-on="inputHandlers"
                    placeholder="New tag - Press enter to add"
                    class="form-control">
                  <b-input-group-append>
                    <b-button @click="addTag()" variant="primary">Add</b-button>
                  </b-input-group-append>
                </b-input-group>
                <ul
                  id="my-custom-tags-list"
                  class="list-unstyled d-inline-flex flex-wrap mb-0"
                  aria-live="polite"
                  aria-atomic="false"
                  aria-relevant="additions removals"
                >
                  <!-- Always use the tag value as the :key, not the index! -->
                  <!-- Otherwise screen readers will not read the tag
                      additions and removals correctly -->
                  <b-card
                    v-for="tag in tags"
                    :key="tag"
                    :id="`my-custom-tags-tag_${tag.replace(/\s/g, '_')}_`"
                    tag="li"
                    class="mt-1 mr-1"
                    body-class="py-1 pr-2 text-nowrap"
                  >
                    <strong>{{ tag }}</strong>
                    <b-button
                      @click="removeTag(tag)"
                      variant="link"
                      size="sm"
                      :aria-controls="`my-custom-tags-tag_${tag.replace(/\s/g, '_')}_`"
                    >remove</b-button>
                  </b-card>
                </ul>
              </template>
            </b-form-tags>
        </b-form-group>

        



      </b-form>

      <div class="buttons">
        <b-button
          class="mr-3"
          variant="success"
          v-if="mode === 'save'"
          @click="save"
        >
          Salvar
        </b-button>
        <b-button
          class="mr-3"
          variant="danger"
          v-if="mode === 'remove'"
          @click="remove"
        >
          Remover
        </b-button>
        <b-button variant="primary" @click="reset"> Cancelar </b-button>
      </div>
    </div>

    <hr />

    <div class="table-games">
      <b-table hover striped :items="games" :fields="fields">
        <template #cell(actions)="row">
          <b-button @click="loadGame(row.item)" class="mr-2">
            <i class="fas fa-pencil-alt"></i>
          </b-button>
          <b-button @click="loadGame(row.item, 'remove')">
            <i class="fas fa-trash-alt"></i>
          </b-button>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "../../../../global";

export default {
  name: "NewGame",
  data: function () {
    return {
      mode: "save",
      game: {
        "platformsSelected": []
      },
      games: [],
      categories: [],
      platforms: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "actions", label: "Ações" },
      ],
      
    };
  },
  methods: {
    save() {
    
      this.game.platforms = this.game.platformsSelected
      this.game.filters = this.game.filtersSelected


      const method = this.game.id ? "put" : "post";
      const id = this.game.id ? `/${this.game.id}` : "";
      
      axios[method](`${baseApiUrl}/games${id}`, this.game)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError); 
    },
    remove() {
      const id = this.game.id
      
      axios.delete(`${baseApiUrl}/games/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);

    },
    reset() {
      this.mode = "save" 
      this.game = {} 
      this.game.platformsSelected = []
      this.game.filtersSelected = []
      this.platforms = []
      this.getPlatforms()
      this.loadGames()
    },
    loadGame(game, mode = 'save') {
      
        this.mode = mode
        this.game = {
          "platformsSelected": [],
          "filtersSelected": []
        }
        this.game.id = game.id
        this.game.name = game.name
        this.game.imageUrl = game.imageUrl
        this.game.description = game.description
        this.game.categoryId = game.categoryId
        this.game.rank = game.rank === 1 ? true : false
        this.game.maxPlayers = game.maxPlayers
        this.game.levelMax = game.levelMax

        
        this.getFiltersByGameId(game.id)
        this.getPlatformsByGameId(game.id)

    },
    loadGames() {
      const url = `${baseApiUrl}/games`;
      axios.get(url).then((res) => {
        this.games = res.data;
      });
    },
    async getCategories(){
      const url = `${baseApiUrl}/categories`
      await axios.get(url)
              .then( res => {
                  this.categories = res.data.map( category => {
                      return {id:category.id, name: category.name}
                  })
              })
      
    },
    async getPlatforms(){
      const url = `${baseApiUrl}/platforms`
      await axios.get(url)
              .then( res => {
                
                  this.platforms = res.data.map( platform => {
                      return {id:platform.id, name: platform.name}
                  })
                  
              })
      
    },
    getPlatformsByGameId(id){
      const url = `${baseApiUrl}/platforms/${id}`
      axios.get(url)
     
              .then( res => {
                  this.game.platformsSelected = res.data.map( platform => {
                     
                      return platform.platformId
                  })        

              })
      
    },

    getFiltersByGameId(id){
      const url = `${baseApiUrl}/filters/${id}`
      axios.get(url)     
              .then( res => {                  
                  this.game.filtersSelected = res.data.map( filter => {
                     
                      return filter.name
                  })                
                  
              })    
    }
  },
  mounted() {
    this.reset()
    this.getCategories()
    this.getPlatforms()
    this.game.filtersSelected =[]
  },
};
</script>

<style>
.game-admin {
  display: flex;
  flex-direction: row;
}

.add-games{
  flex: 1;
  padding: 10px;
  
}

.table-games{
  flex: 1;
  padding: 10px;
  box-shadow: 0px 0px 1px black;
}

b-form-input {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.9);
}

.buttons {
  display: flex;
  flex-direction: row;
}

.list .list-filter {
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid #aaa;
}

.list h1 {
  display: flex;
  justify-content: center;
}

.list .list-filter i {
  color: #aaa;
  margin-right: 10px;
}

.list input {
  color: black;
  font-size: 1.3rem;
  border: 0;
  outline: 0;
  width: 100%;
  background: transparent;
}


</style>