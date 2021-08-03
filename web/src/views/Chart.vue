<template>
  <h1 class="title is-2">/athletes/{{ athlete.name }}/chart</h1>

</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import {AthleteInterface} from "@/store/modules/athletes";

export default class Chart extends Vue {
  private athlete = <AthleteInterface>{}

  mounted() {
    this.$store.dispatch('athlete_getOne', this.$route.params.id)
        .then((res: any) => this.athlete = res.data);
  }
}
</script>

<style scoped>

</style>