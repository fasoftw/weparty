<template>
    <div class= "profile">
       <b-card no-body>
            <b-tabs pills card vertical>
            <b-tab title="Dados do Cadastro" active>
                <b-card-text>
                <EditUser :type="isEditUser"/>        
                </b-card-text>
            </b-tab>

            <b-tab title="Redefinição de senha">
                <b-card-text>
                     <EditUser :type="isPassword"/>    
                </b-card-text>                
            </b-tab>

            <b-tab title="Meus Jogos">
                <b-card-text>
                </b-card-text>
            </b-tab>
             <b-tab title="Excluir conta">
                 <b-card-text>
                     <EditUser :type="isDelete"/>
                 </b-card-text>
            </b-tab>
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
    computed: mapState['user'],
    data(){
        return{
            isPassword:"isPassword",
            isEditUser: "isEditUser",
            isMyGames: "isMyGames",
            isDelete: "isDelete"
        }
    }
    
}
</script>

<style>

</style>