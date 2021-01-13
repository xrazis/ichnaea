import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators'
import axios, {AxiosResponse} from "axios";

export interface AthleteData {
    measurement: Date,
    pointName: string,
}

@Module
export default class Backend extends VuexModule {
    private serverStatus = false;
    private liveAthData: AthleteData[] = [];

    get server_status() {
        return this.serverStatus;
    }

    get server_liveData() {
        return this.liveAthData;
    }

    @Mutation
    private socket_connection(status: boolean) {
        this.serverStatus = status;
    }

    @Mutation
    private server_queueData(data: AthleteData) {
        this.liveAthData.push(data);
    }

    @Mutation
    private server_dequeueData() {
        this.liveAthData.shift();
    }

    @Mutation
    private server_logout() {
        this.liveAthData = [];
    }

    @Action
    private server_saveLiveData(data: AthleteData) {
        this.context.commit('server_queueData', data);
        if (this.liveAthData.length > 15)
            this.context.commit('server_dequeueData');
    }   //Too "expensive" of an action? To be refactored.

    @Action
    private server_getAll() {
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
    }

    @Action
    private server_getOne(id: string) {
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