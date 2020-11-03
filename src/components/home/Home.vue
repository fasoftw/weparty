<template>

  <div class="home" >
      <div class="card-games">
       <b-container fluid>
            <b-row cols="1" cols-sm="2" cols-md="3" cols-lg="4">
              <b-col v-for="(game,id) in games" :key="id"  col no-gutters class="mb-2">
         <b-card
            :title="game.name"
            :img-src="game.imgSrc"
            img-alt="Image"
            img-top
            style="max-width: 18rem; margin-top: 10px">

            <b-card-text>
              {{game.description}}
            </b-card-text>

            <b-button href="#" variant="primary">Entrar</b-button>
          </b-card>
              </b-col>
            </b-row>
       </b-container>

         
      </div>
  </div>
</template>

<script>
export default {

  data(){
    return { 
      games:[
        {
          id: 1,
          name: 'Dota',
          title: 'MOBA ONLINE',
          description: 'Grupo de dota',
          imgSrc: 'https://s2.glbimg.com/nyau4xvVQm-fesMJOpFNaI5uzPw=/0x0:695x391/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2019/l/Q/L8uEtSTYmy8JwFegBjiw/images-8-.jpg'},
        {
          id: 3,
          name: 'League of legends',
          title: 'MOBA ONLINE',
          description: 'Grupo de lol',
          imgSrc: 'https://estnn.com/wp-content/uploads/2020/01/league-of-legends-header-x-800x450.jpg'
        },
        {
          id:4,
          name: 'Hearthstone',
          title: 'JOGO DE CARTAS',
          description: 'Duelo de hs',
          imgSrc: 'https://lh3.googleusercontent.com/kj3JcyCH1VUwA_kXux8cfUkl6qDeSTRRIPrNRXoNkgWoeztdZ92LIZjKE5qERDt9j2A=w720-h310'
        },

        {
          id:5,
          name: 'Counter Strike',
          title: 'JOGO DE TIRO',
          description: 'Grupo de Counter Strike',
          imgSrc: 'https://d2skuhm0vrry40.cloudfront.net/2020/articles/2020-03-26-10-35/csgo_4.jpeg/EG11/thumbnail/750x422/format/jpg/quality/60'
        },
        {
          id:6,
          name: 'Amoung Us',
          description: 'Grupo de Among Us',
          title: 'Estratégia online',
          imgSrc:'https://rollingstone.uol.com.br/media/_versions/among_us_divulgacao_innersloth_widelg.jpg'
        },
        {
          id:7,
          name: 'Pokemon GO',
          title: 'CAPTURE POKEMONS',
          description: 'Crie grupos de raide',
          imgSrc: 'https://tecnoblog.net/wp-content/uploads/2020/03/liga-competitiva-pokemon-go.jpg'

        },
        {
          id:8,
          name: 'Free Fire',
          title: 'Jogo de tiro',
          description: 'Crie grupos de Free Fire',
          imgSrc: 'https://s2.glbimg.com/6fc58fLCP3uBgR2P4hwsRhzFwro=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/s/6/6oNWDSQkO6lkGKQSKeNg/free-fire.jpg'

        },
        {
          id:9,
          name: 'Fortnite',
          title: 'Jogo de tiro',
          description: 'Crie grupos de Fortnite',
          imgSrc: 'https://sm.ign.com/t/ign_br/game/f/fortnite/fortnite_1u2q.1200.jpg'

        }
      ]
    }
  }

}

</script>

<style scoped>
.card-games{
  display:flex;
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