<template>
  <div id="container" v-if="this.pageCount > 0">
    <div class="type">{{voteText}}</div>
    <div class="text">{{feedback.details[page].comment}}</div>
    <div class="page-selector">
      <img class="svg" src="@/assets/arrow_back.svg" @click="negClick" v-visible="page > 0" />
      <span class="page"> ( {{ page+1 }}/{{ pageCount }} ) </span>
      <img class="svg" src="@/assets/arrow_forward.svg" @click="posClick" v-visible="page < pageCount-1" />
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
  padding-bottom: 0.5em;
}
.text {
  text-align: left;
  font-size: 15px;
  color: #212121;
  height: 10em;
  overflow-y: scroll;
}
.page {
  font-size: 12px;
  color: #707070;
  margin: auto;
}

.page-selector {
  padding: 1rem 0 2rem 0;
  margin: auto;
}
.svg {
  height: 15px;
  width: 15px;
  min-width: 15px;
  cursor: pointer;

  vertical-align: middle;
}
</style>
