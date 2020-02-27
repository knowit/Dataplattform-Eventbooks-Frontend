<template>
  <div class="eventboks-container">
    <!-- <img id="logo" src="../assets/app-logo.svg" /> -->
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class EventboksView extends Vue {
}
</script>

<style scoped>

.eventboks-container {
  display: inline-block;
}

#logo {
  position: relative;
  bottom: 3em;
}

</style>
