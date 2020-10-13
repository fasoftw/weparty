<template>
  <div id="app"  :class="{'hide-menu': !menuVisible }">
    <Header />
    <Menu v-if="menuVisible"/>
    <Content />
    <Footer />
  </div>
</template>

<script>

import Content from './components/template/Content'
import Footer from './components/template/Footer'
import Header from './components/template/Header'
import Menu from './components/template/Menu'
import {mapState} from 'vuex'

export default {
  name: 'App',
  components: {Content, Footer, Header, Menu},
  computed: mapState(['menuVisible'])
}
</script>

<style>
* {
		font-family: "Arial", sans-serif;
	}

	body {
		margin: 0;
	}

	#app {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		height: 100vh;
		display: grid;
		grid-template-rows: 60px 1fr 40px;
		grid-template-columns: 300px 1fr;
		grid-template-areas:
			"header header"
			"menu content"
			"footer footer";
	}


	#app.hide-menu {
		grid-template-areas:
			"header header"
			"content content"
			"footer footer";
	}
</style>
