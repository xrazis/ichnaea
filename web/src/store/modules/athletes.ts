import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators'
import axios, {AxiosResponse} from "axios";

export interface AthleteInterface {
    _id: string,
    id: string,
    socketID: string,
    name: string,
    _trainer: string | undefined
}

@Module
export default class Athletes extends VuexModule {
    private athlete = <AthleteInterface>{};
    private athletes = [<AthleteInterface>{}];
    private err = <Error>{};

    get athlete_err() {
        return this.err;
    }

    @Mutation
    private api_athletes(athletes: [AthleteInterface]) {
        this.athletes = athletes;
    }

    @Mutation
    private athletes_logout() {
        this.athlete = <AthleteInterface>{};
        this.athletes = [<AthleteInterface>{}];
    }

    @Mutation
    private update_err(err: Error) {
        this.err = err;
    }

    @Mutation
    private athlete_deleteTrainer() {
        delete this.athlete['_trainer'];
    }

    @Action
    private athlete_getOne(id: string) {
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
    }

    @Action
    private athlete_getAll() {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: '/api/athletes'
            })
                .then((resp: AxiosResponse) => {
                    this.context.commit('api_athletes', resp.data);
                    resolve(resp);
                })
                .catch((err: Error) => {
                    reject(err);
                });
        });
    }

    @Action
    private athlete_update(athlete: AthleteInterface) {
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
    }
}