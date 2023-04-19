import axios from 'axios';

// initial state
const state = () => ({
    property: null,
    errors: [],
    propertyCreated: false
})

const getters = {
    property: state => state.property,
    errors: state => state.errors,
    propertyCreated: state => state.propertyCreated,
}

const actions = {

    async storeProperty({ commit }, property) {
        commit('setErrors', [])
        commit('setPropertyCreated', false)
        await axios.post(`${import.meta.env.VITE_API_URL}/property/create`, property)
            .then(res => {
                commit('setProperty', res.data)
                commit('setPropertyCreated', true)
            }).catch(err => {
                commit('setErrors', err.response.data.errors)
            })
    }
}

const mutations = {
    setErrors: (state, errors) => {
        state.errors = errors
    },
    setProperty: (state, property) => {
        state.property = property
    },
    setPropertyCreated: (state, status) => {
        state.propertyCreated = status
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}