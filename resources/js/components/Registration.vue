<template>
    <div>
        <div class="w-25">
            <div class="mb-3">
                <input class="form-control" type="text" v-model="name" placeholder="Name">
            </div>
            <div class="mb-3">
                <input class="form-control" type="email" v-model="email" placeholder="Email">
            </div>
            <div class="mb-3">
                <input class="form-control" type="password" v-model="password" placeholder="Password">
            </div>
            <div class="mb-3">
                <input class="form-control" type="password" v-model="password_confirmation"
                       placeholder="Password repeat">
            </div>
            <div class="mb-3">
                <input class="btn btn-primary" type="submit" @click.prevent="registration" value="Регистрация">
            </div>
            <div v-if="error" class="text-danger">
                {{ error }}
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Registration",

    data() {
        return {
            name: null,
            email: null,
            password: null,
            password_confirmation: null,
            error: null,
        }
    },

    methods: {
        registration() {
            axios.post('/api/auth/register', {
                name: this.name,
                email: this.email,
                password: this.password,
                password_confirmation: this.password_confirmation
            })
                .then(res => {
                    console.log(res);
                    localStorage.setItem('X-XSRF-TOKEN', res.config.headers['X-XSRF-TOKEN'])
                    this.$router.push({name: 'user.personal'})
                }).catch(er => {
                this.error = er.response.data.errors
            })
        }
    }
}
</script>

<style scoped>

</style>
