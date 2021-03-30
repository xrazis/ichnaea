<template>
  <aside id="aside" class="menu has-background-black">
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
          <span class="label-text">&nbsp;Dashboard</span>
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
              <span class="label-text">&nbsp;Profile</span>
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
              <span class="label-text">&nbsp;Athletes</span>
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
              <span class="label-text">&nbsp;Guide</span>
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
              <span class="label-text">&nbsp;Ticket</span>
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
          <span class="label-text">Docs</span>
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
aside {
  position: fixed;
  top: 5vh;
  left: 0;
  width: 250px;
  height: calc(100% - 5vh);
  overflow-x: hidden;
  z-index: 1031;
}

@media (max-width: 572px) {
  aside {
    display: block;
    opacity: 0;
    left: 0;
    top: 5vh;
    width: 0;
    height: calc(100% - 5vh);
    overflow-x: hidden;
    z-index: 1031;
    transition: all .4s ease-in-out;
  }

  .expand-sidebar {
    opacity: 1;
    transition: all .4s ease-in-out;
    transform: none;
    width: 250px;
  }
}
</style>