<template>
  <nav class="navbar is-fixed-top is-black" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/">
        <a class="navbar-item">
          <img src="../assets/undraw_server_q2pb.svg" width="60" height="150"/>
          <h3 class="is-size-4 has-text-white">Ichnaea</h3>
        </a>
      </router-link>
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
        <a class="navbar-item">
          <router-link :to="{ name: 'Profile', params: { username: username }}">
                    <span class="icon mr-1 has-text-white">
                        <i class="fa fa-user"></i>
                    </span>
            <span class="has-text-white">{{ user.username }}</span>
          </router-link>
        </a>
        <a class="navbar-item has-text-danger mr-2" @click="logout">
                    <span class="icon mr-1">
                        <i class="fa fa-sign-out-alt"></i>
                    </span>
          <span>Logout</span>
        </a>
        <a class="navbar-item" href="https://github.com/xrazis/ichnaea" target="_blank">
          <span class="icon mr-1">
                        <i class="fas fa-book"></i>
                    </span>
          Documentation
        </a>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import {Vue} from "vue-class-component";
import {UserInterface} from "@/store/modules/user";

export default class Navbar extends Vue {
  private user = <UserInterface>{};

  created() {
    this.user = this.$store.getters.currentUser
  }

  private logout() {
    this.$store.dispatch('logout')
        .then(() => this.$router.push('/'))
        .catch((err: any) => {
          console.log(err)
          this.$router.push('/')
        })
  }
}
</script>

<style scoped>
.navbar {
  height: 5vh;
}
</style>