<template>
  <div id="app">
    <Header :hideUserDropdown="!userData"/>
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
				validatingToken: true,
				userData:null
			}
	},
	methods: {async validateToken() {
			this.validatingToken = true

			const json = localStorage.getItem(userKey)
			this.userData = json 
			const userData = JSON.parse(json)
			this.$store.commit('setUser', null)

			if(!userData) {
				this.validatingToken = false
				return
			}

			const res = await axios.post(`${baseApiUrl}/validateToken`, userData)
			if (res.data) {
				this.$store.commit('setUser', userData)
				
	
			} else {
				this.userData = null
				localStorage.removeItem(userKey)
				this.$router.push({ path: '/signin' })
				
			}

			this.validatingToken = false
		}
	},
	created() {
		this.validateToken()
	},
	watch:{
		'$store.state.user' : function(){
			if(this.$store.state.user) 
			this.userData = this.$store.state.user
		}
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
