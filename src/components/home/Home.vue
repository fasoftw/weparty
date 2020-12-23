<template>
  <div class="home">
    <div class="card-games">
        <b-container fluid>
          <b-row cols="1" cols-sm="2" cols-md="3" cols-lg="4">
            <b-col
              v-for="(game, id) in games"
              :key="id"
              col
              no-gutters
              class="mb-2"
            >
            
              <b-card 
                :title="game.name"
                :img-src="game.imageUrl"
                img-alt="Image"
                img-top
                style="max-width: 18rem; margin-top: 10px"
              > 
                <b-card-text>
                  {{ game.description }}
                </b-card-text>

                <b-button variant="outline-primary" v-if="user" @click="toParty(game.id)"
                  >Visualizar</b-button
                >
                <b-button variant="outline-primary" v-else to="/signin"
                  >Visualizar</b-button
                >
              </b-card>  
            </b-col>
          </b-row>
        </b-container>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl } from "../../../global.js";
import { mapState } from "vuex";
export default {
  name:'home',
  data() {
    return {
      games: [],
    };
  },
  methods: {
    loadGames() {
      axios.get(`${baseApiUrl}/games`).then((res) => {
        this.games = res.data;
      });
    },
    toParty(gameId){
      this.$router.push({ name:'PartyGameId', params: {id: gameId}})
    },
    teste(){
      console.log(this.$store.state.user)
    }
  },
  computed: {
    ...mapState(["user"]),
  },
  mounted() {
    this.loadGames();
    this.teste()
  },
};
</script>

<style scoped>
.card-games {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
}
/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
}

@media only screen and (min-width: 1400px) {
}

.card-deck .card {
  max-width: calc(25% - 30px);
}
</style>