<template>
  <section class="hero is-primary is-bold">
    <div class="hero-body">
      <div class="container">
        <h3 class="is-size-3">
          <span class="icon">
            <i class="fas fa-stream"></i>
          </span>
          <span>&nbsp&nbspWelcome {{ username }},</span>
        </h3>
        <h2 class="subtitle mt-3">

        </h2>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';

export default class Hero extends Vue {
  private username = '';

  mounted() {
    this.username = this.$store.getters.user.username
  }
}
</script>