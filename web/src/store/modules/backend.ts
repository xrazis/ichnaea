import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators'
import axios, {AxiosResponse} from "axios";

export interface AthleteData {
    measurement: Date,
    pointName: string,
}

@Module
export default class Backend extends VuexModule {
    private serverStatus = false;

    get server_status() {
        return this.serverStatus;
    }

    @Mutation
    private socket_connection(status: boolean) {
        this.serverStatus = status;
    }

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