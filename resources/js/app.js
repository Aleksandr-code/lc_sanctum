import './bootstrap';
import { createApp } from 'vue';
import IndexComponent from './components/Index.vue';
import router from "./router";

const app = createApp({})

app.use(router)

app.component('Index', IndexComponent)

app.mount('#app');
