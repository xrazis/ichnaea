<template>
  <div class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <figure class="image is-5by3">
          <img src="../assets/undraw_authentication_fsn5.svg">
        </figure>
        <h1 class="is-size-1">Login</h1>
        <form @submit.prevent="login">
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input v-model="username" class="input" placeholder="Username" type="text">
              <span class="icon is-small is-left">
      <i class="fas fa-user"></i>
    </span> <span class="icon is-small is-right">
      <i class="fas fa-check"></i></span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input v-model="password" class="input" placeholder="Password" type="password">
              <span class="icon is-small is-left">
      <i class="fas fa-lock"></i></span>
            </p>
          </div>
          <div class="field">
            <p class="control">
              <button class="button is-success" type="submit">
                Login
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
    <div class="hero-foot">
      <footer class="footer">
        <div class="content has-text-centered">
          <p>
            <span class="tag is-primary">Tip:</span> You can also register here!
          </p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';

export default class Login extends Vue {
  private username = '';
  private password = '';

  private login() {
    let user = {username: this.username, password: this.password}

    this.$store.dispatch('login', user)
        .then(() => this.$router.push('/dashboard'))
        .catch((err: Error) => {
          console.log(err)
          this.$router.push('/login')
        })
  }
}
</script>
