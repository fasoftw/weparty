<template>
  <div class= "articles">
       <b-form>
            <input id="article-id" type="hidden" v-model="article.id" />
            <b-form-group label="Name:" label-for="article-name">
                <b-form-input id="article-name" type="text"
                    v-model="article.name" required
                    :readonly="mode === 'remove'"
                />
            </b-form-group>
            <b-form-group label="Description" label-for="article-description">
                <b-form-input id="article-description" type="text"
                    v-model="article.description" required
                    :readonly="mode === 'remove'"/>
            </b-form-group>
            <b-form-group v-if="mode === 'save'"
                label="Image (URL):" label-for="article-imageUrl">
                <b-form-input id="article-imageUrl" type="text"
                    v-model="article.imageUrl" required
                    :readonly="mode === 'remove'"
                 />
            </b-form-group>
            <b-form-group v-if="mode === 'save'" 
                label="Author:" label-for="article-userId">
                <b-form-select id="article-userId"
                    :options="users" v-model="article.userId" />
            </b-form-group>
            <b-form-group v-if="mode === 'save'"
                label="Content" label-for="article-content">
                <VueEditor v-model="article.content" />
            </b-form-group>
            <b-button variant="primary" v-if="mode === 'save'"
                @click="save">Salvar</b-button>
            <b-button variant="danger" v-if="mode === 'remove'"
                @click="remove">Excluir</b-button>
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-form>
        <hr>
        
        <b-table id="my-table" hover striped :items="articles" 
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        small>
            <template #cell(actions)="row">
                <b-button variant="warning" @click="loadArticle(row.item)" class="mr-2">
                     <i class="fas fa-pencil-alt"></i>
                </b-button>
                <b-button variant="danger" @click="loadArticle(row.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
         <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
          ></b-pagination>
  </div>
</template>

<script>

import { VueEditor } from "vue2-editor"
import { baseApiUrl, showError} from '../../../../global'
import axios from 'axios'

export default {
    name: 'Articles',
    components: { VueEditor },
    data: function() {
        return {
            mode: 'save',
            article: {},
            articles: [],
            users: [],
            perPage: 3,
            currentPage: 1,
            fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'name', label: 'Nome', sortable: true },
                { key: 'description', label: 'Descrição', sortable: true },
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    methods:{
        loadUsers() {
            const url = `${baseApiUrl}/users`
            axios.get(url).then(res => {
                this.users = res.data.map(user => {
                    return { value: user.id, text: `${user.name} - ${user.email}` }
                })
            })
        },
        
        reset(){
            this.mode = 'save'
            this.article = {}
            this.articles = []
            this.perPage = 3
            this.currentPage = 1
        },
        save() {
            const method = this.article.id ? 'put' : 'post'
            const id = this.article.id ? `/${this.article.id}` : ''
            console.log(this.article)
            axios[method](`${baseApiUrl}/articles${id}`, this.article)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.article.id
            axios.delete(`${baseApiUrl}/articles/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadArticle(article, mode = 'save') {
            this.mode = mode
            axios.get(`${baseApiUrl}/articles/${article.id}`)
                .then(res => this.article = res.data)
        },
         loadArticles() {
            const url = `${baseApiUrl}/articles?page=${this.page}`
            axios.get(url).then(res => {
                this.articles = res.data.map( article =>{
                    return {id: article.id, name: article.name, userId: article.userId}
                })
            })
        },
        
    },  
    watch: {
        page() {
            this.loadArticles()
        }
    },
    mounted(){
      this.loadUsers()
      this.loadArticles()


    },
    computed: {
      rows() {
         this.loadArticles()
         return this.articles.length
      }
    }


}
</script>

<style>
    
</style>