<template>
    <div class="w-25">
        <div class="mb-3">
            <input class="form-control" type="email" v-model="email" placeholder="Email">
        </div>
        <div class="mb-3">
            <input class="form-control" type="password" v-model="password" placeholder="Password">
        </div>
        <div class="mb-3">
            <input class="btn btn-primary" type="submit" @click.prevent="login"  value="Войти">
        </div>
        <div v-if="error" class="text-danger">
            {{error}}
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Login",

    data(){
        return {
            email:null,
            password: null,
            error: null,
        }
    },

    methods:{
        login(){
            this.error = null
            axios.get('/sanctum/csrf-cookie').then(res => {
                axios.post('/api/auth/login', {email:this.email, password:this.password})
                    .then(r => {
                        this.$router.push({name: 'user.personal'})
                        localStorage.setItem('X-XSRF-TOKEN', r.config.headers['X-XSRF-TOKEN'])
                }).catch(er => {
                    // console.log(er)
                    this.error = er.response.data.errors
                })
            })
        }
    }

}
</script>

<style scoped>

</style>
