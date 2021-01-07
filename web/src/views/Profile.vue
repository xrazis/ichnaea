<template>
  <h1 class="title is-2">Profile</h1>
  <form @submit.prevent="update">
    <div class="tile is-ancestor">
      <div class="tile is-4 is-vertical is-parent">
        <div class="tile is-child box">
          <p class="title">Personal Details</p>
          <div class="field">
            <label class="label">Username</label>
            <div class="control">
              <input class="input" type="text" :value="user.username">
            </div>
          </div>
          <div class="field">
            <label class="label">Registered on</label>
            <p>{{ date }}</p>
          </div>
        </div>
        <div class="tile is-child box">
          <p class="title">Contact Details</p>
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input class="input" type="email" :value="user.email">
            </div>
          </div>
        </div>
      </div>
      <div class="tile is-parent">
        <div class="tile is-child box">
          <p class="title">Change Password</p>
          <div class="field">
            <p class="control has-icons-left">
              <input class="input" type="password" placeholder="Current Password" v-model="currentPassword">
              <span class="icon is-small is-left">
      <i class="fas fa-lock"></i>
    </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input class="input" type="password" placeholder="New Password" v-model="newPassword">
              <span class="icon is-small is-left">
      <i class="fas fa-lock"></i>
    </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input class="input" type="password" placeholder="Confirm Password" v-model="repeatNewPassword">
              <span class="icon is-small is-left">
      <i class="fas fa-lock"></i>
    </span>
            </p>
          </div>
          <div class="field">
            <p class="control">
              <button class="button is-primary" type="submit">
                Update
              </button>
            </p>
          </div>
          <div class="notification is-danger has-text-centered mt-5" v-if="msg">
            <b>{{ msg }}</b>
          </div>
          <div class="notification is-primary is-light mt-5" v-else>
            <p>According to the traditional advice—which is still good—a strong password:</p>
            <ul>
              <li>Has 12 Characters, Minimum</li>
              <li>Includes Numbers, Symbols, Capital Letters, and Lower-Case Letters</li>
              <li>Isn’t a Dictionary Word or Combination of Dictionary Words</li>
              <li>Doesn’t Rely on Obvious Substitutions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";

interface User {
  username: string,
  registered: string
}

export default class Profile extends Vue {
  private msg = '';
  private user!: User;
  private date!: string;

  private username = ''
  private email = ''
  private currentPassword = ''
  private newPassword = ''
  private repeatNewPassword = ''

  created() {
    this.user = this.$store.getters.user
    this.date = new Date(this.user.registered).toLocaleString()
  }

  private update() {
    let user = {
      username: this.username,
      email: this.email,
      password: this.currentPassword,
      newPassword: this.newPassword,
      repeatNewPassword: this.repeatNewPassword
    }

    this.$store.dispatch('updateUser', user)
        .then(() => this.$router.push({name: 'Profile', params: {username: this.username}}))
        .catch((err: any) => this.msg = err.response.data.errors.message || err.message || 'Something went wrong!')
  }
}

</script>

<style scoped>

</style>