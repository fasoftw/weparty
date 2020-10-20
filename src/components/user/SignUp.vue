<template>
  <div class="sign-up">
     <div class="auth-modal">
           <b-form @submit="onSubmit" v-if="show">
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
                    
                    <label for="text-password">Confirm Password</label>
                    
                    <b-input type="password" id="text-password" 
                    aria-describedby="password-help-block"
                    v-model="user.confirmPassword"></b-input>
               
                </div>


                <b-button class="mr-2" variant="primary" @click="onSubmit">Submit</b-button>
                <b-button type="reset" class="mr-2" variant="danger">Reset</b-button>
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
            user: {},
            show: true
        }
    },
    methods:{
        onSubmit(){
            axios.post(`${baseApiUrl}/signup`, this.user)
            .then(() =>{
              this.$toasted.global.defaultSuccess();
              this.user = {}
            })
            .catch(showError)

        },
        onReset(){

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