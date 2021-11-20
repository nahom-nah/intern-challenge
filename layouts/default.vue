<template>
 <v-app>
   <Header/>
   <v-main>
     <nuxt/>
   </v-main>
   <Footer/>
 </v-app>
</template>

<script>
import Header from './sections/Header.vue'
import Footer from './sections/Footer.vue'
export default {
  components:{
    Header,
    Footer
  },
  data () {
    return {
        
    }
  }
}
</script>
