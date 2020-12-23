<template>
  <div class="col-sm-12">
    <paginate
      name="blogs"
      :list="posts"
      :per="3"
      tag="div"
    >
      <section v-for="blog in paginated('blogs')" :key="blog.id">
        <b-card :title="blog.name" >
        <b-card-text>{{blog.description}}</b-card-text>
        <b-card-text>   
           <img v-if="blog.imageUrl"
                    :src="blog.imageUrl"
                    height="100" width="150" alt="Article"></b-card-text>
        <b-button :to="'/post/' + blog.id" variant="primary" >
          Read More
        </b-button>
      </b-card>
        <hr>
        
      </section>
    </paginate>

    <paginate-links
      for="blogs"
      :async="true"
      :show-step-links="true"
      :step-links="{
        next: 'Next',
        prev: 'Previous'
      }"
      :classes="{
        'ul': 'pagination',
        'ul > li': 'page-item',
        'ul > li > a': 'page-link',
      }"  
    >
    </paginate-links>
  </div>
</template>

<script>
import { baseApiUrl} from '../../../global'
import axios from 'axios'
export default {
  data () {
    return {
      posts: [],
      paginate: ['blogs']
    }
  },
  methods:{
     loadArticles() {
            const url = `${baseApiUrl}/articles`
            axios.get(url).then(response => this.posts = response.data, error => console.log(error))
     }
  },
  created(){
    // this.$http.get("http://jsonplaceholder.typicode.com/posts")
    //   .then(response => response.json(), error => console.log(error))
    //   .then(json => this.posts = json, error => console.log(error));

    //https://github.com/peter-stehlik/vue-spa-part-2

    this.loadArticles()


  }
}
</script>

<style>

 .article-item {
        border-radius: 8px;
        margin-bottom: 20px;
        background-color: #FFF;
        padding: 20px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    }

    .article-item a {
        display: flex;
        align-items: flex-start;
        text-decoration: none;
        color: #000;
    }

    .article-item-info h2 {
        font-size: 1.7rem;
    }

    .article-item-image {
        padding-right: 20px;
        margin-right: 20px;
        border-right: 1px solid #FFF;
    }

    .article-item-image img {
        border-radius: 5px;
    }

    .article-item-info {
        display: flex;
        align-self: stretch;
        flex-direction: column;
    }

    .article-item-info p {
        flex: 1;
        color: #555;
        font-size: 1.1rem;
    }
  
</style>