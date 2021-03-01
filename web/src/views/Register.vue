<template>
  <section class="hero is-medium">
    <div class="hero-body">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h1 class="is-size-1">Register</h1>
          <form @submit.prevent="user_register">
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input v-model="username" class="input" placeholder="Username" type="text">
                <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input v-model="email" class="input" placeholder="Email" type="password">
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input v-model="password" class="input" placeholder="Password" type="password">
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input v-model="passwordRepeat" class="input" placeholder="Password Repeat" type="password">
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control">
                <button class="button is-primary is-rounded is-medium" type="submit">
                  Register
                </button>
              </p>
            </div>
          </form>
          <div v-if="msg" class="m-4">
            <div class="notification is-danger has-text-centered">
              <b>{{ msg }}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-foot">
      <div class="content has-text-centered">
        <p>
          <span class="tag is-info">Tip:</span> You can login
          <router-link to="/login">here</router-link>
          !
        </p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';

export default class Register extends Vue {
  private msg = '';
  private username = '';
  private email = '';
  private password = '';
  private passwordRepeat = '';

  mounted() {
    this.currentSession();
  }

  private currentSession() {
    this.$store.dispatch('user_currentSession')
        .then((res: any) => this.$router.push({name: 'DashboardHome', params: {username: res.data.username}}))
        .catch(() => {
        });
  }

  private user_register() {
    if (this.password === this.passwordRepeat) {
      this.$store.dispatch('user_register', {username: this.username, email: this.email, password: this.password})
          .then(() => this.$router.push({name: 'DashboardHome', params: {username: this.username}}))
          .catch(() => {
            this.msg = this.$store.getters.user_err.response.data.errors.message || 'Something went wrong!'
          });
    } else {
      this.msg = 'Passwords do not match!'
    }
  }
}
</script>
