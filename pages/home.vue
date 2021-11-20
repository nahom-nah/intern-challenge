<template>
    <div>
        <v-divider></v-divider>

       
        <div>
            <v-row >
                <v-col md="3" class="py-10 px-5" > 
                    <div class="d-flex align-center">
                          <v-text-field placeholder="search by first name" type="text" @input="debounceInput" label="search contacts"  />
                           
                              
                                <v-menu offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                    
                                    
                                    v-bind="attrs"
                                    v-on="on"
                                    >
                                   <div class="white blue--text"><v-icon color="blue">mdi-plus</v-icon></div>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item
                                    
                                    >
                                    <v-list-item-title @click="openCreatePage"> Add Contact</v-list-item-title>
                                    
                                    </v-list-item>
                                    <v-list-item
                                    
                                    >
                                    <v-list-item-title > Import Contact</v-list-item-title>
                                    
                                    </v-list-item>
                                </v-list>
                                </v-menu>
                               <div class="white blue--text"><v-icon color="blue">mdi-menu</v-icon></div>
                         
                    </div>
                     
                   <div  v-if=" searchContacts.length!==0">
                     <div  v-for="contact in searchContacts" :key="contact.id">
                    <side-comp   :showInfo="showContactInfo"  :contact="contact"/>
                   </div>
                   </div>
                   
                    <div v-else v-for="contact in orbit_contact" :key="contact.id">
                      
                            <side-comp   :showInfo="showContactInfo"  :contact="contact"/>
                
                          
                        
                    </div>  
                       <!-- </v-hover> -->
                 
                </v-col>
                  <v-divider vertical></v-divider>
                <v-col md="9" >
                  
                    <contact-info  @clicked2="afterDelete" v-on:clicked="openUpdatePage" v-if="contactInfo"  :contact="contactInfo"/>
                    <create-contact @clicked="afterCreate" v-else-if="createPage"/>
                    <update-contact @update="afterUpdate"  v-else-if="updatePage" :id="toUpdateId"/>
                    <overView  v-else/>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>

  
import gql from 'graphql-tag'
// import graphql from 'graphql'
import { debounce } from "debounce";

import UpdateContact from '../components/updateContact.vue'
import sideComp from './../components/sideComp.vue'
import overView from './../components/overView.vue'
import contactInfo from './../components/contactInfo.vue'
import createContact from './../components/createContact.vue'


// const ALL_CONTACTS_QUERY = gql`
//   query MyQuery {
//   orbit_contact {
//       id
//     first_name
//     job
//     middle_name
//     image
    
//   }
// }

// `

// const CONTACT_BY_ID_QUERY = gql`
//  query MyQuery ($id: uuid!) {
//   orbit_contact(where: {id: {_eq: $id}}) {
//     email
//     first_name
//     id
//     image
//     birthdate
//     job
//     last_name
//     middle_name
//     note
//     phone_no
//     city
//     country
//     image
//   }
// }


// `
const SEARCH_CONTACTS_QUERY = gql`
query MyQuery($fname: String) {
  orbit_contact(where: {first_name: {_ilike: $fname}}) {
    first_name
    id
    image
    job
    middle_name
  }
}

`

export default  {
 

  //  apollo: {
  //   orbit_contact: {
  //     query: ALL_CONTACTS_QUERY,
  //     prefetch: true,
  //   },
  // },

  components: { sideComp,   overView,contactInfo,createContact, UpdateContact  },
      layout:"subLayout",
        middleware:"authenticated",
  
   data(){

       return{
          
           contactInfo:null,
           createPage: false,
           updatePage: false,
            searchPage:false,
            searchContacts: [],
            orbit_contact:null,
            toUpdateId:null,
            
       }
   },
   mounted(){
     this.$store.dispatch('contact/getAllContacts').then((response) =>{
       if(response){
            this.orbit_contact = this.$store.getters['contact/allContacts']
            
       }
  
     })
   
   },
    
  methods:{
    afterCreate(){
      this.createPage=false;
     this.$store.dispatch('contact/getAllContacts').then((response) =>{
       if(response){
            this.orbit_contact = this.$store.getters['contact/allContacts']
            
       }
  
     })
        // this.orbit_contact =  this.$store.getters['contact/allContacts']
    },
    afterUpdate(){
      this.contactInfo= null;
      this.updatePage = false;
     this.orbit_contact =  this.$store.getters['contact/allContacts']
    },
    afterDelete(){
      console.log('this is')
      this.contactInfo= null;
     this.orbit_contact =  this.$store.getters['contact/allContacts']
    },
    debounceInput: debounce(function (e) {
        this.$apollo.query({query: SEARCH_CONTACTS_QUERY, variables:{fname:e}}).then(data=>{
               this.searchContacts=data.data.orbit_contact;
           })
    }, 500),


          showContactInfo(id){
       
            
         
              this.$store.dispatch('contact/getOneContact',id).then((response)=>{
                  if(response){
                   this.contactInfo=this.$store.getters['contact/oneContact']
 
                  }
              })
               
       
           
      },
      openCreatePage(){
          this.contactInfo= null;
          this.createPage = true;
      },
      
       openUpdatePage(e,id){
         console.log(id,'here id')
          this.contactInfo = null;
      this.updatePage =true;
      this.toUpdateId = id
  
     
  },
  },


 

            
}
</script>
