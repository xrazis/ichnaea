import {Store} from '@/store'; // path to store file

declare module '@vue/runtime-core' {
    // noinspection JSUnusedGlobalSymbols
    interface ComponentCustomProperties {
        $store: Store;
    }
}
