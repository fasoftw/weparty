<template>
  <div class="add-game">
    <b-form>
      <input id="game-id" type="hidden" />

      <b-form-group label="Nome: " label-for="game-name">
        <b-form-input id="game-name" type="text" 
        v-model="gameS.name" required
        :readonly="modeS === 'remove'"
        />
      </b-form-group>

      <b-form-group label="Imagem(URL): " label-for="game-imageUrl">
        <b-form-input id="game-imageUrl" type="url" 
          v-model="gameS.imageUrl" required
          :readonly="modeS === 'remove'"
        />
      </b-form-group>

      <b-form-group label="Descrição: " label-for="game-description">
        <b-form-input id="ame-description" type="text" 
          v-model="gameS.description" required
          :readonly="modeS === 'remove'"
        />
      </b-form-group>

      <b-form-group label="Categoria: " label-for="game-category">
        <b-form-input id="game-category" 
          v-model="gameS.categoryId" required
          :readonly="modeS === 'remove'"
        />
      </b-form-group>

      <b-form-group label="Número de jogadores: " label-for="game-num-players">
        <b-form-input id="game-num-players" type="number" 
          v-model="gameS.maxPlayers" required
          :readonly="modeS === 'remove'"
        />
      </b-form-group>

      <b-form-group label="Level Máximo: " label-for="game-max-level">
        <b-form-input id="game-max-level" type="number" 
          v-model="gameS.levelMax" required
          :readonly="modeS === 'remove'"
        />
      </b-form-group>

      <b-form-group label="Filtros: " label-for="game-filters">
        <b-form-select id="game-filters" />
      </b-form-group>
    </b-form>

    <div class="buttons">
      <b-button class="mr-3" variant="success" v-if="modeS === 'save'"> Salvar
      </b-button>
      <b-button class="mr-3" variant="danger" v-if="modeS === 'remove'" @click="remove">
        Remover
      </b-button>
      <b-button variant="primary" @click="reset"> Cancelar </b-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//import axios from 'axios'
//import { baseApiUrl, showError } from '../../../global.js'

export default {
  name: "NewGame",
  data: function () {
    return {
      game:{},
      fields: [],
    };
  },
  computed: mapState(["gameS", "modeS"]),
  methods: {
    save() {},
    remove() {},
    reset() {
      this.$store.commit("resetGame");
    },
  },
  watch:{          
  },
  mounted(){
    this.$store.commit("resetGame");
  }
};
</script>

<style>
.add-game {
  display: flex;
  flex-direction: column;
  margin: 10px;
}

b-form-input {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.9);
}

.buttons {
  display: flex;
  flex-direction: row;
}
</style>