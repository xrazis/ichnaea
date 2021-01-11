<template>
  <h1 class="title is-2">/athletes/{{ athlete.name }}</h1>
  <div class="tile mb-5">
    <article class="tile is-child box">
      <nav class="level">
        <div class="level-left">
          <div class="level-item ">
            <div class="title">Actions</div>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item has-text-centered">
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
          </div>
        </div>
      </nav>
    </article>
  </div>
  <div class="tile is-ancestor">
    <div class="tile is-6 is-vertical is-parent">
      <form @submit="update">
        <div class="tile is-child box">
          <p class="title">Personal Details</p>
          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input v-model="athlete.name" class="input" type="text">
            </div>
          </div>
          <div class="field">
            <label class="label">Client Status</label>
            <p v-if="athlete.socketID">Online</p>
            <p v-else>Offline</p>
          </div>
          <div v-if="msgError" class="notification is-danger has-text-centered mt-5">
            <b>{{ msgError }}</b>
          </div>
          <div v-else-if="msgSuccess" class="notification is-success has-text-centered mt-5">
            <b>{{ msgSuccess }}</b>
          </div>
          <div v-else class="notification is-info is-light mt-5">
            <ul>
              <li>Client name is randomly generated on device connection. Change to athlete's name, so to be easily
                identified.
              </li>
              <li>The ID is the mac of the client. It is persistent in the database and cannot change.</li>
              <li>If the client has established a socket connection with the server he is considered online. In any
                other case he is considered offline.
              </li>
            </ul>
          </div>
          <div class="field">
            <p class="control">
              <button class="button is-primary is-rounded" type="submit">
                Update
              </button>
            </p>
          </div>
        </div>
      </form>
    </div>
    <div class="tile is-parent">
      <div class="tile is-child box">
        <p class="title">Trainer Status</p>
        <div v-if="!athlete._trainer">
          <div class="notification is-primary is-light mt-5">
            <ul>
              <p>It seems that this athlete has no trainer attached to him!</p>
              <p>By adopting an athlete you can edit his personal details and view his performance stats.</p>
              <p>Enter the client id displayed in the clients terminal to adopt him!</p>
            </ul>
          </div>
          <div class="field">
            <label class="label">Athlete ID</label>
            <div class="control">
              <input v-model="clientID" class="input" type="text">
            </div>
          </div>
          <div class="field">
            <p class="control">
              <button class="button is-medium is-rounded is-primary" @click="update('adopt')">Adopt</button>
            </p>
          </div>
        </div>
        <div v-else>
          <div class="field">
            <label class="label">Username</label>
            <p>{{ trainer.username }}</p>
          </div>
          <div class="field">
            <label class="label">Email</label>
            <p v-if="trainer.email">{{ trainer.email }}</p>
            <p v-else>-</p>
          </div>
          <div class="field">
            <label class="label">Last login</label>
            <p>{{ trainerLogin }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";
import {AthleteInterface} from "@/store/modules/athletes";
import {UserInterface} from "@/store/modules/user";

export default class Athlete extends Vue {
  private athlete = <AthleteInterface>{}
  private trainer = <UserInterface>{}
  private trainerLogin = '';
  private msgError = ''
  private msgSuccess = ''
  private clientID = ''

  mounted() {
    this.athlete = this.$store.getters.currentAthlete

    if (this.athlete._trainer && (this.athlete._trainer != this.$store.getters.currentUser._id)) {
      this.$store.dispatch('specificUser', this.athlete._trainer)
          .then((res: any) => this.trainer === res.data)
          .catch((err: any) => this.msgError = err.response.data.errors.message || err.message || 'Something went wrong!')
    } else if (this.athlete._trainer === this.$store.getters.currentUser._id) {
      this.trainer = this.$store.getters.currentUser
    }

    if (this.trainer) {
      this.trainerLogin = new Date(this.trainer.lastLogin).toLocaleString()
      this.$store.dispatch('saveTrainer', this.trainer)
    }
  }

  private update(action: string) {
    if (action === 'adopt' && this.clientID === '') {
      this.msgError = 'Please give a valid athlete ID!';
      return;
    }

    if (this.clientID != '' && this.clientID != this.athlete.id) {
      this.msgError = 'Athlete ID does not match with current athlete!';
      return;
    }

    const user = {_trainer: this.$store.getters.currentUser._id}
    Object.assign(this.athlete, user)

    this.$store.dispatch('updateAthlete', this.athlete)
        .then((res: any) => {
          this.msgSuccess = 'Athlete updated'
          this.athlete = res.data;
        })
        .catch(() => this.msgError = this.$store.getters.getErrAthlete.response.data.errors.message ||
            'Something went wrong!')
  }
}
</script>

<style scoped>

</style>