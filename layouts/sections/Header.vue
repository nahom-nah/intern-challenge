<template>
  <v-app-bar app elevate-on-scroll color="white">
    <v-container class="py-0 fill-height">
         <v-img :src="require('@/assets/images/logo.png')" max-width="150" class="d-flex" />
         <v-spacer></v-spacer>
    
  <div
          class="navigation"
          
        >
           <v-list class="d-flex align-center">
             <v-list-item>Home</v-list-item>
             <v-list-item>About</v-list-item>
             <v-list-item><router-link to="/login">Login</router-link> </v-list-item>
             <v-list-item><v-btn class="rounded-xl py-3 px-8   white blue white--text"><router-link to="/signup">SignUp</router-link> </v-btn></v-list-item>
           </v-list>
        </div>
    </v-container>
     
     
  
  </v-app-bar>
</template>

 <script>
   
  export default {
    components:{
     
    }
  }
 </script>