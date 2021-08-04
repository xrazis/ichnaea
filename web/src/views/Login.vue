<template>
  <section class="hero is-medium">
    <div class="hero-body">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h1 class="is-size-1">Login</h1>
          <form @submit.prevent="user_login">
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <label>
                  <input v-model="username" class="input" placeholder="Username" type="text">
                </label>
                <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <label>
                  <input v-model="password" class="input" placeholder="Password" type="password">
                </label>
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control">
                <button class="button is-info is-rounded is-medium" type="submit">
                  Login
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
          <span class="tag is-primary">Tip:</span> You can register
          <router-link to="/register">here</router-link>
          !
        </p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  data() {
    return {
      msg: '',
      username: '',
      password: '',
    }
  },
  mounted() {
    this.currentSession();
  },
  methods: {
    currentSession() {
      this.$store.dispatch('user_currentSession')
          .then((res: any) => this.$router.push({name: 'DashboardHome', params: {username: res.data.username}}))
          .catch(() => {
          });
    },
    user_login() {
      this.$store.dispatch('user_login', {username: this.username, password: this.password})
          .then(() => this.$router.push({name: 'DashboardHome', params: {username: this.username}}))
          .catch(() => {
            this.msg = this.$store.getters.user_err.response.data.errors.message || 'Something went wrong!'
          });
    }
  }
});
</script>
