import {createStore} from 'vuex'
import createPersistedState from "vuex-persistedstate";

import user from './modules/user'
import backend from './modules/backend'

export default createStore({
    modules: {
        user,
        backend
    },
    plugins: [createPersistedState()]
})
