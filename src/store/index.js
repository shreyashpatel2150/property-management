import { createStore } from 'vuex'

// import modules
import property from './modules/property'

const store = createStore({
    modules: {
        property
    }
})

export default store