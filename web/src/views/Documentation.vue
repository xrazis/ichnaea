<template>
  <div class="notification is-link is-light">
    This is the latest README.md file from the github repo!
  </div>
  <div class="box" v-html="readme"></div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  data() {
    return {
      readme: '',
    }
  },
  mounted() {
    this.$store.dispatch('readme')
        .then((res: any) => {
          this.readme = this.parseMarkdown(res.data);
        })
        .catch(() => this.readme = 'Something went wrong!');
  },
  methods: {
    parseMarkdown(markdownText: String) {
      return markdownText
          .replace(/^##### (.*$)/gim, '<h5>$1</h5>')
          .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
          .replace(/^### (.*$)/gim, '<h3>$1</h3>')
          .replace(/^## (.*$)/gim, '<h2>$1</h2>')
          .replace(/^# (.*$)/gim, '<h1>$1</h1>')
          .replace(/^- (.*$)/gim, '<li>$1</li>')
          .replace(/`(.*?)`/g, '<code>$1</code>')
          .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
          .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
          .replace(/_(.*)_/gim, '<em>$1</em>')
          .replace(/\*(.*)\*/gim, '<i>$1</i>')
          .replace(/!\[(.*?)]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
          .replace(/\[(.*?)]\((.*?)\)/gim, "<a href='$2'>$1</a>")
          .replace(/\n$/gim, '<br />').trim();
    }
  },
});
</script>

<style scoped>

</style>
