<template>
  <div class="container">
    <event-rating-button v-for="i in buttons" :key="i" :type="i" @rating-click="ratingClick" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';


import EventRatingButton, { RatinButtonType } from './EventRatingButton.vue'

@Component({
  components: {
    EventRatingButton
  }
})
export default class EventRating extends Vue {
  @Prop()
  private eventId!: string;

  private buttons = [
    RatinButtonType.HAPPY,
    RatinButtonType.NEUTRAL,
    RatinButtonType.SAD
  ];

  private created() {
    console.log(this.eventId);
  }

  private ratingClick(rating: RatinButtonType) {
    console.log(rating);
    // Call function in service class for sending data
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  flex-direction: row-reverse;
}
</style>
