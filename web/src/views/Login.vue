<template>
  <section class="hero is-medium">
    <div class="hero-body">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h1 class="is-size-1">Login</h1>
          <form @submit.prevent="login">
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
                <input v-model="password" class="input" placeholder="Password" type="password">
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p c lass="control">
                <button class="button is-info is-rounded is-medium" type="submit">
                  Login
                </button>
              </p>
            </div>
          </form>
          <div class="m-4" v-if="msg">
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
          <span class="tag is-primary">Tip:</span> You can also register here!
        </p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';

export default class Login extends Vue {
  private msg = '';
  private username = '';
  private password = '';

  mounted() {
    this.getCurrentUser();
  }

  private getCurrentUser() {
    this.$store.dispatch('getCurrentUser')
        .then(() => this.$router.push('/dashboard'))
        .catch((err: any) => {
          this.$router.push('/login')
        })
  }

  private login() {
    let user = {username: this.username, password: this.password}

    this.$store.dispatch('login', user)
        .then(() => this.$router.push('/dashboard'))
        .catch((err: any) => {
          this.msg = err.response.data.errors.message || err.message || 'Something went wrong!'
          this.$router.push('/login')
        })
  }
}
</script>
