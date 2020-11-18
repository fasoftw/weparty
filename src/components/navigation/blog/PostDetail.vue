<template>
  <article class="col-sm-12">
      <nav aria-label="breadcrumb">
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><router-link :to="'/news'">News</router-link></li>
				<li class="breadcrumb-item active" aria-current="page">{{ post.name }}</li>
			</ol>
		</nav>
		<PageTitle :main="post.name" :sub="post.description" />
        <div class="article-content" v-html="post.content"></div>

		<!-- <h2>Discussion</h2>
		<button @click="showComments" v-if="!showCommentBox" class="btn btn-primary">show comments</button>

		<ul class="list-group" v-if="showCommentBox">
			<li v-for="comment in comments" :key="comment" class="list-group-item"><strong>{{ comment.email }}</strong> <em>wrote:</em> {{ comment.body }}</li>
		</ul> -->
  </article>
</template>

<script>

import PageTitle from '../../template/PageTitle'
import { baseApiUrl} from '../../../../global'
import axios from 'axios'
export default {
  components: {PageTitle},
  data() {
    return {
      post: {},
      comments: [],
			showCommentBox: false,
    }
  },
  created() {
    const url = `${baseApiUrl}/articles/${this.$route.params.id}`
    axios.get(url)
      .then(response => this.post = response.data, error => console.log(error))
  },
  methods: {
      showComments(){
            this.$http.get("http://jsonplaceholder.typicode.com/comments?postId=" + this.$route.params.id)
            .then(response => response.data, error => console.log(error))
            .then(json =>	this.comments = json, error => console.log(error))
                .then(() => this.showCommentBox = true);
            }
  }
}
</script>

<style>

  .article-content {
        background-color: #FFF;
        border-radius: 8px;
        padding: 25px;
    }

    .article-content pre {
        padding: 20px;
        border-radius: 8px;
        font-size: 1.2rem;
        background-color: #1e1e1e;
        color: #FFF;
    }

    .article-content img {
        max-width: 100%;
    }

    .article-content :last-child {
        margin-bottom: 0px;
    }

</style>