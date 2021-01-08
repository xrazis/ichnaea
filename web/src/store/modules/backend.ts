import {Module, Mutation, VuexModule} from 'vuex-module-decorators'

@Module
export default class Backend extends VuexModule {
    private serverStatus = false

    get currentStatus() {
        return this.serverStatus
    }

    @Mutation
    private serverConnected(status: boolean) {
        this.serverStatus = status
    }
}