<template>
  <aside class="menu has-background-black">
    <div class="container mx-5 my-4">
      <p class="menu-label">
        General
      </p>
      <ul class="menu-list">
        <li>
          <router-link :to="{ name: 'DashboardHome', params: { username: $route.params.username }}">
            <a>
          <span class="icon-text">
            <span class="icon">
               <i class="fas fa-digital-tachograph"/>
            </span>
              <span>&nbsp;Dashboard</span>
          </span>
            </a>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Profile', params: { username: $route.params.username }}">
            <a>
          <span class="icon-text">
            <span class="icon">
               <i class="fas fa-user"/>
            </span>
              <span>&nbsp;Profile</span>
          </span>
            </a>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Athletes', params: { username: $route.params.username }}">
            <a>
          <span class="icon-text">
            <span class="icon">
               <i class="fas fa-users"/>
            </span>
              <span>&nbsp;Athletes</span>
          </span>
            </a>
          </router-link>
        </li>
      </ul>
      <p class="menu-label">
        Athlete Data
      </p>
      <ul class="menu-list">
        <li>
          <router-link :to="{ name: 'Profile', params: { username: $route.params.username }}">
            <a>
          <span class="icon-text">
            <span class="icon">
               <i class="fas fa-table"/>
            </span>
              <span>&nbsp;Tables</span>
          </span>
            </a>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Profile', params: { username:  $route.params.username }}">
            <a>
          <span class="icon-text">
            <span class="icon">
               <i class="fas fa-chart-area"/>
            </span>
              <span>&nbsp;Charts</span>
          </span>
            </a>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';

export default class Sidebar extends Vue {

}
</script>

<style scoped>

@media (max-width: 572px) {
  aside {
    position: relative;
    top: 5vh;
    min-width: 100%;
  }
}

@media (min-width: 572px) {
  aside {
    position: fixed;
    height: 95vh;
    width: 15rem;
    top: 5vh;
  }
}
</style>