import axios from 'axios';

// initial state
const state = () => ({
    property: null,
    errors: [],
    propertyCreated: false,
    properties: [],
    paginationData: null
})

const getters = {
    property: state => state.property,
    errors: state => state.errors,
    propertyCreated: state => state.propertyCreated,
    properties: state => state.properties,
    paginationData: state => state.paginationData
}

const actions = {

    async getAllProperties({ commit }, query = null) {
        let page = 1
        let search = ''
        if( null != query ) {
            page = query.page || 1
            search = query.search || ''
        }
        await axios.get(`${import.meta.env.VITE_API_URL}/property/list?page=${page}&search=${search}`)
            .then(res => {
                const pagination = {
                    total: res.data.data.total,  // total number of elements or items
                    total_pages: res.data.data.last_page // total pages in record
                }
                commit('setPaginationData', pagination);
                commit('setProperties', res.data.data.data)
            })
    },

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
    },
    setProperties: (state, properties) => {
        state.properties = properties
    },
    setPaginationData: (state, paginationData) => {
        state.paginationData = paginationData
      },
}

export default {
    state,
    getters,
    actions,
    mutations
}