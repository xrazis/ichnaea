<template>
  <Navbar/>
  <Sidebar/>
  <div class="content">
    <Tile/>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {io} from 'socket.io-client'
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import Tile from '@/components/Tile.vue'

@Options({
  components: {
    Navbar,
    Sidebar,
    Tile,
  }
})

export default class Dashboard extends Vue {
  private socket!: any;

  created() {
    this.io()
  }

  private io() {
    this.socket = io('/')

    this.socket.on('connect', () => {
    });

    this.socket.on('disconnect', (reason: string) => {

      if (reason === 'io server disconnect') this.socket.connect();

      if (reason === 'io client disconnect') {
      }

    });

    this.socket.on('console', (data: {}) => {
    })
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