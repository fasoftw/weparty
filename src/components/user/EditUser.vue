<template>
    <div class="user-config">
        <b-form @submit="verifyData">

        <b-form-group
            id="name"
            label="Nome:"
            v-if="type === 'isEditUser'"
            label-cols-sm="4"
            label-cols-lg="3"
            label-for="name">
            <b-form-input id="name" v-model="user.name" type="text"></b-form-input>
        </b-form-group>

        <b-form-group
            id="last-name"
            label="Last Name:"
            v-if="type === 'isEditUser'"
            label-cols-sm="4"
            label-cols-lg="3"
            label-for="last-name">
            <b-form-input id="last-name" v-model="user.lastName" type="text"></b-form-input>
        </b-form-group>

         <b-form-group
            id="email"
            v-if="type === 'isEditUser'"
            label-cols-sm="4"
            label-cols-lg="3"
            label="Email:"
            label-for="email">
            <b-form-input id="email"  v-model="user.email" type="email"></b-form-input>

        
        </b-form-group>

        <!-- <b-form-group
            id="old-password"
            v-if="type === 'isPassword'"
            label= "Senha atual:"
            label-cols-sm="4"
            label-cols-lg="3"
            label-for="old-password">
            <b-form-input id="old-password" v-model="this.user.password"   type="password"></b-form-input>
        </b-form-group> -->

         <b-form-group
            id="password"
            v-if="type === 'isPassword'"
            label= "Password:"
            label-cols-sm="4"
            label-cols-lg="3"
            label-for="password">
            <b-form-input id="password" v-model="newPassword"  type="password"></b-form-input>
        </b-form-group>

         <b-form-group
            id="confirmPassword"
            v-if="type === 'isPassword'"
            label= "Password confirm:"
            label-cols-sm="4"
            label-cols-lg="3"
            label-for="confirmPassword">
            <b-form-input id="confirmPassword" v-model="user.confirmPassword" type="password"></b-form-input>
           <span class="span-aviso"> {{ msg}}</span>
        </b-form-group>

         <b-button  v-if="type === 'isEditUser' || type === 'isPassword'" 
         variant="primary" class="mr-2"
          @click="verifyData"
           @keydown.enter="verifyData">Salvar</b-button>
         
         
         <b-button variant="danger"  
         v-if="type === 'isEditUser' || type === 'isPassword'"  >Cancelar</b-button>
        
        <b-form-group v-if="type === 'isDelete'" label=" Deseja excluir sua conta?">
            <b-form-radio-group
                class="mt-10"
                v-model="selected"
                :options="options"
                name="radio-inline"
            ></b-form-radio-group>
        </b-form-group>

      
         <b-button variant="danger"  v-if="type === 'isDelete'" @click="deleteUser">Excluir Conta</b-button>
        
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
            user: {},
            newPassword: '',
            msg: '',
            selected: false,
            options: [
             { text: 'Sim', value: true },
            { text: 'Não', value: false }
            ]
        }
    },
    props:{
        type: String
    },
    methods:{
        verifyData(){
            if(this.$props.type === 'isPassword'){
                if(this.user.confirmPassword === this.newPassword){
                    this.user.password = this.newPassword
                    this.onSubmit()
                } else {
                    this.msg = 'Confirm Password'
                }
            } else {
                if(this.user.confirmPassword === undefined && this.$props.type === 'isEditUser'){
                    this.user.password = null
                    this.onSubmit()
                    
                }
            }
        },
        deleteUser(){
            if(this.selected){
                axios.delete(`${baseApiUrl}/users/${this.$store.state.user.id}`).then(               
                    this.$toasted.global.defaultSuccess()        
                    
                ).catch(showError)
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
      
    }

}
</script>

<style scoped>
    .span-aviso{
        color: red;
        font-size: 14px;
        margin-top: 4px;
        margin-left: 10px;  
    }

    .deletar-conta{
        display:flex;
        align-content: center;
    }

</style>