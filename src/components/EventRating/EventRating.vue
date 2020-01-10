<template>
  <div class="container">
    <div class="rating-btn-container" v-if="step===1">
      <event-rating-button v-for="i in buttons" :key="i" :type="i" @rating-click="ratingClick" />
    </div>
    <div class="feedback-container" v-if="step===2">
      <event-comment v-model.trim="comment" @back="back" @finished="finished"></event-comment>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import service from '@/services/eventRating.service';

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

  private buttons = [
    RatingButtonType.HAPPY,
    RatingButtonType.NEUTRAL,
    RatingButtonType.SAD
  ];

  private created() {
    console.log(this.eventId);
  }

  private ratingClick(rating: RatingButtonType) {
    service
      .sendVote(this.eventId, rating)
      .then(() => {
        this.step++;
      })
      .catch((e: Error) => {
        console.log(e);
        alert('Noe gikk galt');
        this.$router.push({name: 'eventSelector'});
      });
  }

  private back() {
    if (this.step > 1) {
      this.step--;
    }
  }

  private finished() {
    if (this.comment) {
      service
        .sendComment(this.eventId, this.comment)
        .then(() => {
          this.$router.push({name: 'eventFinished'});
        })
        .catch((e: Error) => {
          console.log(e);
          alert('Noe gikk galt');
          this.$router.push({name: 'eventSelector'});
        });
    }
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
