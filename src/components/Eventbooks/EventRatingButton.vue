<template>
  <button :style="style" @click="click()">{{ btnText }}</button>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

export enum RatinButtonType {
  HAPPY,
  NEUTRAL,
  SAD
}

@Component({})
export default class EventRatingButton extends Vue {
  @Prop()
  private type!: RatinButtonType;

  private get style() {
    switch(this.type) {
      case RatinButtonType.HAPPY:
        return 'background-color: #5FFF8E';
      case RatinButtonType.NEUTRAL:
        return 'background-color: #FFFB5F';
      default:
        return 'background-color: #FF615F';
    }
  }

  private get btnText() {
    switch(this.type) {
      case RatinButtonType.HAPPY:
        return ':)';
      case RatinButtonType.NEUTRAL:
        return ':|';
      default:
        return ':(';
    }
  }

  @Emit('rating-click')
  private click() {
    return this.type;
  }
}
</script>

<style scoped>
button {
  font-size: 18pt;
  height: 9em;
  width: 9em;
  /* padding: 48px; */
  border-radius: 50%;
  border: none;
  margin: 1em;
  cursor: pointer; 
}
</style>
