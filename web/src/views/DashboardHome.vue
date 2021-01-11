<template>
  <h1 class="title is-2">/home</h1>
  <div class="tile mb-5">
    <article class="tile is-child box">
      <nav class="level">
        <div class="level-left">
          <div class="level-item ">
            <span class="icon is-large">
               <i class="fa fa-3x fa-user-circle"/>
            </span>
            <p class="is-size-4 is-bold">&nbspWhats up, {{ user.username }}</p>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item has-text-centered">
            <p class="is-size-6 is-bold">Last login on {{ date }}</p>
          </div>
        </div>
      </nav>
    </article>
  </div>
  <div class="tile is-ancestor">
    <div class="tile is-vertical is-8">
      <div class="tile">
        <div class="tile is-parent is-vertical">
          <article class="tile is-child box">
            <p class="title">System status</p>
            <p class="subtitle">All systems operational</p>
          </article>
          <article class="tile is-child box">
            <p class="title">...tiles</p>
            <p class="subtitle">Bottom tile</p>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child box">
            <figure class="image is-4by3">
              <img src="../assets/undraw_finish_line_katerina_limpitsouni_xy20.svg">
            </figure>
          </article>
        </div>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">Wide tile</p>
          <p class="subtitle">Aligned with the right tile</p>
          <div class="content">
            <!-- Content -->
          </div>
        </article>
      </div>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child box">
        <div class="content">
          <p class="title">Tall tile</p>
          <p class="subtitle">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda aut culpa, deserunt
            distinctio illo ipsa itaque laborum magnam minima minus molestiae nisi odio provident quas repellendus,
            similique velit veniam voluptatem?</p>
          <p class="subtitle">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda aut culpa, deserunt
            distinctio illo ipsa itaque laborum magnam minima minus molestiae nisi odio provident quas repellendus,
            similique velit veniam voluptatem?</p>
          <p class="subtitle">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda aut culpa, deserunt
            distinctio illo ipsa itaque laborum magnam minima minus molestiae nisi odio provident quas repellendus,
            similique velit veniam voluptatem?</p>
          <div class="content">
            <!-- Content -->
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import {UserInterface} from "@/store/modules/user";

export default class DashboardHome extends Vue {
  private user = <UserInterface>{};
  private date: string = '';

  created() {
    this.user = this.$store.getters.currentUser
    this.date = new Date(this.user.lastLogin).toLocaleString()
  }

}
</script>