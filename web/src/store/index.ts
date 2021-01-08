import {createStore} from 'vuex'
import createPersistedState from "vuex-persistedstate";

import user from './modules/user'
import backend from './modules/backend'
import athletes from './modules/athletes'

export default createStore({
    modules: {
        user,
        backend,
        athletes,
    },
    plugins: [createPersistedState()]
})
