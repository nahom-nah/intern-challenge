import gql from 'graphql-tag'
const ALL_CONTACTS_QUERY = gql`
query MyQuery {
orbit_contact {
    id
  first_name
  job
  middle_name
  image
  
}
}

`
const CONTACT_BY_ID_QUERY = gql`
query MyQuery($id:uuid!) {
    orbit_contact_by_pk(id: $id) {
      birthdate
      city
      country
      email
      first_name
      id
      image
      job
      last_name
      middle_name
      note
      phone_no
      suffix
      title
    }
  }

`
const CONTACT_DELETE_QUERY = gql`
mutation MyMutation($id: uuid!) {
  delete_orbit_contact_by_pk(id: $id) {
    id
  }
}
`
const CREATE_CONTACTS_QUERY = gql`
 mutation MyMutation ($orbit_contact: orbit_contact_insert_input!) {
  insert_orbit_contact_one(object: $orbit_contact) {
    birthdate
    city
    country
    created_at
    email
    first_name
    id
    image
    job
    last_name
    middle_name
    note
    phone_no
    suffix
    updated_at
    title
    user
  }
}


`

const UPLOAD_CONTACT_PIC_QUERY = gql`
mutation MyMutation($base64:String!, $id:uuid!, $type:String!, $name:String!) {
  uploadContactPic(base64str: $base64, id: $id, name: $name, type: $type)  {
    image_url
  }
}

`

const UPDATE_CONTACT_QUERY =gql`
mutation MyMutation($id: uuid!, $_set: orbit_contact_set_input = {}) {
  update_orbit_contact_by_pk(pk_columns: {id: $id}, _set: $_set) {
    id
  }
}

`
const state = {
     allContacts:null,
     oneContact:null
}

const getters = {

    allContacts: (state) => (state.allContacts),
    oneContact: (state) => (state.oneContact)
     
}

const actions = {
    getAllContacts ({commit} , payload){
       
        const client = this.app.apolloProvider.defaultClient

        return  new Promise((resolve, reject)=>{
            client.query({query: ALL_CONTACTS_QUERY, variables:{}}).then(data=>{
         
       
                commit('setAllContacts', data.data.orbit_contact)
         resolve(data)
           
        
        })
        })
        
    },
    getOneContact ({commit}, id){
const client = this.app.apolloProvider.defaultClient
        return new Promise((resolve, reject)=>{
        client.query({query: CONTACT_BY_ID_QUERY, variables:{id}}).then(data=>{
           commit('setOneContacts',data.data.orbit_contact_by_pk)
           resolve(data)
        })
        })
        
       
       
    },
    deleteContact ({commit,state}, id){
        const client = this.app.apolloProvider.defaultClient
       
        return new Promise ((resolve,reject)=>{
              client.mutate({mutation: CONTACT_DELETE_QUERY, variables:{id}}).then(data=>{
           
                if(data){
                   
                      const filtered =   state.allContacts.filter(function(el) { return el.id !== id  });
                     
                     commit("setAllContacts", filtered)
                     resolve(data)
                }
            
         }) 
        })
           
       
      
    },
    createContact({commit,dispatch, state}, {formdata, base64, name, type}){
        const client = this.app.apolloProvider.defaultClient;

        return new Promise((resolve, reject)=>{
        
            client.mutate({mutation: CREATE_CONTACTS_QUERY, variables:{orbit_contact:formdata}}).then(data=>{
               
                 if(base64){
                    client.mutate({mutation: UPLOAD_CONTACT_PIC_QUERY, variables:{base64,  id:data.data.insert_orbit_contact_one.id,type,name }}).then(data=>{
                        console.log('hello we here',data)
                      if(data){
                         dispatch('getAllContacts').then(res=>{
                            if(res){
                                resolve(res)
                            }
                        })
                      }
                     
                 
             })
                }else{
                  dispatch('getAllContacts').then(res=>{
                    console.log(state,'here')
                    if(res){
                        resolve(res)
                    }
                })
                }
                
  
             })
             
        })
    },
    updateContact({commit,dispatch, state}, {formdata, base64, name, type, id}){
      const client = this.app.apolloProvider.defaultClient;
      console.log(id,'we have the id')
      return new Promise((resolve, reject)=>{
        console.log('we are here in contact', id)
          client.mutate({mutation: UPDATE_CONTACT_QUERY, variables:{id,_set:formdata}}).then(data=>{
               console.log('inside',data)
            if(base64){
                  client.mutate({mutation: UPLOAD_CONTACT_PIC_QUERY, variables:{base64, id:data.data.update_orbit_contact_by_pk.id,name, type}}).then(data=>{
                      console.log('we are inside upload')
                    if(data){
                       dispatch('getAllContacts').then(res=>{
                          if(res){
                              resolve(res)
                          }
                      })
                    }
                   
               
           })
              }else{
                dispatch('getAllContacts').then(res=>{
                  console.log(state,'here')
                  if(res){
                      resolve(res)
                  }
              })
              }
              

           })
           
      })
  }

}

const mutations = {
   setAllContacts: (state, data) => (state.allContacts = data),
   setOneContacts: (state, data) => (state.oneContact = data)
}

export default {
    state,
    getters,
    actions,
    mutations
}