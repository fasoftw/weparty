<template>
  <div class="games-pages">
    <div class="games-pages-tabs">
      <b-card no-body>
        <b-tabs card justified>
          <b-tab  title="Games" active>
            <NewGame />
          </b-tab>
 <!--         <b-tab  title="Plataformas">
            <NewPlatform />
          </b-tab> -->
<!--          <b-tab  title="Filtros">
            <NewFilter />  
          </b-tab>-->
          <b-tab  title="Categorias">
            <NewCategory />
          </b-tab>
        </b-tabs>
      </b-card>
    </div>

  </div>

</template>

<script>
import NewGame from "./adminGames/NewGame";
//import NewFilter from "./adminFilters/NewFilter";
import NewCategory from "./adminCategories/NewCategory";
//import NewPlatform from "./adminPlatform/NewPlatform";

export default {
  name: "GamesPage",
  components: { NewGame, NewCategory},
  
};
</script>

<style>
.games-pages {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 10px;

}

.games-pages-tabs {
  flex: 1;
  margin: 10px;
}

</style>