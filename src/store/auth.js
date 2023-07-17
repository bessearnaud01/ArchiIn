'use strict'

import Vue from 'vue'

export default {
    namespaced: true,

    state: { //Elle represente le mail qu'on va mettre dans notre application
        nameUser: '', // username serait égale à notre   'user' => $this->getUser()->getUserIdentifier() qui se trouve dans notre apicontroller
        usernameId: 0,
        nom: '',
        prenom: '',
        photo: ''


    },

    getters: {
        usernameLogin(state) {
            return state.nameUser
        },
        userId(state) {
            // console.log('[getters]', state.usernameId)
            return state.usernameId
        }


    },

    mutations: {
        usernameLogin(state, data) {
            state.nameUser = data
        },
        userId(state, data) {
            state.usernameId = data
                // console.log('mutation', state.usernameId)
        },

        nom(state, data) {
            state.nom = data
                // console.log('mutation', state.usernameId)
        },

        prenom(state, data) {
            state.prenom = data
                // console.log('mutation', state.usernameId)
        },

        photo(state, data) {
            state.photo = data
                // console.log('mutation', state.usernameId)
        }

    },

    actions: {
        login(context, data) {
            return Vue.prototype.$http.post('/api/login', {
                    username: data.mail, //Elle represente l'email de notre base de données
                    password: data.motdepasse // elle est represente le mot de passe
                })
                .then(res => {
                    context.commit('usernameLogin', res.data.user)
                    context.commit('userId', res.data.idUser) //C'est l'id qu'on recupere lorsqu'on veut ajouter une adresse
                    context.commit('nom', res.data.nom)
                    context.commit('prenom', res.data.prenom)
                    context.commit('photo', res.data.photo)
                    return true
                })
                .catch(err => {
                    console.log('erreur', err)
                    context.commit('usernameLogin', '')
                    context.commit('userId', '')
                    context.commit('nom', '')
                    context.commit('prenom', '')
                    context.commit('photo', '')
                    throw err
                })
        },

        logout(context) {
            return Vue.prototype.$http.get('/api/logout')
                .then(() => {
                    context.commit('usernameLogin', '')
                    context.commit('userId', '')
                    context.commit('nom', '')
                    context.commit('prenom', '')
                    context.commit('photo', '')

                    return true
                })
                .catch(err => {
                    console.log('erreur', err)
                    throw err
                })
        },

        check(context) {
            return Vue.prototype.$http.get('/api/login/check')
                .then(res => {
                    context.commit('usernameLogin', res.data.user)
                    context.commit('userId', res.data.idUser)
                    context.commit('nom', res.data.nom)
                    context.commit('prenom', res.data.prenom)
                    context.commit('photo', res.data.photo)

                    //  console.log(res.data.idUser)
                    return true
                })
                .catch(err => {
                    console.log('erreur', err)
                    context.commit('usernameLogin', '')
                    context.commit('userId', '')
                    context.commit('nom', '')
                    context.commit('prenom', '')
                    context.commit('photo', '')
                    throw err
                })
        }
    }
}