<template>
    <div class="user-config">
        <b-form @submit="onSubmit">
        <b-form-group
            id="name"
            label="Nome:"
            label-cols-sm="4"
            label-cols-lg="3"
            label-for="name">
            <b-form-input id="name" v-model="user.name" type="text"></b-form-input>
        </b-form-group>

         <b-form-group
            id="email"
            label-cols-sm="4"
            label-cols-lg="3"
            label="Email:"
            label-for="email">
            <b-form-input id="email"  v-model="user.email" type="email"></b-form-input>

        
        </b-form-group>

         <b-form-group
            id="password"
            label= "Senha:"
            label-cols-sm="4"
            label-cols-lg="3"
            label-for="password">
            <b-form-input id="password" v-model="user.password"   type="password"></b-form-input>
        </b-form-group>

         <b-form-group
            id="confirmPassword"
            label= "Confirme a senha:"
            label-cols-sm="4"
            label-cols-lg="3"
            label-for="confirmPassword">
            <b-form-input id="confirmPassword" v-model="user.confirmPassword" type="password"></b-form-input>
        </b-form-group>

         <b-button variant="primary" class="mr-2" @click="onSubmit" @keydown.enter="onSubmit">Salvar</b-button>
         <b-button variant="danger" >Cancelar</b-button>
        
        </b-form>
    </div>
</template>

<script>
import axios from 'axios'
import {baseApiUrl, showError} from '../../../global'
export default {
    name: 'EditUser',
    data: function(){
        return{
            user: {}
        }
    },
    methods:{
        putConfirmPassword(){
             if(this.user.confirmPassword === undefined){
                this.user.confirmPassword = this.user.password
             }
        },
        getUser(){

            axios.get(`${baseApiUrl}/users/${this.$store.state.user.id}`).then(
                res =>{
                    this.user = res.data                      

                }
            ).catch(showError)
        },
        onSubmit(){
           
           
             axios.put(`${baseApiUrl}/users/${this.$store.state.user.id}`, this.user).then(
                () =>{ 
                   this.$toasted.global.defaultSuccess();           

                }
            ).catch(showError)
        }
    },
    mounted(){
        this.getUser()
        this.putConfirmPassword()
    }

}
</script>

<style>

</style>