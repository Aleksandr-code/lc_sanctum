<template>
    <div>
        <div v-if="user">
            {{user}}
        </div>
        <div v-if="information">
            {{information}}
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Get",

    data(){
        return{
            information: null,
            user: null
        }
    },

    mounted() {
        this.getInformation()
        // this.getUser()
    },

    methods:{
        getInformation(){
            axios.get('/api/get').then( res => {
                this.information = res.data
                console.log(res)
            }).catch(er => {
                console.log(er)
            })
        },
        // getUser(){
        //     axios.get('/api/user').then(res => {
        //         this.user = res.data
        //     })
        // }
    }
}
</script>

<style scoped>

</style>
