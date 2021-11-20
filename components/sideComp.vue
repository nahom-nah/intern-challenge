<template>

    <div @click="showInfo(contact.id)" class="d-flex   px-20 py-3">
       
            <v-img alt="default" :src="contact.image!==''? contact.image: require('@/assets/images/profile.jpg')" max-width="40" max-height="40" class="rounded-circle "/>
        <div class="mx-2">
            <div class="body-2 font-weight-bold">{{contact.first_name}} {{contact.middle_name}}</div>
            <div class="body-2">{{contact.job}}</div>
        </div>
       
        
    </div>
</template>

<script>
 
export default  {
   props:['contact','showInfo']
}
</script>
