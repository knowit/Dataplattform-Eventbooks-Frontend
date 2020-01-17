<template>
  <div id="container" v-if="this.pageCount > 0">
    <div class="type">{{voteText}}</div>
    <div class="text">{{feedback.details[page].comment}}</div>
    <div class="pageSelector">
      <span @click="negClick" v-show="page > 0">L</span>
      <span class="page"> ( {{ page+1 }}/{{ pageCount }} ) </span>
      <span @click="posClick" v-show="page < pageCount-1">R</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import EventFeedback from '@/models/eventFeedback.model';


@Component({})
export default class AdminEventFeedback extends Vue {

  @Prop()
  private feedback!: EventFeedback;

  private page: number = 0;
  private pageCount: number = this.feedback.details ? this.feedback.details.length : -1;

  private get voteText() {
    const vote = this.feedback.details ? this.feedback.details[this.page].vote : undefined;
    if (vote === -1) {
      return 'Negativ';
    }
    else if (vote === 0) {
      return 'Nøytral';
    }
    else if (vote === 1) {
      return 'Positiv';
    }
    else {
      return 'Error, ugyldig type.';
    }
  }

  private negClick() {
    if (this.page > 0) {
      this.page--;
    }
  }

  private posClick() {
    if (this.page < this.pageCount - 1) {
      this.page++;
    }
  }

}
</script>

<style scoped>
#container {
  width: 100%;
}

.type {
  text-align: left;
  font-style: italic;
  font-size: 12px;
  color: #212121;
}
.text {
  text-align: left;
  font-size: 15px;
  color: #212121;
}
.page {
  font-size: 12px;
  color: #707070;
}
</style>
