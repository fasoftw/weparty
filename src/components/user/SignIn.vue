<template>
  <div class="sign-in">
    <div class="auth-modal">
       <b-form @submit="onSubmit" @keydown.enter="onSubmit">
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
          description="We'll never share your email with anyone else.">
          <b-form-input
            id="input-1"
            v-model="user.email"
            type="email"
            required
            placeholder="Enter email">
          </b-form-input>

        </b-form-group>

        <b-form-group>
          <label for="text-password">Password</label>
          
          <b-input type="password" id="text-password" v-model="user.password" 
          aria-describedby="password-help-block"></b-input>
        </b-form-group>


      <b-button variant="primary" class="mr-2" @click="onSubmit" @keydown.enter="onSubmit">Entrar</b-button>
      <b-button variant="danger" >Cancelar</b-button>

    
    </b-form>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
import {baseApiUrl, userKey, showError} from '../../../global'
export default {
    name: 'Signin',
    data(){
        return {
            user: {},
            show: true
        }
    },
    methods:{
        onSubmit(){
          axios.post(`${baseApiUrl}/signin`, this.user)
            .then(res =>{
              this.$store.commit('setUser', res.data);
              this.$store.commit('setHideUserDropdown',true);
              this.$store.commit('setHideLogin', false)
              localStorage.setItem(userKey, JSON.stringify(res.data))
              this.$router.push({path: '/dashboard/main'})

          }).catch(showError)
        }
    }
}
</script>

<style>
    .sign-in {
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