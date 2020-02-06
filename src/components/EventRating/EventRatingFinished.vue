<template>
  <!-- <p id="txt">Takk for ditt innspill til forbedring av Knowit</p> -->
  <div id="container">
    <div class="txt">
      Din {{ratingText}} stemme er nå sendt
    </div>
    <img class="icon" src="@/assets/success.svg" />
  </div>

</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator';
import { RatingButtonType } from '@/components/EventRating/EventRatingButtons.vue';

@Component({})
export default class EventRatingFinished extends Vue {

  @Prop()
  private rating!: RatingButtonType;

  private get ratingText() {
    switch (this.rating) {
      case RatingButtonType.SAD:
        return 'negative';
      case RatingButtonType.NEUTRAL:
        return 'nøytrale';
      case RatingButtonType.HAPPY:
        return 'positive';
      default:
        return 'ERROR';
    }
  }

}

</script>

<style scoped>
.txt {
  font: 400 48px 'Roboto', sans-serif;
  width: 70%;
}

.icon {
  width: 30%;
}

#container {
  display: flex;
  align-items: center;
  max-width: 30rem;
}

</style>
