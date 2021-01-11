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
    private err = <Error>{}

    get currentAthlete() {
        return this.athlete;
    }

    get currentTrainer() {
        return this.trainer;
    }

    get currentAthletes() {
        return this.athletes;
    }

    get getErrAthlete() {
        return this.err
    }

    @Mutation save_trainer(trainer: UserInterface) {
        this.trainer = trainer;
    }

    @Mutation
    private save_athlete(athlete: AthleteInterface) {
        this.athlete = athlete;
    }

    @Mutation
    private api_athletes(athletes: [AthleteInterface]) {
        this.athletes = athletes;
    }

    @Mutation
    private auth_logout() {
        this.athlete = <AthleteInterface>{};
        this.trainer = <UserInterface>{}
        this.athletes = [<AthleteInterface>{}];
    }

    @Mutation
    private update_error(err: Error) {
        this.err = err
    }

    @Action
    private getAthletes() {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: '/api/athletes'
            })
                .then((resp: AxiosResponse) => {
                    this.context.commit('api_athletes', resp.data)
                    resolve(resp)
                })
                .catch((err: Error) => {
                    reject(err)
                })
        })
    }

    @Action
    private updateAthlete(athlete: AthleteInterface) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'PUT',
                url: `/api/athletes/${athlete._id}`,
                data: {...athlete}
            })
                .then((resp: AxiosResponse) => {
                    this.context.commit('save_athlete', resp.data)
                    resolve(resp)
                })
                .catch((err: Error) => {
                    reject(err)
                })
        })
    }

    @Action
    private saveTrainer(trainer: UserInterface) {
        this.context.commit('save_trainer', trainer)
    }

    @Action
    private saveAthlete(athlete: AthleteInterface) {
        this.context.commit('save_athlete', athlete)
    }
}