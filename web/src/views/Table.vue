<template>
  <h1 class="title is-2">/athletes/{{ athlete.name }}/table</h1>
  <div class="table-container">
    <table class="table is-narrow is-striped">

      <thead>
      <tr>
        <th v-for="(key) in mData[0]">
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

  mounted() {
    this.athlete = this.$store.getters.athlete_current;
    this.mData = this.$store.getters.server_liveData;
  }

  athlete_storedData() {
    this.$store.dispatch('server_getOne', this.athlete._id)
        .then((res: any) => console.log(res));
  }
}
</script>

<style scoped>

</style>