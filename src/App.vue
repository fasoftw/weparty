<template>
  <div id="app">
    <Header :hideUserDropdown="!user"/>
	<Loading v-if="validatingToken" />
    <Content />
  </div>
</template>

<script>

import Content from './components/template/Content'
import Header from './components/template/Header'
import Loading from './components/template/Loading'
import {mapState} from 'vuex'
import axios from "axios"
import { baseApiUrl, userKey } from "../global"

export default {
  name: 'App',
  components: {Content, Header,Loading},
  computed: mapState(['user']),
  data: function() {
		return {
			validatingToken: true
		}
},
  methods: {async validateToken() {
			this.validatingToken = true

			const json = localStorage.getItem(userKey)
			const userData = JSON.parse(json)
			this.$store.commit('setUser', null)

			if(!userData) {
				this.validatingToken = false
				this.$router.push({ name: '/' })
				return
			}

			const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

			if (res.data) {
				this.$store.commit('setUser', userData)
				
	
			} else {
				localStorage.removeItem(userKey)
				this.$router.push({ name: '/' })
			}

			this.validatingToken = false
		}
	},
	created() {
		this.validateToken()
	}
}
</script>

<style>
* {
		font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
		font-size: 1.1rem;
	}

	body {
		margin: 0;
	}

	#app {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		height: 100vh;
		display: grid;
		grid-template-rows: 60px 1fr;
		grid-template-columns: 1fr;
		grid-template-areas:
			"header header"
			"content content";
	}

</style>
