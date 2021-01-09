<template>
  <h1 class="title is-2">/athletes</h1>
  <div class="tile">
    <table
        class="table
        is-striped
        is-large
        is-hoverable
        is-fullwidth
has-text-left"
    >
      <thead>
      <tr>
        <th><span class="icon mr-1"><i class="fa fa-id-card"></i></span>
          Athlete id
        </th>
        <th><span class="icon mr-1"><i class="fas fa-running"></i></span>
          Name
        </th>
        <th>Trainer</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tr v-for="(athlete, index) in athletes" :key="index">
        <td class="is-family-monospace">
          <span>{{ athlete.id }}</span>
        </td>
        <td>
          <span>{{ athlete.name }}</span>
        </td>
        <td v-if="athlete._trainer">
          <span class="icon mr-1"><i class="fa fa-check"></i></span>
        </td>
        <td v-else>
          <span class="icon mr-1"><i class="fa fa-times"></i></span>
        </td>
        <td>
          <router-link :to="{ name: 'Athlete', params: { id: athlete._id }}" @click="saveAthlete(athlete)">
          <span class="icon is-medium has-background-warning has-text-white mr-1">
          <i class="fa fa-lg fa-user-edit"></i>
        </span>
          </router-link>
          <router-link :to="{ name: 'Table', params: { id: athlete._id }}" @click="saveAthlete(athlete)">
          <span class="icon is-medium has-background-primary has-text-white mr-1">
          <i class="fa fa-lg fa-table"></i>
        </span>
          </router-link>
          <router-link :to="{ name: 'Chart', params: { id: athlete._id }}" @click="saveAthlete(athlete)">
          <span class="icon is-medium has-background-primary has-text-white mr-1">
          <i class="fa fa-lg fa-chart-area"></i>
        </span>
          </router-link>

        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";
import {AthleteInterface} from "@/store/modules/athletes";

export default class Athletes extends Vue {
  private athletes = [<AthleteInterface>{}]
  private msg = ''

  mounted() {
    this.$store.dispatch('getAthletes')
        .then((res: any) => this.athletes = res.data)
        .catch((err: any) => this.msg = err.response.data.errors.message || err.message || 'Something went wrong!')
  }

  private saveAthlete(athlete: AthleteInterface) {
    this.$store.dispatch('saveAthlete', athlete)
  }

}
</script>

<style scoped>

</style>