<template>
  <aside class="menu has-background-black">
    <div class="container mx-5 my-4">
      <p class="menu-label">
        General
      </p>
      <ul class="menu-list">
        <li>
          <router-link :class="{
            'has-background-white':
           $route.name==='DashboardHome' }"
                       :to="{ name: 'DashboardHome', params: { username: $route.params.username }}">
            <a>
          <span class=" icon-text
          ">
          <span class="icon">
               <i class="fas fa-digital-tachograph"/>
            </span>
          <span>&nbsp;Dashboard</span>
          </span>
            </a>
          </router-link>
        </li>
        <li>
          <router-link :class="{
            'has-background-white':
           $route.name==='Profile' }" :to="{ name: 'Profile', params: { username: $route.params.username }}">
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
          <router-link :class="{
            'has-background-white':
           $route.name==='Athletes' }"
                       :to="{ name: 'Athletes', params: { username: $route.params.username }}">
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
        Help
      </p>
      <ul id="help" class="menu-list">
        <li>
          <router-link :class="{
            'has-background-white':
           $route.name==='Guide' }" :to="{ name: 'Guide'}">
            <a>
          <span class="icon-text">
            <span class="icon">
               <i class="fas fa-question-circle"/>
            </span>
              <span>&nbsp;Guide</span>
          </span>
            </a>
          </router-link>
        </li>
        <li>
          <router-link :class="{
            'has-background-white':
           $route.name==='Ticket' }" :to="{ name: 'Ticket'}">
            <a>
          <span class="icon-text">
            <span class="icon">
               <i class="fas fa-hands-helping"/>
            </span>
              <span>&nbsp;Ticket</span>
          </span>
            </a>
          </router-link>
        </li>
        <li>
          <router-link :class="{
            'has-background-white':
           $route.name==='Docs' }" :to="{ name: 'Docs'}">
            <a href="" target="_blank">
          <span class="icon-text">
          <span class="icon mr-1">
                        <i class="fas fa-book"></i>
                    </span>
          <span>Docs</span>
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