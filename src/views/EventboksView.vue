<template>
  <div>
    <img src="../assets/app-logo.svg" />
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
#input {
  margin-top: 22px;
}
#input-field:focus {
  outline: 0;
}
#ok-button:focus {
  outline: 0;
}
#ok-button {
  width: 91%;
  padding: 11px 13px;
  background: #949494 0% 0% no-repeat padding-box;
  border: none;
  border-radius: 2px;
  opacity: 1;
  text-align: center;
  font: Regular 12px/14px Roboto;
  letter-spacing: 0;
  color: #ffffff;
  margin-top: 10px;
}
.active {
  background-color: #4573e3 !important;
}
</style>
