<template>
  <h1 class="title is-2">Athletes/{{ athlete.name }}</h1>
  <div class="tile is-ancestor">
    <div class="tile is-6 is-vertical is-parent">
      <form @submit="update">
        <div class="tile is-child box">
          <p class="title">Personal Details</p>
          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input class="input" type="text" v-model="athlete.name">
            </div>
          </div>
          <div class="field">
            <label class="label">ID</label>
            <p>{{ athlete.id }}</p>
          </div>
          <div class="field">
            <label class="label">Client Status</label>
            <p v-if="athlete.socketID">Online</p>
            <p v-else>Offline</p>
          </div>
          <div class="notification is-danger has-text-centered mt-5" v-if="msgError">
            <b>{{ msgError }}</b>
          </div>
          <div class="notification is-success has-text-centered mt-5" v-else-if="msgSuccess">
            <b>{{ msgSuccess }}</b>
          </div>
          <div class="notification is-info is-light mt-5" v-else>
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
        <div class="notification is-warning is-light mt-5" v-if="!athlete._trainer">
          <ul>
            <p>It seems that this athlete has no trainer attached to him!</p>
            <p>By adopting an athlete you can edit his personal details and view his performance stats.</p>
          </ul>
          <button class="button is-large is-rounded is-primary is-light" @click="update">update</button>
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

  private update() {
    const user = {_trainer: this.$store.getters.currentUser._id}
    Object.assign(this.athlete, user)
    this.$store.dispatch('updateAthlete', this.athlete)
        .then((res: any) => {
          console.log('updated')
          this.msgSuccess = 'Athlete updated'
          this.athlete = res.data;
        })
        .catch((err: any) => this.msgError = err.response.data.errors.message || err.message || 'Something went wrong!')
  }
}
</script>

<style scoped>

</style>