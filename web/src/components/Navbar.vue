<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/" >
        <img src="../assets/undraw_server_q2pb.svg" width="60" height="150" />
        <h3 class="is-size-4">Ichnaea</h3>
      </a>

      <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-end">
        <a class="navbar-item" href="https://github.com/xrazis/ichnaea" target="_blank">
          Documentation
        </a>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import {Vue} from "vue-class-component";

export default class Navbar extends Vue {
}
</script>

<style scoped>

</style>