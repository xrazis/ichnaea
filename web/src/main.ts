import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import {io} from 'socket.io-client'
import VueSocketIOExt from 'vue-socket.io-extended';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

axios.defaults.baseURL = '/';

createApp(App)
    .use(store)
    .use(router)
    .use(VueSocketIOExt, io('/'), {store})
    .mount('#app');
