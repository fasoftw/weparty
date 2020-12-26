<template>
  <div class="notifications">

  <b-container fluid>
    <b-card-group deck>
      <b-card bg-variant="light"  header="Inbox" class="text-left">
    
    <b-form-group>
      <template #label>
        <b-button-group >
        <b-button class="ml-2" variant="light">
        <b-form-checkbox
          v-model="allSelected"
          :indeterminate="indeterminate"
          aria-controls="items"
          @change="toggleAll"
        >
          {{ allSelected ? 'Un-select All' : 'Select All' }}
        </b-form-checkbox>
        </b-button>
         <b-button variant="light" @click="onDelete"><b-icon icon="trash-fill"></b-icon> Delete</b-button>
         <b-button variant="light" @click="markAsRead" :disabled="selected.length === 0"><b-icon icon="inbox-fill"></b-icon> Mark as read</b-button>
        </b-button-group>
      </template>
  <b-row>
        <b-col>
          <b-form-checkbox-group id="items" v-model="selected" name="items" class="ml-4" stacked >
         <b-list-group>                 
            <b-list-group-item class="flex-column align-items-start  mb-2" v-for="item in notifications" :key="item.notificationID">
              <b-form-checkbox  :value="item.notificationID">
                  <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">
                      <span v-if="!item.readedAt" class="inbox-icon"></span> {{item.title}} </h5>
                  </div>
                  
                  <div class="d-flex flex-row  flex-wrap justify-content-between">
                    <div class="p-2 bd-highlight">              
                        <img src="@/assets/icon-not.png" width="64" height="64" />
                    </div> 
                    <div class="p-2 bd-highlight w-90">
                        <p class="mb-1 text" >                
                        {{item.message}}
                        </p>
                    </div>
                            
                </div>
                
              </b-form-checkbox>
               <div class="d-flex align-items-end flex-column bd-highlight mb-1">
                         <small>{{item.time}}  </small>
                    </div>  
            </b-list-group-item>                  
                  </b-list-group>
        </b-form-checkbox-group>
              </b-col>
          </b-row>
      </b-form-group>
      </b-card>
    </b-card-group>
     </b-container>

  </div>
</template>

<script>

import axios from 'axios'
import { baseApiUrl,showError } from '../../../global.js'
export default {
     data() {
      return {
        items: [],
        selected: [],
        allSelected: false,
        indeterminate: false,
        notifications:[]
      }
    },
    methods: {
      toggleAll(checked) {
        this.selected = checked ? this.items.slice() : []
      },
      onLoad(){
            axios.get(`${baseApiUrl}/notifications/${this.$store.state.user.id}`)
            .then(res =>{
                res.data.map( item =>{
                    this.items.push(item.notificationID)
                })

                this.notifications = res.data

                this.notifications.map( (item,index)=>{
                  this.notifications[index].time = this.dateAtt(item.createdAt)
                  this.notifications[index].title = item.title.replace("*name*", item.partyName) 
                  this.notifications[index].message = item.message.replace("*name*", item.partyName) 
                  this.notifications[index].message = item.message.replace("*date*", this.dateFormat(item.createdAt))             
                })

                
            }).catch(showError)

            
      },
      setNotificationsItems(){         
                this.notifications.map(not =>{
                    this.items.push(not.notificationID)
                })

             
      },
      onDelete(){
        console.log(this.selected)
              axios.delete(`${baseApiUrl}/notifications/${this.selected}`)
              .then( ()=>{
                   this.$store.commit('setNotifications', this.$store.state.user.id)
                   this.onLoad()
                   this.$toasted.global.defaultSuccess()
                }
                  
              ).catch(showError)
        
      },
      markAsRead(){
              axios.put(`${baseApiUrl}/notifications/${this.selected}`)
              .then( ()=>{
                   this.onLoad()
                   this.$store.commit('setNotifications', this.$store.state.user.id)
                   this.$toasted.global.defaultSuccess()
                }                  
              ).catch(showError)

      },
      dateFormat(date){ 
        var t = new Date(date)

          var hr = ("0" + t.getHours()).slice(-2);
          var min = ("0" + t.getMinutes()).slice(-2);
          var sec = ("0" + t.getSeconds()).slice(-2);

         return (t.getFullYear()+"-"+t.getMonth()+"-"+t.getDate()+" "+hr+":"+min+":"+sec).toString()
      },
      dateAtt(date){ 

         var oldDate = new Date(date)
         var newDate = new Date()

  
        var days = Math.floor((Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()) - Date.UTC(oldDate.getFullYear(), oldDate.getMonth(), oldDate.getDate()) ) /(1000 * 60 * 60 * 24))
        let hours = this.diff_minutes(newDate, oldDate)/60
        var minutes = (this.diff_minutes(newDate, oldDate) % 60)

       
       if(days === 0){
      

          const str = hours.toString();

          // Separamos nas duas partes.
          const splitted = str.split('.');

          // Parte inteira:
          hours = parseInt(splitted[0]);

           return hours + " hrs " + minutes + " min ago";

        } else {
           return days + " days ago" 
        }
        
      

      },
      diff_minutes(dt2, dt1) {

        var diff =(dt2.getTime() - dt1.getTime()) / 1000;
        diff /= 60;
        return Math.abs(Math.round(diff));
        
      }
    },
  
    watch: {
      
      selected(newValue) {
        // Handle changes in individual flavour checkboxes
        if (newValue.length === 0) {
          this.indeterminate = false
          this.allSelected = false
        } else if (newValue.length === this.items.length) {
          this.indeterminate = false
          this.allSelected = true
        } else {
          this.indeterminate = true
          this.allSelected = false
        }
      },
    },
    mounted(){
        this.onLoad()
        //this.setNotificationsItems()
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

    .text{

       flex:0 0 auto;
       align-items: stretch;
    }
</style>