import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'

Vue.use(Vuex)

let mutations = {
    updateLoadingStatus (state, payload) {
        state.isLoading = payload.isLoading
    },
}

let actions = {
    updateLoadingStatus ({commit}, isLoading) {
        commit({type: 'updateLoadingStatus', isLoading: isLoading})
    }
}

let getters = {
    getIsLoading(state){
        return state.isLoading
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
})
