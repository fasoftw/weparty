<template>
    <div class= "profile">
       <b-card no-body>
            <b-tabs pills card vertical>
            <b-tab title="Editar Perfil" active><b-card-text>
                <EditUser />        
            </b-card-text></b-tab>
            <b-tab title="Informações de Jogos"><b-card-text>Tab contents 2</b-card-text></b-tab>
            <b-tab title="Grupos"><b-card-text>Tab contents 3</b-card-text></b-tab>
            </b-tabs>
        </b-card>
    </div>
</template>

<script>
import EditUser from './EditUser'
import {mapState} from 'vuex'
export default {
    name: 'Profile',
    components: {EditUser},
    computed: mapState['user']
    
}
</script>

<style>

</style>