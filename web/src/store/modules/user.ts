import axios, {AxiosResponse} from "axios";
import {ActionTree} from "vuex";
import {rootState} from "@/store";
import qs from "qs";

export interface UserInterface {
    _id: string,
    username: string,
    email: string,
    password: string | undefined,
    newPassword: string | undefined,
    repeatNewPassword: string | undefined,
    registered: Date,
    lastLogin: Date,
}

export interface userState {
    user: UserInterface,
    userStatus: boolean,
    err: Error,
}

const state = () => ({
    user: <UserInterface>{},
    userStatus: false,
    err: <Error>{},
});

const getters = {
    user_current: (state: userState) => {
        return state.user;
    },
    user_loggedIn: (state: userState) => {
        return state.userStatus;
    },
    user_err: (state: userState) => {
        return state.err;
    },
}

const mutations = {
    auth_success(state: userState, user: UserInterface) {
        state.user = user;
        delete state.user['password'];
        state.userStatus = true;
    },
    auth_error(state: userState, err: Error) {
        state.userStatus = false;
        state.err = err;
    },
    auth_logout(state: userState,) {
        state.user = <UserInterface>{};
        state.userStatus = false;
    },
    update_err(state: userState, err: Error) {
        state.err = err;
    },
    update_user(state: userState, user: UserInterface) {
        state.user = user;
        delete state.user['password'];
    },
}

const actions: ActionTree<userState, rootState> = {
    user_register({commit}, user: UserInterface) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: '/auth/register',
                data: qs.stringify({...user})
            })
                .then((resp: AxiosResponse) => {
                    commit('auth_success', resp.data.user);
                    resolve(resp);
                })
                .catch((err: Error) => {
                    commit('auth_error', err);
                    reject(err);
                });
        });
    },
    user_login({commit}, user: UserInterface) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: '/auth/login',
                data: qs.stringify({...user})
            })
                .then((resp: AxiosResponse) => {
                    commit('auth_success', resp.data.user);
                    resolve(resp);
                })
                .catch((err: Error) => {
                    commit('auth_error', err);
                    reject(err);
                });
        });
    },
    user_logout({commit}) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: '/auth/logout'
            })
                .then((resp: AxiosResponse) => {
                    commit('auth_logout');
                    commit('athlete_logout');
                    resolve(resp);
                })
                .catch((err: Error) => {
                    reject(err);
                });
        });
    },
    user_currentSession({commit}) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: '/auth/current_user'
            })
                .then((resp: AxiosResponse) => {
                    commit('auth_success', resp.data);
                    resolve(resp);
                })
                .catch((err: Error) => {
                    commit('auth_error');
                    reject(err);
                });
        });
    },
    user_update({state, commit}) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'PUT',
                url: `/api/user/${state.user._id}`,
                data: {...state.user}
            })
                .then((resp: AxiosResponse) => {
                    commit('update_user', resp.data);
                    resolve(resp);
                })
                .catch((err: Error) => {
                    commit('update_err', err);
                    reject(err);
                });
        });
    },
    user_getOne({}, id: string) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: `/api/user/${id}`
            })
                .then((resp: AxiosResponse) => {
                    resolve(resp);
                })
                .catch((err: Error) => {
                    reject(err);
                });
        });
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}