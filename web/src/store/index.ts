import {createStore} from 'vuex'
import axios, {AxiosResponse} from "axios";

export default createStore({
    state: {
        status: false,
        user: {}
    },
    mutations: {
        auth_success(state, user) {
            state.status = true
            state.user = user
        },
        auth_error(state) {
            state.status = false
        },
        logout(state) {
            state.status = false
            state.user = {}
        },
    },
    actions: {
        login({commit}, user: { username: string, password: string }) {
            return new Promise((resolve, reject) => {
                axios({url: 'http://localhost:8000/auth/login', data: {user}, method: 'GET'})
                    .then((resp: AxiosResponse) => {
                        commit("auth_success", user);
                        resolve(resp)
                    })
                    .catch((err: Error) => {
                        commit('auth_error')
                        reject(err)
                    })
            })
        },
        logout({commit}) {
            return new Promise((resolve, reject) => {
                commit("logout");
                resolve()
            })
        },
    },
    modules: {},
    getters: {
        isLoggedIn: state => !!state.status,
    }
})
