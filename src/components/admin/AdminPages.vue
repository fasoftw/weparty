<template>
  <div class="games-pages">
    <div class="games-pages-tabs">
      <b-card no-body>
        <b-tabs card justified>
          <b-tab  title="Games" active>
            <NewGame />
          </b-tab>
          <b-tab  title="Filtros">
            <NewFilter />
          </b-tab>
          <b-tab  title="Categorias">
            <NewCategory />
          </b-tab>
        </b-tabs>
      </b-card>
    </div>

    <div class="lists">
      <template :class="{active: 'Games'}"><ListGames /></template>
      <template :class="{active: 'Filtros'}"><NewFilter /></template>
      <template :class="{active: 'Categorias'}"><NewCategory /></template>  
    </div>
  </div>

</template>

<script>
import NewGame from "./adminGames/NewGame";
import NewFilter from "./adminFilters/NewFilter";
import NewCategory from "./adminCategories/NewCategory";

import ListGames from "./adminGames/ListGames";
//import ListFilters from "./adminFilters/ListFilters";
//import ListCategories from "./adminCategories/ListCategories";
//ListFilters, ListCategories
export default {
  name: "GamesPage",
  components: { NewGame, NewFilter, NewCategory, ListGames, },
  
};
</script>

<style>
.games-pages {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 10px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

}
.lists {
  flex: 1;
  margin: 10px;
}
.games-pages-tabs {
  flex: 0.7;
  margin: 10px;
}

</style>