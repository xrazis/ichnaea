<template>
  <h1 class="title is-2">/athletes/{{ athlete.name }}/chart</h1>

</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {AthleteInterface} from "@/store/modules/athletes";

export default defineComponent({
  data() {
    return {
      athlete: <AthleteInterface>{},
    }
  },
  mounted() {
    this.$store.dispatch('athlete_getOne', this.$route.params.id)
        .then((res: any) => this.athlete = res.data);
  }
});
</script>