<template>
  <div class="sign-up">
     
       <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <h1> Create an account</h1>
      <h4> It's free and join to other players </h4>
        <div class="form-sign-up">
            <b-form-group
                id="input-group-1"
                label="Email address:"
                label-for="input-1"
                description="We'll never share your email with anyone else."
            >
                <b-form-input
                id="input-1"
                v-model="user.email"
                type="email"
                required
                placeholder="Enter email"
                ></b-form-input>

            </b-form-group>

            <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
                <b-form-input
                id="input-2"
                v-model="user.name"
                required
                placeholder="Enter name"
                ></b-form-input>
            </b-form-group>
        </div>


      <b-button type="submit" class="mr-2" variant="primary">Submit</b-button>
      <b-button type="reset" class="mr-2" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
    name: 'Sigup',
    data(){
        return {
            user: {},
            show: true
        }
    },
    methods:{
        onSubmit(){

        },
        onReset(){

        }
    }
}
</script>
<style>
    .sign-up {
        display: flex;
        justify-content: center;;
        align-items: center;
    }

    .form-sign-up{
        margin-top: 50px;
    }
</style>