import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators'
import axios, {AxiosResponse} from "axios";
import qs from "qs";

export interface UserInterface {
    _id: string,
    username: string,
    email: string,
    password: string,
    registered: Date,
    lastLogin: Date,
}

@Module
export default class User extends VuexModule {
    private user = <UserInterface>{}
    private userStatus = false

    get currentUser() {
        return this.user
    }

    get isLoggedIn() {
        return this.userStatus
    }

    @Mutation
    private auth_success(user: UserInterface) {
        this.user = user;
        this.userStatus = true;
    }

    @Mutation
    private auth_error() {
        this.userStatus = false;
    }

    @Mutation
    private auth_logout() {
        this.user = <UserInterface>{}
        this.userStatus = false
    }

    @Action
    private login(user: UserInterface) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: '/auth/login',
                data: qs.stringify({...user})
            })
                .then((resp: AxiosResponse) => {
                    this.context.commit('auth_success', resp.data.user)
                    resolve(resp)
                })
                .catch((err: Error) => {
                    this.context.commit('auth_error')
                    reject(err)
                })
        })
    }

    @Action
    private logout() {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: '/auth/logout'
            })
                .then((resp: AxiosResponse) => {
                    this.context.commit("auth_logout");
                    resolve(resp)
                })
                .catch((err: Error) => {
                    reject(err)
                })
        })
    }

    @Action
    private getCurrentUser() {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: '/auth/current_user'
            })
                .then((resp: AxiosResponse) => {
                    this.context.commit("auth_success", resp.data);
                    resolve(resp)
                })
                .catch((err: Error) => {
                    this.context.commit('auth_error')
                    reject(err)
                })
        })
    }

    @Action
    private updateUser(user: UserInterface) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'PUT',
                url: `/api/user/${user._id}`,
                data: qs.stringify({...user})
            })
                .then((resp: AxiosResponse) => {
                    this.context.commit("auth_success", resp.data);
                    resolve(resp)
                })
                .catch((err: Error) => {
                    reject(err)
                })
        })
    }
}

