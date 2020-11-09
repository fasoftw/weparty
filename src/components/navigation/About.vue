<template>
  <div class="about">
        <b-jumbotron bg-variant="info" text-variant="white" border-variant="dark">
    <template #header>CONECTE-SE COM OUTROS JOGADORES</template>

    <template #lead>
     O WeParty é um lugar para conectar jogadores de todos os lugares do mundo para juntos disputar partidas, desafios, entre 
outros.
    </template>

    <hr class="my-4">

    <p>
      ENCONTRE SUA PARTY e GANHEM suas partidas ONLINE!!!
    </p>
  </b-jumbotron>
  </div>
</template>

<script>
export default {
    name: 'About'
}
</script>

<style scoped>
.bg-info {
    background-color:white !important; 
    color: #6600cc !important;
}
</style>