<template>
  <div>
    <img src="../assets/app-logo.svg" />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class AdminView extends Vue {
}
</script>

<style scoped>

</style>
