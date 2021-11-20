<template>
<div>
   <div class="d-flex justify-center py-8 blue ">
        <div class="font-weight-bold title white--text">Update Contact</div>
        
   </div>
       <div class="py-10 px-10 ">

        <div class="d-flex">
            <div>
             <v-img :src="this.base64? this.base64: require('@/assets/images/profile.jpg')" width="100" height="100" class="rounded-circle"/>
             <input type="file" @change="handleChange"/>
          <span class="icon rounded-circle white px-1 py-1 blue lighten-5"><v-icon color="black">mdi-account-edit</v-icon></span>
         </div>
          <div class="ml-10">
              <div class="d-flex">
                  <v-text-field v-model="formdata.first_name" type="text" label="First Name" class=""/>
                   <v-text-field v-model="formdata.middle_name" type="text" label="Middle Name" class="pl-4"/>
                    <v-text-field v-model="formdata.last_name" type="text" label="Last Name" class="pl-4"/>
              </div>
              <div>
                  <v-text-field v-model="formdata.title" type="text" label="Title"/>
              </div>
               <div>
                  <v-text-field v-model="formdata.suffix" type="text" label="Suffix"/>
              </div>
          </div>
        </div>
        <v-row>
            <v-col md="6">
 <div class=" d-flex mb-4">
            <v-icon color="blue">mdi-bag-checked</v-icon>
             <div class="pl-3">
                 <v-text-field v-model="formdata.job" type="text" label="Work"/>
             </div>
        </div>
        <div class=" d-flex">
            <v-icon color="blue">mdi-email</v-icon>
            <div class="pl-3">
                 <v-text-field v-model="formdata.email" type="email" label="Email"/>
             </div>
        </div>
          <div class=" d-flex align-start">
             <v-icon color="blue">mdi-phone</v-icon>
          <div>   <div v-for="(textField, i)  in textFields" :key="i">
               
                     <v-text-field type="text"  v-model="textField.value"  :label="`phone number ${i+1}`"/>
                
              
                
            </div></div>
            <div @click="addTextField" class="blue--text font-weight-bold">Add More</div>

            
           
        </div>
         <div class=" d-flex align-start">
            <v-icon color="blue pt-10">mdi-map-marker</v-icon>
            <div class="pl-3">
                 <v-text-field type='text' v-model="formdata.city" label="city"/>
                  <v-text-field type="text" v-model="formdata.country" label="country"/>
             </div>
        </div>
            </v-col>
            <v-col md="6">
<div class=" d-flex align-start">
            <v-icon color="blue pt-10"> mdi-note-text</v-icon>
            <div class="pl-3">
               
                  <v-text-field type="text" v-model="formdata.note" label="Note"/>
             </div>
        </div>
        <div class=" d-flex align-start">
            <v-icon color="blue pt-10">mdi-map-marker</v-icon>
            <div class="pl-3">
                 
                  <v-text-field type="date" v-model="formdata.birthdate" label="birthday"/>
             </div>
        </div>
          <v-btn class="rounded-xl py-4 px-6 white blue white--text" @click="handleSubmit">Submit</v-btn>
          <v-btn class="rounded-xl py-4 px-6 white red mr-4 white--text">Cancel</v-btn>
            </v-col>
        </v-row>
       
        
    </div>
</div>
 
</template>

<script>
// import gql from 'graphql-tag'

// const CREATE_CONTACTS_QUERY = gql`
//  mutation MyMutation ($orbit_contact: orbit_contact_insert_input!) {
//   insert_orbit_contact_one(object: $orbit_contact) {
//     birthdate
//     city
//     country
//     created_at
//     email
//     first_name
//     id
//     image
//     job
//     last_name
//     middle_name
//     note
//     phone_no
//     suffix
//     updated_at
//     title
//     user
//   }
// }


// `

// const UPLOAD_CONTACT_PIC_QUERY = gql`
// mutation MyMutation($base64:String!, $id:uuid!, $type:String!, $name:String!) {
//   uploadContactPic(base64str: $base64, id: $id, name: $name, type: $type) 
// }

// `

 
export default  {
     props:['id'],
   data(){
       return {
             textFields:[{i:1}],
             file:null,
             base64:null,
            
              
             formdata:{
                 first_name:null,
                 last_name:null,
                 middle_name:null,
                 title:null,
                 suffix:null,
                 city:null,
                 country:null,
                 birthdate:null,
                 note:null,
                 job: null,
                 email:null,
                 image:"",
                 phone_no:"{",
                 

             }
       }
     
   },
   methods:{
       addTextField(i){
           this.textFields.push({value:""})
       },
       handleChange(e){
          
           this.file = e.target.files[0];
           const reader = new FileReader();

           if(e.target.files[0]){
               reader.readAsDataURL(e.target.files[0])
           }

           reader.onload = (e) =>{
            
               const base64str = e.target.result;
               
               this.base64 = base64str;
                 
           }
           reader.onerror= function(){
               console.log('Unable to parse file')
           }
       },
       async handleSubmit(e){
          await this.textFields.forEach((el,i)=>{
             
               if(i===this.textFields.length-1){
                this.formdata.phone_no+="'"+el.value+"'"
               }else{
                   this.formdata.phone_no+="'"+el.value+"'"+","
               }

           })
           
          this.formdata.phone_no+="}"

          if(this.formdata.middle_name===null){
              delete this.formdata.middle_name
          }
          if(this.formdata.first_name === null){
              delete this.formdata.first_name
          }
          if(this.formdata.phone_no==="{'undefined'}"){
             delete this.formdata.phone_no
          }
          if(this.formdata.last_name===null){
              delete this.formdata.last_name
          }
          if(this.formdata.title===null){
              delete this.formdata.title
          }
           
          if(this.formdata.job===null){
              delete this.formdata.job
          }
          if(this.formdata.email===null){
              delete this.formdata.email
          }
           if(this.formdata.note===null){
              delete this.formdata.note
          }
           if(this.formdata.birthdate===null){
              delete this.formdata.birthdate
          }
          if(this.formdata.image===""){
              delete this.formdata.image
          }
           if(this.formdata.city===null){
              delete this.formdata.city
          }
           if(this.formdata.country===null){
              delete this.formdata.country
          }
     
    if(this.base64){
        console.log('the first')
         this.$store.dispatch("contact/updateContact",{id:this.id,formdata:this.formdata,base64:this.base64, name:this.file.name,type: this.file.type}).then(res=>{
            if(res){
                this.phone_no="{"
                this.$emit('update') 
            }
        })
    }else{
        console.log('the second', this.id)
         this.$store.dispatch("contact/updateContact",{id:this.id,formdata:this.formdata,base64:this.base64}).then(res=>{
            if(res){
                this.phone_no="{"
                this.$emit('update') 
            }
        })
    }
   
       
        //       this.$apollo.mutate({mutation: CREATE_CONTACTS_QUERY, variables:{orbit_contact:this.formdata}}).then(data=>{
        //       if(this.base64){
        //           this.$apollo.mutate({mutation: UPLOAD_CONTACT_PIC_QUERY, variables:{base64:this.base64, name:this.file.name, type:this.file.type, id:data.data.insert_orbit_contact_one.id}}).then(data=>{
        //       console.log(data)
               
        //    })
        //       }
                

        //    })
           

        
        
       }
   }
}
</script> 


<style scoped>
.icon{
    position: relative;
    bottom: 26px;
    left:68px;
    z-index: 50;
    
}
</style>