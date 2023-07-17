import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router' //on ecrit en miniscule le fichier router
import store from './store' //On import store dans le fichier main.js
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios.create({
    baseURL: `http://localhost:8181`,
    timeout: 5000,
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    withCredentials: true
}))

Vue.config.productionTip = false

new Vue({
    router,
    vuetify,
    store,
    render: h => h(App)
}).$mount('#app')