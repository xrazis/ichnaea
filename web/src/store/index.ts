import {createStore} from 'vuex'
import createPersistedState from "vuex-persistedstate";

import user from './modules/user'
import backend from './modules/backend'
import athletes from './modules/athletes'
import axios, {AxiosResponse} from "axios";

export default createStore({
    modules: {
        user,
        backend,
        athletes,
    },
    actions: {
        logout({commit}) {
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url: '/auth/logout',
                })
                    .then((resp: AxiosResponse) => {
                        commit('auth_logout');
                        commit('athletes_logout');
                        commit('server_logout');
                        resolve(resp);
                    })
                    .catch((err: Error) => {
                        reject(err);
                    });
            });
        }
    },
    plugins: [createPersistedState()]
})
