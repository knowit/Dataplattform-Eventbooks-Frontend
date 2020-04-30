<template>
  <div class="rating-btn-container">
    <button v-for="n in [1, 0, -1]" :key="n" class="rating-button" :class="typeName(n)" @click="click(n)"></button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

export enum RatingButtonType {
  HAPPY = 1,
  NEUTRAL = 0,
  SAD = -1
}

@Component({})
export default class EventRatingButtons extends Vue {

  private typeName(n: number) {
    return RatingButtonType[n].toLocaleLowerCase();
  }

  @Emit('rating-click')
  private click(n: number): RatingButtonType {
    return n;
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

.rating-btn-container {
  display: flex;
  justify-content: center;
  flex-direction: row;
}

.happy {
  background-color: #5fff8e;
}

.neutral {
  background-color: #fffb5f;
}

.sad {
  background-color: #ff615f;
}

@media only screen and (max-width: 580px) {
  .rating-button {
    height: 5rem;
    width: 5rem;
  }
}
</style>
