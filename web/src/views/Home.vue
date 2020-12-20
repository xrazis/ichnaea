<template>
  <section class="hero is-light is-fullheight">
    <div class="hero-body">
      <div class="container">
        <figure class="image is-5by3">
          <img src="../assets/undraw_fitness_stats_sht6.svg">
        </figure>
        <h1 class="title">
          Unleash your potential with ichnaea.
        </h1>
        <p class="subtitle">Metrics and live monitoring for your athletes. The future is IoT.</p>
        <button class="button is-link is-rounded">
          <router-link class="has-text-white" to="/login">Login</router-link>
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';

export default class Home extends Vue {
}
</script>
