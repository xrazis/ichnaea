<template>
  <h1 class="title is-2">/profile</h1>
  <form @submit="update">
    <div class="tile is-ancestor">
      <div class="tile is-4 is-vertical is-parent">
        <div class="tile is-child box">
          <p class="title">Personal Details</p>
          <div class="field">
            <label class="label">Username</label>
            <div class="control">
              <input v-model="user.username" class="input" type="text">
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
              <input v-model="user.email" class="input" type="email">
            </div>
          </div>
        </div>
      </div>
      <div class="tile is-parent">
        <div class="tile is-child box">
          <p class="title">Change Password</p>
          <div class="field">
            <p class="control has-icons-left">
              <input v-model="user.currentPassword" class="input" placeholder="Current Password" type="password">
              <span class="icon is-small is-left"><i class="fas fa-lock"></i></span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input v-model="user.newPassword" class="input" placeholder="New Password" type="password">
              <span class="icon is-small is-left"><i class="fas fa-lock"></i></span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input v-model="user.repeatNewPassword" class="input" placeholder="Confirm Password" type="password">
              <span class="icon is-small is-left"><i class="fas fa-lock"></i></span>
            </p>
          </div>
          <div class="field">
            <p class="control">
              <button class="button is-primary is-rounded" type="submit">
                Update
              </button>
            </p>
          </div>
          <div v-if="msgError" class="notification is-danger has-text-centered mt-5">
            <b>{{ msgError }}</b>
          </div>
          <div v-else-if="msgSuccess" class="notification is-success has-text-centered mt-5">
            <b>{{ msgSuccess }}</b>
          </div>
          <div v-else class="notification is-primary is-light mt-5">
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
import {UserInterface} from "@/store/modules/user";

interface UpdatedUser extends UserInterface {
  newPassword: string,
  repeatNewPassword: string,
}

export default class Profile extends Vue {
  private user = <UpdatedUser>{};
  private date = '';
  private msgSuccess = '';
  private msgError = '';

  created() {
    this.user = this.$store.getters.currentUser
    this.date = new Date(this.user.registered).toLocaleString()
  }

  private update() {
    if (this.user.newPassword != this.user.repeatNewPassword) {
      this.msgError = 'Passwords do not match!'
      return
    }

    let user = {
      _id: this.user._id,
      username: this.user.username,
      email: this.user.email,
      password: this.user.password,
      newPassword: this.user.newPassword,
      repeatNewPassword: this.user.repeatNewPassword
    }

    this.$store.dispatch('updateUser', user)
        .then(() => this.msgSuccess = 'User updated!')
        .catch(() => this.msgError = this.$store.getters.getErrUser.response.data.errors.message ||
            'Something went wrong!')
  }
}

</script>

<style scoped>

</style>