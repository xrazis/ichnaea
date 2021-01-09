<template>
  <h1 class="title is-2">/home</h1>
  <div class="tile">
    <article class="tile is-child notification has-background-primary-dark has-text-white">
      <nav class="level">
        <div class="level-left">
          <div class="level-item ">
            <span class="icon is-large">
               <i class="fa fa-3x fa-user-circle"/>
            </span>
            <p class="is-size-4 is-bold">&nbspWhats up, {{ user.username }}</p>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item has-text-centered">
            <p class="is-size-6 is-bold">Last login on {{ date }}</p>
          </div>
        </div>
      </nav>
      <nav class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Your Athletes</p>
            <p class="title">3,456</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Live Athletes</p>
            <p class="title">123</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Server</p>
            <p class="title" v-if="this.$store.getters.currentStatus">Connected</p>
            <p class="title" v-else>Disconnected</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Likes</p>
            <p class="title">789</p>
          </div>
        </div>
      </nav>
    </article>
  </div>
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import {UserInterface} from "@/store/modules/user";

export default class DashboardHome extends Vue {
  private user = <UserInterface>{};
  private date: string = '';

  created() {
    this.user = this.$store.getters.currentUser
    this.date = new Date(this.user.lastLogin).toLocaleString()
  }

}
</script>