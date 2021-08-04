<template>
  <h1 class="title is-2">/athletes/{{ athlete.name }}/table</h1>

  <div class="notification is-link is-light">
    All data for "{{ athlete.name }}" will appear here, as streamed by the server. This is for debugging purposes.
  </div>

  <div class="table-container">
    <table class="table is-narrow is-striped">

      <thead>
      <tr>
        <th v-for="(data, key) in mData[0]">
          {{ key }}
        </th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(data, key) in mData" :key="key">
        <td v-for="(value) in data">
          {{ value }}
        </td>
      </tr>
      </tbody>

    </table>
  </div>
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import {AthleteInterface} from "@/store/modules/athletes";
import {AthleteData} from "@/store/modules/backend";

export default class Table extends Vue {
  private athlete = <AthleteInterface>{};
  private mData = [<AthleteData>{}];
  private id: string = '';

  mounted() {
    this.$store.dispatch('athlete_getOne', this.$route.params.id)
        .then((res: any) => this.athlete = res.data);

    this.$socket.client.on('console', this.displayData);
  }

  beforeUnmount() {
    this.$socket.client.off('console', this.displayData);
  }

  displayData(params: AthleteData) {
    if (this.mData.length > 10) this.mData.pop();

    this.mData.unshift(params);
  }

  athlete_storedData() {
    this.$store.dispatch('server_getOne', this.athlete._id)
        .then((res: any) => console.log(res));
  }
}
</script>

<style scoped>

</style>