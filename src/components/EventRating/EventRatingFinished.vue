<template>
  <!-- <p id="txt">Takk for ditt innspill til forbedring av Knowit</p> -->
  <div>
    <div id="msg-container">
      <div class="txt">
        Din {{ratingText}} stemme er nå sendt
      </div>
      <img class="icon" src="@/assets/success.svg" />
    </div>
    <button id="comment-btn" class="btn">
      <img src="@/assets/add_comment.svg" align="middle" />
      <span class="btn-txt">Legg gjerne til en kommentar</span>
    </button>
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
  font: 400 48px "Roboto", sans-serif;
  width: 70%;
}

.icon {
  width: 30%;
  padding: auto;
  margin: auto;
}

.btn-txt {
  margin: auto;
}

#msg-container {
  display: flex;
  align-items: center;
  max-width: 30rem;
}

#comment-btn {
  background-color: var(--btn-blue, blue);
  color: #fff;
  width: 100%;
  margin-top: 2rem;
  font-size: 1.5em;
  text-align: center;
  vertical-align: bottom;
  display: flex;
  flex-direction: row;
  align-items: center
}
</style>
