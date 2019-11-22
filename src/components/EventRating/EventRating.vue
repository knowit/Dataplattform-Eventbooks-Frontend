<template>
  <div class="container">
    <div class="rating-btn-container" v-if="step===1">
      <event-rating-button v-for="i in buttons" :key="i" :type="i" @rating-click="ratingClick" />
    </div>
    <div class="feedback-container" v-if="step===2">
      <event-comment v-model="comment" @back="back" @finished="finished"></event-comment>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import EventRatingButton, { RatingButtonType } from './EventRatingButton.vue';
import EventComment from './EventComment.vue';

@Component({
  components: {
    EventRatingButton,  
    EventComment
  }
})
export default class EventRating extends Vue {
  @Prop()
  private eventId!: string;

  private comment: string = '';

  private step: number = 1;

  private rating?: RatingButtonType;

  private buttons = [
    RatingButtonType.HAPPY,
    RatingButtonType.NEUTRAL,
    RatingButtonType.SAD
  ];

  private created() {
    console.log(this.eventId);
  }

  private ratingClick(rating: RatingButtonType) {
    console.log(rating);
    this.rating = rating;
    // Call function in service class for sending data
    this.step++;
  }

  private back() {
    if (this.step > 1) {
      this.step--;
    }
  }

  private finished() {
    this.$router.push({ name: 'eventFinished' });
  }
}
</script>

<style scoped>
.rating-btn-container {
  display: flex;
  justify-content: center;
  flex-direction: row;
}

.feedback-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

</style>
