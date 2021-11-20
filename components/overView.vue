<template>
    <div>
        <div class="d-flex flex-column align-center justify-center py-7 blue rounded-b-circle rounded-t-md">
            <v-img :src="require('@/assets/images/profile.jpg')" width="100" height="100" class="rounded-circle"/>
            <div>
                <div class="display-1 font-weight-bold white--text">Welcome Nahom!</div>

            </div>
        </div>
        <div class=" d-flex flex-column align-center justify-center py-10">
            <div class="title">Recent Activity</div>
             <div class="d-flex py-5 align-center">
                <v-img :src="require('@/assets/images/profile.jpg')" width="60" height="60" class="rounded-circle"/>
             
                <div class="px-4"><span class="font-weight-bold">Nahom balcha was Updated </span> by you at 2:44 PM</div>
             </div>
            
             
        </div>
    </div>
</template>