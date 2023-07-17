'use strict'
import Vue from 'vue'

export default {
    namespaced: true,

    state: {
        data: []
    },

    getters: {
        all(state) {
            return state.data //Elle permet de recuperer les données dans la base de données
        }
    },

    mutations: {
        set(state, data) {
            state.data = data //Elle permet de modifier les données dans la base de données
        },
        delete(state, data) {

            const index = state.data.findIndex(user => {
                    return data.id === user.id
                }

            )
            if (index !== -1) {
                state.data.splice(index, 1)
            }

        }
    },

    actions: {
        load(context) { //Elle permet de charger l'ensembles utilisateurs de la base de données sur cette adresse ip
            return Vue.prototype.$http.get('/commerciaux') // elle represente la route
                .then(res => {
                    context.commit('set', res.data) //Elle permet recupere toutes les données de ma table
                    return true
                })
                .catch(err => {
                    console.log('erreur', err)
                    throw err
                })
        },
        add(context, data) { //address est une fonction qui se trouve ds addresses.js
            return Vue.prototype.$http.post(`/commercial/add`, data)
                .then(res => {
                    return res.data.id
                })
                .catch(err => {
                    throw err
                })
        },
        //Elle me permet d'ajouter les images
        addImages(context, data) {
            const df = new FormData()
            df.append("images", data.images)
            df.append("id_commerce", data.id_commerce)

            return Vue.prototype.$http.post(`/commercial/add/image/${data.id_commerce}`, df, {
                    headers: {
                        'Content-Type': 'multipart/from-data'
                    }

                }) //user est fonction dans user.php symfony
                .then((res) => {
                    return res
                })
                .catch(err => {
                    throw err
                })
        },

        loadOne(context, data) { //Elle permet de charge un seul utilisateur
            return Vue.prototype.$http.get(`/commercial/${data.id}`)
                .then(res => {
                    return res.data
                })
                .catch(err => {
                    console.log('erreur', err)
                    throw err
                })

        },

        update(context, data) {

            const df = new FormData()
            df.append("type", data.type)
            df.append("status", data.status)
            df.append("npa", data.npa)
            df.append("rue", data.rue)
            df.append("prix", data.prix)
            df.append("ville", data.ville)
            df.append("canton", data.canton)

            return Vue.prototype.$http.post(`/commercial/update/${data.id}`, df)
                .then(() => {
                    return true
                })
                .catch(err => {
                    throw err
                })

        },

        delete(context, data) {
            return Vue.prototype.$http.post(`/commercial/delete/${data.id}`, data)

            .then(() => {

                context.commit('delete', {
                    id: data.id
                })
            }).catch(err => {

                throw err
            })
        }


    }

}