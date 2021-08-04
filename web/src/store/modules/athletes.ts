import axios, {AxiosResponse} from "axios";
import {ActionTree} from "vuex";
import {rootState} from "@/store";

export interface AthleteInterface {
    _id: string,
    id: string,
    socketID: string,
    name: string,
    _trainer: string | undefined
}

export interface athleteState {
    athlete: AthleteInterface,
    athletes: [AthleteInterface],
    err: Error,
}

const state = () => ({
    athlete: <AthleteInterface>{},
    athletes: [<AthleteInterface>{}],
    err: <Error>{},
});

const getters = {
    athlete_err: (state: athleteState) => {
        return state.err;
    },
}

const mutations = {
    api_athletes(state: athleteState, athletes: [AthleteInterface]) {
        state.athletes = athletes;
    },
    athletes_logout(state: athleteState) {
        state.athlete = <AthleteInterface>{};
        state.athletes = [<AthleteInterface>{}];
    },
    update_err(state: athleteState, err: Error) {
        state.err = err;
    },
    athlete_deleteTrainer(state: athleteState) {
        delete state.athlete['_trainer'];
    }
}

const actions: ActionTree<athleteState, rootState> = {
    athlete_getOne({}, id: string) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: `/api/athletes/${id}`
            })
                .then((resp: AxiosResponse) => {
                    resolve(resp);
                })
                .catch((err: Error) => {
                    reject(err);
                });
        });
    },
    athlete_getAll({commit}) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: '/api/athletes'
            })
                .then((resp: AxiosResponse) => {
                    commit('api_athletes', resp.data);
                    resolve(resp);
                })
                .catch((err: Error) => {
                    reject(err);
                });
        });
    },
    athlete_update({}, athlete: AthleteInterface) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'PUT',
                url: `/api/athletes/${athlete._id}`,
                data: {...athlete}
            })
                .then((resp: AxiosResponse) => {
                    resolve(resp);
                })
                .catch((err: Error) => {
                    reject(err);
                });
        });
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
}