<template>
  <div class="list">
    <h1>Categorias</h1>
    <div class="list-filter">
      <i class="fas fa-search fa-lg"></i>
      <input
        type="text"
        placeholder="Digite para filtrar..."
        class="filter-field"
      />
    </div>

    <hr>

    
    <div class="table-games">
        <b-table hover striped :items="games" :fields="fields">
        <template  #cell(actions)="row"> 
                <b-button @click="loadGame(row.item, 'save')" class="mr-2">
                    <i class="fas fa-pencil-alt"></i>
                </b-button>
                <b-button  @click="loadGame(row.item, 'remove')">
                    <i class="fas fa-trash-alt"></i>
                </b-button>
        </template >
      </b-table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from "axios";
import { baseApiUrl } from "../../../../global";

export default {
  name: "ListGames",
  data() {
    return {
      games: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        {key: 'actions', label: 'Ações'}
      ],
    };
  },
  computed: mapState(['gameS'], ['modeS']),
  methods: {
    loadGames() {
      const url = `${baseApiUrl}/games`;
      axios.get(url).then((res) => {
        this.games = res.data;
      });
    },
    loadGame(game, mode) {
      this.$store.commit("setGame", {game, mode});
    },
  },
  mounted() {
    this.loadGames();
  },
};
</script>

<style>
.list .list-filter {
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid #aaa;
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