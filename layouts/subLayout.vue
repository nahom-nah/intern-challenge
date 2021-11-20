<template>
    <v-app>
         <v-app-bar app elevate-on-scroll color="white">
   
         <v-img :src="require('@/assets/images/logo.png')" max-width="150" class="d-flex" />
         <v-spacer></v-spacer>
    
  <div
          class="navigation"
          
        >
           <v-list class="d-flex align-center">
             <v-list-item>Contacts</v-list-item>
            
             <v-list-item><v-btn class="rounded-xl py-3 px-8   white blue white--text" @click="logout">Logout</v-btn></v-list-item>
           </v-list>
        </div>
  
     
     
  
  </v-app-bar>
   
  <v-main>
      <nuxt/>
  </v-main>
   <v-footer class="blue white--text">
        <v-container>
            <v-row>
                <v-col class="font-weight-bold">dev2021@nahom_nah</v-col>
                 <v-col class="font-weight-bold">orbit health Intern Challenge</v-col>
                  <v-col class="d-flex font-weight-bold" ><v-icon class="pr-2 " color="white">mdi-email</v-icon> nahom.projectmanagement@gmail.com</v-col>
                    <v-col class="d-flex font-weight-bold" ><v-icon class="pr-2 " color="white">mdi-phone</v-icon> +251942104459</v-col>
                    
            </v-row>

        </v-container>
    </v-footer>
    </v-app>

</template>
<script>
export default {
  methods:{
    logout(){
       
        this.$router.push('/')
    }
  }
}
</script>