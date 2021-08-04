<template>
  <nav aria-label="main navigation" class="navbar is-fixed-top is-black" role="navigation">
    <div class="navbar-brand">
      <a class="sidebar-icon"
         onclick="document.querySelector('#aside').classList.toggle('expand-sidebar');">
              <span class="icon is-large has-text-white">
                 <i class="far fa-compass"/>
              </span>
      </a>

      <router-link class="logo" to="/">
        <a class="navbar-item">
          <img alt="data_trends" height="150" src="../assets/undraw_data_trends_b0wg.svg" width="60"/>
          <h3 class="is-size-4 has-text-white">Ichnaea</h3>
        </a>
      </router-link>

      <a aria-expanded="false"
         aria-label="menu"
         class="navbar-burger burger"
         data-target="nav-menu"
         onclick="document.querySelector('#nav-menu').classList.toggle('is-active');"
         role="button">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="nav-menu" class="navbar-menu has-background-black">
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
import {UserInterface} from "@/store/modules/user";
import {defineComponent} from "vue";

export default defineComponent({
  data() {
    return {
      user: <UserInterface>{},
    }
  },
  created() {
    this.user = this.$store.getters.user_current
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
          .then(() => this.$router.push('/'))
          .catch(() => this.$router.push('/'));
    }
  },
});
</script>

<style scoped>
.navbar {
  height: 5rem;
}

.sidebar-icon {
  display: none;
}

@media (max-width: 572px) {
  .navbar-menu {
    display: block;
    opacity: 0;
    position: absolute;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    transition: all .4s ease-in-out;
    pointer-events: none;
  }

  .navbar-menu.is-active {
    opacity: 1;
    transform: none;
    pointer-events: auto;
  }

  .sidebar-icon {
    display: block;
  }

  .logo {
    margin: auto;
  }

  .navbar-burger {
    transition: all ease-in-out 0.25s;
  }
}
</style>