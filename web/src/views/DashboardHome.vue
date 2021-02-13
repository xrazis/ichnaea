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
            <p v-if="this.$store.getters.server_status" class="subtitle"><i class="fas fa-check-circle"></i> All
              systems operational</p>
            <p v-else class="subtitle"><i class="fas fa-times-circle"></i> Something does not seem right</p>
          </article>
          <article class="tile is-child box">
            <p class="title">App Info</p>
            <p class="subtitle"><i class="fas fa-code-branch"></i> Dashboard version 1.0.0</p>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child box">
            <figure class="image">
              <img src="../assets/undraw_finish_line_katerina_limpitsouni_xy20.svg">
            </figure>
          </article>
        </div>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">Who was Ichnaea? </p>
          <p class="subtitle">
            In Greek mythology, Ichnaea, "the tracker" was an epithet that could be applied to
            Themis or to Nemesis. Ichnaea was also the goddess of tracing and tracking. She was one of the female Titans
            who possessed an oracle at Ichnae in Thessaly. This apps name derives from the latter.
          </p>
        </article>
      </div>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child box">
        <div class="content">
          <p class="title">Live Updates</p>
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
    this.user = this.$store.getters.user_current;
    this.date = new Date(this.user.lastLogin).toLocaleString();
  }

}
</script>