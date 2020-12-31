<template>

</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import {io} from 'socket.io-client'


export default class Dashboard extends Vue {
  private socket!: any;

  created() {
    this.io()
  }

  private io() {
    this.socket = io('/')

    this.socket.on('connect', () => {
      console.log(('Connected to server!'));
    });

    this.socket.on('disconnect', (reason: string) => {
      console.log(('Lost connection!'));

      if (reason === 'io server disconnect') this.socket.connect();

      if (reason === 'io client disconnect') {
        console.log(('Server kicked you!'))
      }

      console.log(('Reconnecting...'));
    });

    this.socket.on('console', (data: {}) => {
      console.log(data);
    })
  }
}
</script>


<style scoped>

</style>