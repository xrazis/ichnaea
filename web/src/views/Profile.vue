<template>
  <h1 class="title is-2">/profile</h1>
  <form @submit.prevent="user_update">
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
              <input v-model="currentPassword" class="input" placeholder="Current Password" type="password">
              <span class="icon is-small is-left"><i class="fas fa-lock"></i></span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input v-model="newPassword" class="input" placeholder="New Password" type="password">
              <span class="icon is-small is-left"><i class="fas fa-lock"></i></span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input v-model="repeatNewPassword" class="input" placeholder="Confirm Password" type="password">
              <span class="icon is-small is-left"><i class="fas fa-lock"></i></span>
            </p>
          </div>
          <div class="field">
            <p class="control">
              <button class="button is-primary is-rounded">
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
              <li>Doesn't Rely on Obvious Substitutions</li>
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
  private currentPassword = '';
  private newPassword = '';
  private repeatNewPassword = '';
  private msgSuccess = '';
  private msgError = '';

  mounted() {
    this.user = this.$store.getters.user_current;
    this.date = new Date(this.user.registered).toLocaleString();
  }

  private user_update() {
    if (this.newPassword != this.repeatNewPassword) {
      this.msgError = 'Passwords do not match!';
      return;
    }

    Object.assign(this.user, {password: this.currentPassword, newPassword: this.newPassword});

    this.$store.dispatch('user_update', this.user)
        .then(() => this.msgSuccess = 'User updated!')
        .catch(() => this.msgError = this.$store.getters.user_err.response.data.errors.message ||
            'Something went wrong!');
  }
}

</script>

<style scoped>

</style>