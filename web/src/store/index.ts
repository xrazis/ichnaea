import {createStore} from 'vuex'
import createPersistedState from "vuex-persistedstate";
import axios, {AxiosResponse} from "axios";
import qs from 'qs'

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
                axios({
                    method: 'post',
                    url: 'http://localhost:8000/auth/login',
                    data: qs.stringify({...user})
                })
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
                axios({
                    method: 'post',
                    url: 'http://localhost:8000/auth/logout'
                })
                    .then((resp: AxiosResponse) => {
                        commit("logout");
                        resolve(resp)
                    })
                    .catch((err: Error) => {
                        commit("logout");
                        commit('auth_error')
                        reject(err)
                    })
            })
        },
        getUser({commit}) {
            return new Promise((resolve, reject) => {
                axios({
                    method: 'get',
                    url: 'http://localhost:8000/auth/current_user'
                })
                    .then((resp: AxiosResponse) => {
                        console.log(resp)
                        commit("auth_success", resp.data);
                        resolve(resp)
                    })
                    .catch((err: Error) => {
                        console.log(err)
                        commit('auth_error')
                        reject(err)
                    })
            })
        }
    },
    modules: {},
    getters: {
        isLoggedIn: state => state.status,
    },
    plugins: [createPersistedState()]
})
