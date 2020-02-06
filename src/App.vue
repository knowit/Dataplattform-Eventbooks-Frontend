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
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  background-color: #f1f0ed;
}
:root {
  --btn-blue: #4573e3;
}

body {
  padding: 0;
  margin: 0;
}

@media only screen and (max-width: 580px) {
  #app {
    height: 100%;
    margin-right: 1rem;
    margin-left: 1rem;
  }
}
</style>
