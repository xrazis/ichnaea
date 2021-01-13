import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators'
import axios, {AxiosResponse} from "axios";

import {UserInterface} from "@/store/modules/user";

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
    private trainer = <UserInterface>{};
    private athletes = [<AthleteInterface>{}];
    private err = <Error>{};

    get athlete_current() {
        return this.athlete;
    }

    get athlete_trainer() {
        return this.trainer;
    }

    get athlete_currents() {
        return this.athletes;
    }

    get athlete_err() {
        return this.err;
    }

    @Mutation api_trainer(trainer: UserInterface) {
        this.trainer = trainer;
    }

    @Mutation
    private api_athlete(athlete: AthleteInterface) {
        this.athlete = athlete;
    }

    @Mutation
    private api_athletes(athletes: [AthleteInterface]) {
        this.athletes = athletes;
    }

    @Mutation
    private athletes_logout() {
        this.athlete = <AthleteInterface>{};
        this.trainer = <UserInterface>{};
        this.athletes = [<AthleteInterface>{}];
    }

    @Mutation
    private update_err(err: Error) {
        this.err = err;
    }

    @Mutation
    private athlete_addTrainer(trainer: UserInterface) {
        this.trainer = trainer;
        this.athlete._trainer = this.trainer._id;
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
    private athlete_update() {
        return new Promise((resolve, reject) => {
            axios({
                method: 'PUT',
                url: `/api/athletes/${this.athlete._id}`,
                data: {...this.athlete}
            })
                .then((resp: AxiosResponse) => {
                    this.context.commit('api_athlete', resp.data);
                    resolve(resp);
                })
                .catch((err: Error) => {
                    reject(err);
                });
        });
    }

    @Action
    private athlete_saveLocal(athlete: AthleteInterface) {
        this.context.commit('api_athlete', athlete);
    }
}