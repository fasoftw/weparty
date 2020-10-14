<template>
  <div class="sign-in">
       <b-form @submit="onSubmit" @reset="onReset" v-if="show">
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


      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
    name: 'Sigin',
    data(){
        return {
            user: {},
            show: true
        }
    },
    methods:{
        onSubmit(){

        }
    }
}
</script>

<style>
    .sign-in{
        display: flex;
        
        align-items: center;
        flex-direction: column;
        background-color: #FFF;
        padding: 20px;

        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
    }
</style>