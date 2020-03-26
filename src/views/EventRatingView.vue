<template>
  <div id="container">
    <img id="logo" src="@/assets/app-logo.svg" />
    <p id="event-name">EVENT NAME GOES HERE</p>
    <component :is="stepComponent" :rating="rating" @rating-click="ratingClick" @send-comment="sendComment"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import EventRatingButtons, { RatingButtonType } from '@/components/EventRating/EventRatingButtons.vue';
import EventRatingFinished from '@/components/EventRating/EventRatingFinished.vue';
import { sendVote, sendComment } from '@/services/event.service';

@Component({
  components: {
    EventRatingButtons,
    EventRatingFinished
  }
})
export default class EventRatingView extends Vue {

  @Prop()
  private eventCode!: string;

  private step = 1;

  private rating: RatingButtonType | null = null;

  private get stepComponent() {
    switch (this.step) {
      case 1:
        return 'EventRatingButtons';
      case 2:
        return 'EventRatingFinished';
      default:
        console.log('Step not defined');
        return '';
    }
  }

  private ratingClick(type: RatingButtonType) {
    sendVote(this.eventCode, type)
      .then(() => {
        this.rating = type;
        this.step = 2;
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  private sendComment(comment: string) {
    sendComment(this.eventCode, comment)
    .then(() => console.log('comment sent'))
    .catch((e: Error) => {
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

#event-name {
  margin: 1em 0 2.5em 0;
}

#container {
  width: 100%;
}
</style>
