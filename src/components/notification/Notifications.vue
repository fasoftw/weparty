<template>
  <div class="notifications">

      <b-container fluid>
    <b-card-group deck>
      <b-card bg-variant="light"  header="Inbox" class="text-left">
            <b-button-group >
            <b-button class="ml-2" variant="light"> <b-form-checkbox @click="selectAll" :value="selected">Select All</b-form-checkbox> </b-button>
            <b-button variant="light"><b-icon icon="trash-fill"></b-icon> Delete</b-button>
            </b-button-group>                    
          <b-row>
              <b-col>
                 
                  <b-list-group>
                    <b-form-group>
                  
                    <b-list-group-item class="flex-column align-items-start"
                    v-for="item in notifications" :key="item.notificationID">
                       <b-form-checkbox-group id="checkbox-group-2" v-model="selected">
                        <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1"><b-form-checkbox value="orange"><span class="inbox-icon"></span> {{item.title}}</b-form-checkbox></h5>
                        <small>3 days ago</small>
                        </div>

                        <p class="mb-1">
                       {{item.message}}
                        </p>

                        <small>Donec id elit non mi porta.</small>
                        
                    </b-form-checkbox-group>
                    </b-list-group-item>

                    </b-form-group>
                    </b-list-group>
              </b-col>
          </b-row>
      </b-card>
    </b-card-group>
     </b-container>

  </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl,showError } from '../../../global.js'
export default {
    data(){
        return{
            selected: [],
            notifications: []
        }
       
    },
    methods:{
        onLoad(){
            axios.get(`${baseApiUrl}/notifications/${this.$store.state.user.id}`)
            .then(res =>{
                this.notifications = res.data
                console.log(this.notifications)
            }).catch(showError)
        },
        selectAll(){
            this.notifications.map(not =>{
                this.selected.push(not.notificationID)
            })
        }
    },
    mounted(){
        this.onLoad()
    }
}
</script>

<style>

    .inbox-icon {
        height: 12px;
        width: 12px;
        background-color:#007bff;
        border-radius: 50%;
        display: inline-block;
    }
</style>