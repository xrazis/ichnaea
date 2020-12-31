<template>
  <ShapeDividerTop/>
  <section class="hero is-medium is-default is-bold">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column">
            <figure class="image is-fullwidth">
              <img src="../assets/undraw_fitness_stats_sht6.svg">
            </figure>
          </div>
          <div class="column is-5 is-offset-1 landing-caption">
            <h1 class="title">
              Unleash your potential with <i>ichnaea</i>
            </h1>
            <p class="subtitle">Metrics and live monitoring for your athletes. <br> The future is IoT.</p>
            <router-link class="has-text-white" to="/login">
              <button class="button is-info is-rounded">
                Login
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="hero-foot">
      <footer class="footer">
        <div class="content has-text-centered">
          <p>Ichnaea is an IoT solution that collects and analyzes body position data from an athlete in real-time.</p>
          <p>Source code can be found on <a href="https://github.com/xrazis/ichnaea" target="_blank">github</a> and <a
              href="https://git.swarmlab.io:3000/xrazis/ichnaea" target="_blank">swarmlab</a>.</p>
          <p>The thesis document can be found on <a href="" target="_blank">google docs</a>.</p>
        </div>
      </footer>
    </div>
  </section>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import ShapeDividerTop from '@/components/ShapeDividerTop.vue';

@Options({
  components: {
    ShapeDividerTop
  }
})

export default class Home extends Vue {
  mounted() {
    this.getCurrentUser();
  }

  private getCurrentUser() {
    this.$store.dispatch('getCurrentUser')
        .then(() => this.$router.push('/dashboard'))
        .catch((err: any) => {
          this.$router.push('/')
        })
  }
}
</script>
