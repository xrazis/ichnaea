import {createStore} from 'vuex'
import createPersistedState from "vuex-persistedstate";
import axios, {AxiosResponse} from "axios";
import qs from 'qs'

export default createStore({
    state: {
        userStatus: false,
        user: {},
        serverStatus: false
    },
    mutations: {
        auth_success(state, user) {
            state.userStatus = true
            state.user = user
        },
        auth_error(state) {
            state.userStatus = false
        },
        logout(state) {
            state.userStatus = false
            state.serverStatus = false
            state.user = {}
        },
        serverConnected(state, status) {
            state.serverStatus = status
        }
    },
    actions: {
        login({commit}, user: { username: string, password: string }) {
            return new Promise((resolve, reject) => {
                axios({
                    method: 'post',
                    url: '/auth/login',
                    data: qs.stringify({...user})
                })
                    .then((resp: AxiosResponse) => {
                        commit("auth_success", resp.data.user);
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
                    url: '/auth/logout'
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
        getCurrentUser({commit}) {
            return new Promise((resolve, reject) => {
                axios({
                    method: 'get',
                    url: '/auth/current_user'
                })
                    .then((resp: AxiosResponse) => {
                        commit("auth_success", resp.data);
                        resolve(resp)
                    })
                    .catch((err: Error) => {
                        commit('auth_error')
                        reject(err)
                    })
            })
        },
        updateUser({commit}, user) {
            return new Promise((resolve, reject) => {
                axios({
                    method: 'put',
                    url: `/api/user/${user._id}`,
                    data: qs.stringify({...user})
                })
                    .then((resp: AxiosResponse) => {
                        commit("auth_success", resp.data);
                        resolve(resp)
                    })
                    .catch((err: Error) => {
                        reject(err)
                    })
            })
        }
    },
    modules: {},
    getters: {
        isLoggedIn: state => state.userStatus,
        user: state => state.user,
        serverStatus: state => state.serverStatus
    },
    plugins: [createPersistedState()]
})
