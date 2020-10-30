<template>
  <div class="sign-up">
     <div class="auth-modal">
           <b-form @submit="onSubmit">
            <h2> Create an account</h2>
            <h4> It's free and join to other players </h4>
                <div class="form-sign-up">

                    
                    <b-form-group id="input-name" label="Your Name:" label-for="input-2">
                        <b-form-input
                        id="input-name"
                        v-model="user.name"
                        required
                        placeholder="Enter name"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group
                        id="input-email"
                        label="Email address:"
                        label-for="input-1"
                        description="We'll never share your email with anyone else."
                    >
                        <b-form-input
                        id="input-email"
                        v-model="user.email"
                        type="email"
                        required
                        placeholder="Enter email"
                        ></b-form-input>

                    </b-form-group>


                    <label for="text-password">Password</label>
                    
                    <b-input type="password" id="text-password" v-model="user.password" 
                    aria-describedby="password-help-block"></b-input>
                    
                     <b-form-group>
                        <label for="confirm-password">Confirm Password</label>
                        
                        <b-input type="password" id="confirm-password" 
                        aria-describedby="password-help-block"
                        v-model="user.confirmPassword"></b-input>
                     </b-form-group>

                    <b-form-group>
                      <b-button class="mr-2" variant="primary" @click="onSubmit">Cadastrar</b-button>
                     <b-button type="reset" class="mr-2" @click="onReset" variant="danger">Limpar</b-button>
                    </b-form-group>

                </div>


              
    </b-form>
     </div>
  </div>
</template>

<script>
import axios from 'axios'
import {baseApiUrl,showError} from '../../../global.js'
export default {
    name: 'Signup',
    data(){
        return {
            user: {}
        }
    },
    methods:{
        onSubmit(){
            axios.post(`${baseApiUrl}/signup`, this.user)
            .then(() =>{
              this.$toasted.global.defaultSuccess();
              this.user = {}
               this.$router.push({path: '/signin'})
            })
            .catch(showError)

        },
        onReset(){
            this.user ={}
        }
    }
}
</script>
<style>
    .sign-up {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .auth-modal {
        background-color: #FFF;
        width: 400px;
        padding: 35px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

        display: flex;
        flex-direction: column;
        align-items: center;
    }

</style>