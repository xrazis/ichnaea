<template>
  <h1 class="title is-2">/athletes</h1>

  <div class="notification is-link is-light">
    Your adopted athletes are displayed on this table. Choose an athlete and view his details, data.
  </div>

  <div class="section">
    <div class="table-container">
      <table class="table is-striped is-large is-hoverable is-fullwidth has-text-centered">

        <thead>
        <tr>
          <th>
            <span class="icon mr-1"><i class="fa fa-plug"></i></span>Athlete status
          </th>
          <th>
            <span class="icon mr-1"><i class="fas fa-running"></i></span>Name
          </th>
          <th>
            <span class="icon mr-1"><i class="fas fa-id-badge"></i></span>ID
          </th>
          <th>Actions</th>
        </tr>
        </thead>

        <tr v-for="(athlete, index) in myAthletes" :key="index">
          <td v-if="athlete.name" class="is-family-monospace">
            <span v-if="athlete.socketID">Online</span>
            <span v-else>Offline</span>
          </td>
          <td v-if="athlete.name">
            <span>{{ athlete.name }}</span>
          </td>
          <td v-if="athlete.name">
            <span>{{ athlete.id }}</span>
          </td>
          <td v-if="athlete.name">
            <router-link :to="{ name: 'Table', params: { id: athlete._id }}" @click="athlete_save(athlete)">
          <span class="icon is-medium has-background-primary has-text-white mr-1">
          <i class="fa fa-lg fa-table"></i>
        </span>
            </router-link>
            <router-link :to="{ name: 'Chart', params: { id: athlete._id }}" @click="athlete_save(athlete)">
          <span class="icon is-medium has-background-primary has-text-white mr-1">
          <i class="fa fa-lg fa-chart-area"></i>
        </span>
            </router-link>
            <router-link :to="{ name: 'Athlete', params: { id: athlete._id }}" @click="athlete_save(athlete)">
          <span class="icon is-medium has-background-warning has-text-white mr-1">
          <i class="fa fa-lg fa-user-edit"></i>
          </span>
            </router-link>
            <a @click="athlete_delete(athlete, index)">
          <span class="icon is-medium has-background-danger has-text-white mr-1">
          <i class="fa fa-lg fa-user-times"></i>
        </span>
            </a>
          </td>
        </tr>

      </table>
    </div>
  </div>

  <div class="section is-medium">
    <div class="container">
      <h3 class="title is-4">Search all athletes</h3>
      <p class="subtitle">All athletes are displayed on this table.</p>
      <div class="control">
        <label>
          <input class="input is-focused" placeholder="Search Athletes" type="text">
        </label>
      </div>
    </div>

    <div class="table-container">
      <table
          class="table is-striped is-large is-hoverable is-fullwidth has-text-centered">

        <thead>
        <tr>
          <th><span class="icon mr-1"><i class="fa fa-plug"></i></span>
            Athlete status
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
            <span v-if="athlete.socketID">Online</span>
            <span v-else>Offline</span>
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
            <router-link :to="{ name: 'Table', params: { id: athlete._id }}" @click="athlete_save(athlete)">
          <span class="icon is-medium has-background-primary has-text-white mr-1">
          <i class="fa fa-lg fa-table"></i>
        </span>
            </router-link>
            <router-link :to="{ name: 'Chart', params: { id: athlete._id }}" @click="athlete_save(athlete)">
          <span class="icon is-medium has-background-primary has-text-white mr-1">
          <i class="fa fa-lg fa-chart-area"></i>
        </span>
            </router-link>
            <router-link :to="{ name: 'Athlete', params: { id: athlete._id }}" @click="athlete_save(athlete)">
          <span class="icon is-medium has-background-warning has-text-white mr-1">
          <i class="fa fa-lg fa-user-edit"></i>
        </span>
            </router-link>
          </td>
        </tr>

      </table>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";
import {AthleteInterface} from "@/store/modules/athletes";
import {UserInterface} from "@/store/modules/user";

export default class Athletes extends Vue {
  private athletes = [<AthleteInterface>{}];
  private myAthletes = [<AthleteInterface>{}];
  private user = <UserInterface>{};
  private msg = '';

  mounted() {
    this.$store.dispatch('athlete_getAll')
        .then((res: any) => {
          this.athletes = res.data;
          this.user = this.$store.getters.user_current
          for (const athlete of this.athletes) {
            if (athlete._trainer === this.user._id)
              this.myAthletes.push(athlete);
          }
        })
        .catch((err: any) => this.msg = err.response.data.errors.message || err.message || 'Something went wrong!');
  }

  private athlete_save(athlete: AthleteInterface) {
    this.$store.dispatch('athlete_saveLocal', athlete);
  }

  private athlete_delete(athlete: AthleteInterface, index: number) {
    athlete._trainer = undefined;
    this.$store.dispatch('athlete_update', athlete)
        .then(() => this.myAthletes.splice(index, 1));
  }

}
</script>

<style scoped>

</style>