<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <hello-world msg="Welcome to Your Vue.js App" />
    {{ asdSync }}
    <button @click="clickMe">Click ME</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, PropSync, Watch } from 'vue-property-decorator';

import HelloWorld from '@/components/HelloWorld.vue';

@Component({
  components: {
    HelloWorld
  }
})
export default class HomeView extends Vue {
  @PropSync('ss')
  private asdSync!: string;

  constructor() {
    super();

    this.clickMe.bind(this);
  }

  private clickMe() {
    this.asdSync = 'kj';
    console.log(this.asdSync);
  }

  // @Watch("asdSync")
  // private watchAsd() {
  //   console.log(this.asdSync);
  // }
}
</script>
