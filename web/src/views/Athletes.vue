<template>
  <h1 class="title is-2">Athletes</h1>
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
        <th>Athlete id</th>
        <th>Name</th>
        <th>Trainer</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tr v-for="(athlete, index) in athletes" :key="index">
        <td class="is-family-monospace">
          <span class="icon-text">
          <span class="icon mr-1"><i class="fa fa-id-card"></i></span>
          <span>{{ athlete.id }}</span>
          </span>
        </td>
        <td>
          <span class="icon-text">
          <span class="icon mr-1"><i class="fa fa-signature"></i></span>
          <span>{{ athlete.name }}</span>
          </span>
        </td>
        <td v-if="athlete._trainer">
          <span class="icon mr-1"><i class="fa fa-check"></i></span>
        </td>
        <td v-else>
          <span class="icon mr-1"><i class="fa fa-times"></i></span>
        </td>
        <td>
          <router-link :to="{ name: 'Athlete', params: { id: athlete._id }}" @click="saveAthlete(athlete)">
          <span class="icon has-text-primary-dark">
          <i class="fa fa-2x fa-user-edit"></i>
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
import {UserInterface} from "@/store/modules/user";

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