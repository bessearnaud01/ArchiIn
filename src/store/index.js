import Vue from 'vue'
import Vuex from 'vuex'
import users from './users'
import auth from './auth'
//import addresses from './addresses.js'
import commercial from './commercials'


Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        users,
        auth,
        //addresses,
        commercial

    }
})

export default store