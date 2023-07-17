'use strict'
import Vue from 'vue'

export default {
    namespaced: true,

    state: {
        data: [],
        user: null

    },

    getters: {
        all(state) {
            return state.data //Elle permet de recuperer les données dans la base de données
        },
        getUser(state) {
            return state.user //on recuprère le user elle utiliser dans navbar
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

        },
        setUser(state, user) {
            state.user = user //on va l'utilise la navbar
                // console.log(user)
        }
    },

    actions: {
        load(context) { //Elle permet de charger l'ensembles des users de la base de données sur cette adresse ip
            return Vue.prototype.$http.get('/users') // elle represente la route
                .then(res => {
                    context.commit('set', res.data) //Elle permet recupere toutes les données de ma table
                    return true
                })
                .catch(err => {
                    //  console.log('erreur', err)
                    throw err
                })
        },
        add(context, data) { //address est une fonction qui se trouve ds addresses.js
            console.log(data)
            return Vue.prototype.$http.post(`/user/add`, data)

            .then(() => {
                    return true
                })
                .catch(err => {
                    throw err
                })
        },
        // La route /address/update/ c'est de ma route du fichier route.yaml
        loadOne(context, data) { //Elle permet de charge un seul utilisateur
            return Vue.prototype.$http.get(`/user/${data.id}`)
                .then(res => {
                    context.commit('setUser', res.data)
                    return res.data
                })
                .catch(err => {
                    console.log('erreur', err)
                    throw err
                })

        },

        
        update(context, data) {
            const df = new FormData()
                df.append("nom", data.nom)
                df.append("prenom", data.prenom)
                df.append("rue", data.rue)
                df.append("ville", data.ville)
                df.append("npa", data.npa)
                df.append("date_naissance", data.date_naissance)
                df.append("entreprise", data.entreprise)
                df.append("phone", data.phone)
            return Vue.prototype.$http.post(`/address/update/${data.id}`, df)
                .then(() => {
                    return true
                })
                .catch(err => {
                    throw err
                })

        }





    }

}