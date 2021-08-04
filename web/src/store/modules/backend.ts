import axios, {AxiosResponse} from "axios";
import {ActionTree} from "vuex";
import {rootState} from "@/store";

export interface AthleteData {
    measurement: Date,
    pointName: string,
}

export interface backendState {
    serverStatus: boolean,
}

const state = () => ({
    serverStatus: false,
});

const getters = {
    server_status(state: backendState) {
        return state.serverStatus;
    }
}

const mutations = {
    socket_connection(state: backendState, status: boolean) {
        state.serverStatus = status;
    }
}

const actions: ActionTree<backendState, rootState> = {
    server_getAll() {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: `/api/data/`
            })
                .then((resp: AxiosResponse) => {
                    resolve(resp);
                })
                .catch((err: Error) => {
                    reject(err);
                });
        });
    },
    server_getOne({}, id: string) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: `/api/data/${id}`
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