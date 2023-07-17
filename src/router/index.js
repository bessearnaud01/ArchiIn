import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home' // on ajoute le ficheir home.vue
import Register from '@/views/Register'
import Login from '@/views/Login'
import Tableau from '@/views/Tableau'
import store from '@/store'
import TableauDeBordCommercial from '@/views/TableauDeBordCommercial'
import Address from '@/views/Address'
import AddCommercial from '@/views/AddCommercial'
import UpdateCommercial from '@/views/UpdateCommercial'
import AddImage from '@/views/AddImage'

//console.log(store)

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/addImage',
            name: 'addImage',
            beforeEnter(to, from, next) {

                store.dispatch('auth/check')
                    .then(() => {
                        next()
                    }).catch(() => {
                        next({ name: 'login' }) // Si le user n'existe pas il reste sur login
                    })
            },
            component: AddImage
        },
        {
            path: '/address',
            name: 'address',
            beforeEnter(to, from, next) {

                store.dispatch('auth/check')
                    .then(() => {
                        next()
                    }).catch(() => {
                        next({ name: 'login' }) // Si le user n'existe pas il reste sur login
                    })
            },
            component: Address
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/tableau',
            name: 'tableau',
            beforeEnter(to, from, next) {

                store.dispatch('auth/check')
                    .then(() => {
                        // console.log("Une dans le next")
                        next()
                    }).catch(() => {
                        //   console.log("Une dans le catch")
                        next({ name: 'login' }) // Si le user n'existe pas il reste sur login
                    })
            },
            component: Tableau


        },
        {
            path: '/TableauDeBordDesCommerciaux',
            name: 'TableauDeBordCommercial',
            beforeEnter(to, from, next) {

                store.dispatch('auth/check')
                    .then(() => {
                        next()
                    }).catch(() => {
                        next({ name: 'login' }) // Si le user n'existe pas il reste sur login
                    })
            },

            component: TableauDeBordCommercial
        },
        {
            path: '/Ajouter-Bien-commercial',
            name: 'AddCommercial',
            beforeEnter(to, from, next) {

                store.dispatch('auth/check')
                    .then(() => {
                        next()
                    }).catch(() => {
                        next({ name: 'login' }) // Si le user n'existe pas il reste sur login
                    })
            },

            component: AddCommercial
        },
        {
            path: '/Edite-Bien-commercial',
            name: 'UpdateCommercial',
            beforeEnter(to, from, next) {

                store.dispatch('auth/check')
                    .then(() => {
                        next()
                    }).catch(() => {
                        next({ name: 'login' }) // Si le user n'existe pas il reste sur login
                    })
            },

            component: UpdateCommercial
        }


    ]


})

export default router