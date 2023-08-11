<template>
    <div>
        <ul class="nav nav-underline mb-3">
            <li class="nav-item">
                <router-link class="nav-link" :to="{name: 'home.index'}">Home</router-link>
            </li>
            <li class="nav-item" v-if="token">
                <router-link class="nav-link" :to="{name: 'get.index'}">Get</router-link>
            </li>
            <li class="nav-item" v-if="token">
                <router-link class="nav-link" :to="{name: 'user.personal'}">Personal</router-link>
            </li>
            <li class="nav-item" v-if="!token">
                <router-link class="nav-link" :to="{name: 'user.login'}">Login</router-link>
            </li>
            <li class="nav-item" v-if="!token">
                <router-link class="nav-link" :to="{name: 'user.registration'}">Registration</router-link>
            </li>
            <li class="nav-item" v-if="token">
                <a class="nav-link" href="#" @click.prevent="logout">Logout</a>
            </li>
        </ul>
        <router-view :key="$route.fullPath"></router-view>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Index",

    data(){
        return{
            token: null,
        }
    },

    mounted() {
        this.getToken()
    },
    updated() {
        this.getToken()
    },

    methods:{
        getToken(){
            this.token = localStorage.getItem('X-XSRF-TOKEN')
        },
        logout(){
            axios.post('/api/auth/logout').then(res => {
                console.log('Logout', res)
                localStorage.removeItem('X-XSRF-TOKEN')
                this.$router.push({name: 'user.login'})
            })
        }
    }
}
</script>

<style scoped>

</style>
