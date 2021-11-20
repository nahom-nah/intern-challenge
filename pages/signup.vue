<template>
    <div>
         
 
            <v-row  class="row">
                <v-col md="7" class="py-10 pl-10 d-flex align-center justify-center "><div  class="d-flex flex-column align-center justify-center">
                    <div class="blue--text title my-10 font-weight-bold">Register Now!</div>
                    <v-img :src="require('@/assets/images/login.jpg')" max-width="500"/>
                    <div class="d-flex flex-column align-center justify-center px-10">
                    <div class="title blue--text"> Hello Again!</div>
                    <div class="body-2 text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti ipsum, qui tempora aliquid eius necessitatibus quo pariatur dolores. Modi eos delectus animi qui ipsum repellendus. Voluptate provident in aperiam molestiae.</div>
                   </div> </div></v-col>
                <v-col md="5" class="pr-10 py-5 border-left"> 
                    <div class="blue--text font-weight-bold text-right">don't have an account?</div>

                    <div class="pt-3  px-14">
                        <div class="display-1 mt-10 font-weight-bold blue--text text-center">SignUp</div>
                        <div class="blue py-1 text-center mt-2"></div>
                        <form class="mt-8">
                            <v-text-field v-model="formdata.username" type="text" label="Username"    full-width outlined/>
                            <v-text-field v-model="formdata.email" type="email" label="Email"   full-width outlined/>
                            <v-text-field v-model="formdata.phoneNo" type="text" label="Phone Number"   full-width outlined/>
                            <v-text-field v-model="formdata.password" type="password" label="Password"   full-width outlined/>
                            <v-text-field v-model="formdata.confirmPassword" type="password" label="Confirm Password"   full-width outlined/>
                            <v-btn class="blue white--text" width="400" @click="handleSubmit">SignUp</v-btn>
                        </form>
                    </div>
                </v-col>
            </v-row>
       
        
    </div>
</template>

<script>

export default {
    layout:"empty",
    data(){
        return {
            formdata:{
                username:null,
                email:null,
                password:null,
                confirmPassword:null,
                phoneNo: null
            }
        }
    },
    methods:{
        handleSubmit(){
            this.$store.dispatch('auth/register', this.formdata)
        }
    }
}
</script>

<style scoped>
.row{
    height: '100vh';
}
</style>