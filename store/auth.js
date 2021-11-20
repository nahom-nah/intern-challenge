export const AUTH_MUTATIONS = {
    SET_USER: 'SET_USER',
    SET_PAYLOAD: 'SET_PAYLOAD',
    LOGOUT: 'LOGOUT',
  }
  
  export const state = () => ({
    token:  null,  
   
    id: null, 
    email: null,
  })
  
  export const mutations = {
  
    [AUTH_MUTATIONS.SET_USER] (state, { id, email }) {
      state.id = id
      state.email = email
    },
  
   
    [AUTH_MUTATIONS.SET_PAYLOAD] (state, { token }) {
      state.token = token
  
      
     
    },
  
  
    [AUTH_MUTATIONS.LOGOUT] (state) {
      state.id = null
      state.email = null
      state.token = null
     
    },
  }
  
  export const actions = {

     login ({ commit, dispatch }, { email, password }) {
    return new Promise((resolve,reject)=>{
        this.$axios.post(
        'http://localhost:9000/auth/login', 
        { email, password }
      ).then(data=>{
        localStorage.setItem('token', data.data.data.token )
        commit(AUTH_MUTATIONS.SET_USER, data.data.data.user)
        commit(AUTH_MUTATIONS.SET_PAYLOAD,{ token: data.data.data.token})
        resolve(data)
      })
      
    })
      
      
  
    

      
    },
  
     async register ({ commit }, { email, password, phoneNo, username, confirmPassword }) {
      
       
      const data = await this.$axios.post(
        'http://localhost:9000/auth/signup', 
        { email, password, phone_no:phoneNo, confirmPassword, username }
      )
      
      
      localStorage.setItem('token', data.data.data.token )
      
      commit(AUTH_MUTATIONS.SET_USER, data.data.data.user)
      commit(AUTH_MUTATIONS.SET_PAYLOAD,{ token: data.data.data.token})

      await this.$router.push('/home')
    },
  
   
  
   
    logout ({ commit, state }) {
      commit(AUTH_MUTATIONS.LOGOUT)
    },
  }
  
  export const getters = {
    // determine if the user is authenticated based on the presence of the access token
    isAuthenticated: (state) => {
      return state.token && state.token !== ''
    },
  }