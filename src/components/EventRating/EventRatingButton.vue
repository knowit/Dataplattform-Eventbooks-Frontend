<template>
  <button :style="style" @click="click()"></button>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

export enum RatingButtonType {
  HAPPY = 1,
  NEUTRAL = 0,
  SAD = -1
}

@Component({})
export default class EventRatingButton extends Vue {
  @Prop()
  private type!: RatingButtonType;

  private get style() {
    switch(this.type) {
      case RatingButtonType.HAPPY:
        return 'background-color: #5FFF8E';
      case RatingButtonType.NEUTRAL:
        return 'background-color: #FFFB5F';
      default:
        return 'background-color: #FF615F';
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
