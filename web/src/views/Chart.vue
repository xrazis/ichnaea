<template>
  <h1 class="title is-2">/athletes/{{ athlete.name }}/chart</h1>

</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import {AthleteInterface} from "@/store/modules/athletes";

export default class Chart extends Vue {
  private athlete = <AthleteInterface>{}

  mounted() {
    this.athlete = this.$store.getters.athlete_current
  }
}
</script>

<style scoped>

</style>