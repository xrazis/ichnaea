<template>
  <Navbar/>
  <Sidebar/>
  <div class="content">
    <router-view></router-view>
    <Footer class="mt-5 has-background-white"/>
  </div>
</template>

<!--suppress JSUnusedGlobalSymbols -->
<script lang="ts">
import {defineComponent} from 'vue'
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import Footer from '@/components/Footer.vue'

export default defineComponent({
  components: {
    Navbar,
    Sidebar,
    Footer
  },
  data() {
    return {
      connected: false,
    }
  },
  mounted() {
    this.$socket.client.on('connect', this.changeConnStatus);
  },
  beforeUnmount() {
    this.$socket.client.off('connect', this.changeConnStatus);
  },
  methods: {
    changeConnStatus() {
      this.connected = !this.connected;
      const {_id} = this.$store.getters.user_current;

      this.$store.commit("socket_connection", this.connected);
      this.$socket.client.emit('subscribe', JSON.stringify({subscribe: 'dashboard', _id}));
    },
  }
});
</script>

<style scoped>
@media (min-width: 572px) {
  .content {
    position: relative;
    margin-top: 7rem;
    margin-left: 17rem;
    margin-right: 2rem;
  }
}
</style>