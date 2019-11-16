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
import service from '@/services/EventRatingService';

import EventRatingButton, { RatingButtonType } from './EventRatingButton.vue';
import EventComment from './EventComment.vue';

@Component({
  components: {
    EventRatingButton,
    EventComment
  },
  beforeRouteLeave (to, from, next) {
    if (confirm('Vil du avbryte tilbakemeldingen?')) {
      return next()
    }
    return next(false)
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
    service.sendEvent({
      button: this.rating!,
      eventCode: this.eventId
    })
      .then(res => {
        console.log(res.data);
        this.$router.push({ name: 'eventFinished' });
      })
      .catch(e => {
        console.log('Error sending data');
        console.log(e);
      });
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
