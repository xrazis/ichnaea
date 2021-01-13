<template>
  <Navbar/>
  <Sidebar/>
  <div class="content">
    <router-view></router-view>
  </div>
  <Footer/>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {io} from 'socket.io-client'
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import Footer from '@/components/Footer.vue'
import {AthleteData} from "@/store/modules/backend";

@Options({
  components: {
    Navbar,
    Sidebar,
    Footer
  }
})

export default class Dashboard extends Vue {
  private socket!: any;

  created() {
    this.io();
  }

  beforeUnmount() {
    this.socket.close()
  }

  private io() {
    this.socket = io('/');

    this.socket.on('connect', () => {
      this.$store.commit("socket_connection", true);
    });

    this.socket.on('disconnect', (reason: string) => {
      this.$store.commit("socket_connection", false);

      if (reason === 'io server disconnect') this.socket.connect();
    });

    this.socket.on('console', (data: AthleteData) => {
      this.$store.dispatch('server_saveLiveData', data);
    });
  }
}
</script>

<style scoped>
@media (min-width: 572px) {
  .content {
    position: relative;
    margin-top: 7vh;
    margin-left: 17rem;
    margin-right: 2rem;
  }
}
</style>