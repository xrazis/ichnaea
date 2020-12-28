<template>

</template>

<script lang="ts">
import {Vue} from 'vue-class-component';

export default class Dashboard extends Vue {
  mounted() {
    this.$store.dispatch('getUser')
        .then(() => this.$router.push('/dashboard'))
        .catch((err: Error) => {
          console.log(err)
          this.$router.push('/login')
        })
  }
}
</script>


<style scoped>

</style>