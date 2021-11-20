<template>
    <div>
       
    <div>
        <div class="d-flex flex-column align-center justify-center py-7 white blue lighten-5 rounded-b-circle rounded-t-md">
            <v-img :src="contact.image!==''?contact.image: require('@/assets/images/profile.jpg')" width="80" height="80" class="rounded-circle"/>
            <div class="d-flex flex-column align-center justify-center mt-2">
              <div>{{contact.title}}</div>
                <div class="body-1 font-weight-bold black--text">{{contact.suffix}} {{contact.first_name}} {{contact.middle_name}}</div>
                <div class="   black--text">{{contact.job}}</div>
                <div class="mt-5">
                    <v-icon color="green ml-3" @click="childhandle">mdi-account-edit</v-icon>
                    <v-icon color="red" @click="()=>this.showAlert = !this.showAlert">mdi-delete</v-icon>

                </div>
            </div>
        </div>
        <v-alert
      prominent
      type="error"
      v-show="this.showAlert"
    >
      <v-row align="center">
        <v-col class="grow">
          are you sure you want to delete this contact? he/she is your friend eko man???
        </v-col>
        <v-col class="shrink">
          <v-btn @click="handleDelete">Delete</v-btn>
        </v-col>
      </v-row>
    </v-alert>
    
        <v-row class="px-14 py-5">
            <v-col md="6">
                <div><v-icon color="blue mr-3" >mdi-email</v-icon> <span>{{ contact.email }}</span></div>
                <div class='d-flex align-start py-4'><v-icon class="self-start mr-3" color="blue">mdi-phone</v-icon> <div class=""> <div  v-for="phone_no in contact.phone_no" :key="phone_no.id"><div class="mb-2">{{phone_no}}</div>  </div></div></div>
              <div class='d-flex align-start py-4'><v-icon class="self-start mr-3" color="blue">mdi-map-marker</v-icon> <div class=""><div class="mb-2">{{contact.city}}</div><div>{{contact.city}}, {{contact.country}}</div></div></div>
           <div class='d-flex align-start py-4'><v-icon class="self-start mr-3" color="blue">mdi-cake</v-icon> <div class=""><div class="mb-2">{{contact.birthdate}}</div></div></div>
             
            </v-col>
            <v-divider vertical></v-divider>
            <v-col md="6">
                <div class='d-flex align-start py-4'><v-icon class="self-start mr-3" color="blue">mdi-note-text</v-icon> <div class=""><div class="mb-2">Private Notes</div><v-alert
      icon="mdi-note-text-outline"
      prominent
      text
      type="info"
    >
 {{contact.note}}
    </v-alert></div></div>
          <div class='d-flex align-start py-4'><v-icon class="self-start mr-3" color="blue">mdi-tag</v-icon> <div class=""><div class="mb-2 blue--text">Add Tag</div> </div></div>
         
            </v-col>
        </v-row>
    </div>
 
    </div>
</template>
 
 <script>
//  import gql from 'graphql-tag'

// const CONTACT_DELETE_QUERY = gql`
// mutation MyMutation($id: uuid!) {
//   delete_orbit_contact_by_pk(id: $id) {
//     id
//   }
// }
// `

 export default  {
    props:['contact','openUpdatePage'],
    data(){
        return {
            showAlert:false
        }
    },
    methods:{
      childhandle(event){
        console.log(this.contact.id)
        this.$emit('clicked',this.$event,this.contact.id)
      },
        handleDelete(e){
           this.$store.dispatch('contact/deleteContact',this.contact.id).then(response=>{
             if(response){
               
                  this.$emit('clicked2')
             }
           })
         
            
        }
    }
 }
 </script>
 