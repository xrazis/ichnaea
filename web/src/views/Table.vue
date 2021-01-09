<template>
  <h1 class="title is-2">/athletes/{{ athlete.name }}/table</h1>

</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import {AthleteInterface} from "@/store/modules/athletes";

export default class Table extends Vue {
  private athlete = <AthleteInterface>{}

  mounted() {
    this.athlete = this.$store.getters.currentAthlete
  }
}
</script>

<style scoped>

</style>