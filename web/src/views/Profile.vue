<template>
  <h1 class="title is-2">/profile</h1>
  <div v-if="msgError" class="notification is-danger has-text-centered mt-5">
    <b>{{ msgError }}</b>
  </div>
  <div v-else-if="msgSuccess" class="notification is-success has-text-centered mt-5">
    <b>{{ msgSuccess }}</b>
  </div>
  <form @submit.prevent="user_update">
    <div class="tile is-ancestor">
      <div class="tile is-4 is-vertical is-parent">
        <div class="tile is-child box">
          <p class="title">Personal Details</p>
          <div class="field">
            <label class="label">Username</label>
            <div class="control">
              <label>
                <input v-model="user.username" class="input" type="text">
              </label>
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
              <label>
                <input v-model="user.email" class="input" type="email">
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="tile is-vertical is-parent">
        <div class="tile is-child box">
          <p class="title">Change Password</p>
          <div class="field">
            <p class="control has-icons-left">
              <label>
                <input v-model="user.newPassword" class="input" placeholder="New Password" type="password">
              </label>
              <span class="icon is-small is-left"><i class="fas fa-lock"></i></span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <label>
                <input v-model="user.repeatNewPassword" class="input" placeholder="Confirm Password" type="password">
              </label>
              <span class="icon is-small is-left"><i class="fas fa-lock"></i></span>
            </p>
          </div>
        </div>

        <div class="tile is-child box">
          <p class="title">Save Details</p>
          <p class="subtitle">Enter your password to save!</p>
          <div class="field">
            <p class="control has-icons-left">
              <label>
                <input v-model="user.password" class="input" placeholder="Current Password" type="password">
              </label>
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
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {UserInterface} from "@/store/modules/user";

export default defineComponent({
  data() {
    return {
      user: <UserInterface>{},
      date: '',
      msgSuccess: '',
      msgError: '',
    }
  },
  mounted() {
    this.user = this.$store.getters.user_current;
    this.date = new Date(this.user.registered).toLocaleString();
  },
  methods: {
    user_update() {
      if (this.user.newPassword != this.user.repeatNewPassword) {
        this.msgError = 'Passwords do not match!';
        return;
      }

      this.$store.dispatch('user_update')
          .then(() => {
            this.msgError = '';
            this.msgSuccess = 'User updated!';
          })
          .catch(() => this.msgError = this.$store.getters.user_err.response.data.errors.message ||
              'Something went wrong!');
    }
  }
});

</script>
