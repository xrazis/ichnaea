<template>
  <nav aria-label="main navigation" class="navbar is-fixed-top is-black" role="navigation">
    <div class="navbar-brand">
      <router-link to="/">
        <a class="navbar-item">
          <img height="150" src="../assets/undraw_data_trends_b0wg.svg" width="60"/>
          <h3 class="is-size-4 has-text-white">Ichnaea</h3>
        </a>
      </router-link>
      <a aria-expanded="false"
         aria-label="menu"
         class="navbar-burger burger"
         data-target="navbarBasicExample"
         role="button">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-end">
        <a class="navbar-item">
          <router-link :to="{ name: 'Profile', params: { username: $route.params.username }}">
            <div class="icon-text">
                    <span class="icon mr-1  has-text-white">
                        <i class="fa fa-user"></i>
                    </span>
              <span class="has-text-white">{{ user.username }}</span>
            </div>
          </router-link>
        </a>
        <a class="navbar-item has-text-danger mr-2" @click="logout">
                    <span class="icon mr-1">
                        <i class="fa fa-sign-out-alt"></i>
                    </span>
          <span>Logout</span>
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
    this.user = this.$store.getters.user_current
  }

  private logout() {
    this.$store.dispatch('logout')
        .then(() => this.$router.push('/'))
        .catch(() => this.$router.push('/'));
  }
}
</script>

<style scoped>
.navbar {
  height: 5vh;
}
</style>