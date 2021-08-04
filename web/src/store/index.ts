import {createStore} from 'vuex';
import axios, {AxiosResponse} from "axios";
import createPersistedState from "vuex-persistedstate";

import user from './modules/user'
import backend from './modules/backend'
import athletes, {athleteState} from './modules/athletes'

export interface rootState {
    athleteState: athleteState,
}

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
        },
        readme({commit}) {
            return new Promise((resolve, reject) => {
                axios({
                    method: 'GET',
                    url: 'https://raw.githubusercontent.com/xrazis/ichnaea/main/README.md'
                })
                    .then((resp: AxiosResponse) => {
                        resolve(resp);
                    })
                    .catch((err: Error) => {
                        reject(err);
                    })
            });
        }
    },
    plugins: [createPersistedState()]
})
