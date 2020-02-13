<template>
  <div class="container">
    <div class="ratings">
      <div class="positive">
        <div class="wrapper">
          <div class="green circle"></div>
          <div class="number">{{positive}}</div>
        </div>
        <div class="type">Positiv</div>
      </div>
      <div class="neutral">
        <div class="wrapper">
          <div class="yellow circle"></div>
          <div class="number">{{neutral}}</div>
        </div>
        <div class="type">Nøytral</div>
      </div>
      <div class="negative">
        <div class="wrapper">
          <div class="red circle"></div>
          <div class="number">{{negative}}</div>
        </div>
        <div class="type">Negativ</div>
      </div>
    </div>
    <div class="stats">
      <div class="votes">
        <div class="big-number">{{voteCount}}</div>
        <div class="big-number-type">Stemmer</div>
      </div>
      <div class="participants">
        <div class="big-number">{{participants}}</div>
        <div class="big-number-type">Deltagere</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import AdminEventItem from './AdminEventItem.vue';
import Event from '@/models/event.model';

@Component({
  components: {
    AdminEventItem
  }
})
export default class AdminEventVotes extends Vue {
  @Prop()
  private event!: Event;

  private get positive() {
    return this.event.eventFeedback ? this.event.eventFeedback.positiveCount : 0;
  }
  private get neutral() {
    return this.event.eventFeedback ? this.event.eventFeedback.neutralCount : 0;
  }
  private get negative() {
    return this.event.eventFeedback ? this.event.eventFeedback.negativeCount : 0;
  }
  private get voteCount() {
    const positive = this.event.eventFeedback ? this.event.eventFeedback.positiveCount : 0;
    const neutral = this.event.eventFeedback ? this.event.eventFeedback.neutralCount : 0;
    const negative = this.event.eventFeedback ? this.event.eventFeedback.negativeCount : 0;
    return positive + neutral + negative;
  }
  private get participants() {
    // Not currently in model
    return 100;
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 30px 0px 30px 0px;
}
.ratings {
  display: flex;
  width: 55%;
  justify-content: space-between;
}
.wrapper {
  display: flex;
  padding-bottom: 5px;
}
.stats {
  display: flex;
  width: 25%;
  justify-content: space-between;
}
.circle {
  height: 38px;
  width: 38px;
  border-radius: 50%;
  border: 2px solid #ffffff;
}
.green {
  background-color: #5fff8e;
}
.yellow {
  background-color: #fffb5f;
}
.red {
  background-color: #ff615f;
}
.vote-container {
  display: flex;
}
.number {
  font-size: 20px;
  color: #212121;
  padding: 7px;
}
.type {
  font-size: 12px;
  color: #212121;
  text-align: left;
  margin-left: 0.2rem;
}
.big-number {
  font-size: 27px;
  color: #212121;
  margin: 5px;
  background-color: #ffffff;
}
.big-number-type {
  font-size: 12px;
  color: #212121;
  text-align: center;
  margin-left: 0.2rem;
}

.votes,
.participants {
  width: 5rem;
  text-align: center;
}

@media only screen and (max-width: 580px) {
  .container {
    flex-direction: column;
    align-items: center;
  }

  .stats {
    width: 50%;
  }

  .ratings {
    width: 75%;
    margin-bottom: 1rem;
  }
}
</style>
