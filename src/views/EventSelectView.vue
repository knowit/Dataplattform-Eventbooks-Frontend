<template>
  <div>
    <img id="logo" src="@/assets/app-logo.svg" />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class EventSelectView extends Vue {

}
</script>
