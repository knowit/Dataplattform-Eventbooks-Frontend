<template>
  <div id="app">
    <img id="logo" src="@/assets/app-logo.svg" />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class App extends Vue {
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #232323;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f1f0ed;
}

:root {
  --btn-blue: #4573e3;
}

html {
  box-sizing: border-box;
}

*, *::before, *::after {
  box-sizing: inherit;
}

body {
  padding: 0;
  margin: 0;
  color: #232323;
}

.btn {
  padding: 11px 13px;
  font: normal normal 12px/14px "Roboto";
  border: none;
  border-radius: 2px;
  opacity: 1;
  text-align: center;
  letter-spacing: 0;
  cursor: pointer;
}

@media only screen and (max-width: 580px) {
  #app {
    padding: 0 1em;
  }
}

</style>
