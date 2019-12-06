<template>
  <button class="rating-button" :class="typeName" @click="click()"></button>
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

  private get typeName() {
    return RatingButtonType[this.type].toLocaleLowerCase();
  }

  @Emit('rating-click')
  private click() {
    return this.type;
  }
}
</script>

<style scoped>
.rating-button {
  font-size: 18pt;
  height: 9rem;
  width: 9rem;
  border-radius: 50%;
  border: none;
  margin: 1rem;
  cursor: pointer; 
}

.happy {
  background-color: #5FFF8E;
}

.neutral {
  background-color: #FFFB5F;
}

.sad {
  background-color: #FF615F;
}

@media only screen and (max-width: 580px) {
  .rating-button {
    height: 5rem;
    width: 5rem;
  }
}

</style>
