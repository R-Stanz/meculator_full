import { createApp } from 'vue'
import './style.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import App from './App.vue'
import router from './router'
import VeeValidatePlugin from "./includes/validation"
import axios from 'axios'
import vueAxios from 'vue-axios'
import { createPinia } from 'pinia'
import "bootstrap"

const app = createApp(App)

app.use(vueAxios, axios)
app.use(createPinia())
app.use(router)
app.use(VeeValidatePlugin)
app.mount('#app')
