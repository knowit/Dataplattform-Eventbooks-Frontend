<template>
  <div>
    <div id="msg-container">
      <div class="txt">
        Din {{ratingText}} stemme er nå sendt
      </div>
      <img class="icon" src="@/assets/success.svg" />
    </div>
    <button id="comment-btn" class="btn" @click="showCommentClick">
      <div id="icon-container">
        <i class="material-icons-outlined comment-icon">add_comment</i>
      </div>
      <span class="btn-txt">Legg gjerne til en kommentar</span>
    </button>

    <event-comment v-if="showComment" v-model="comment" @back="hideCommentClick" @finished="commentFinished" />

  </div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { RatingButtonType } from '@/components/eventrating/EventRatingButtons.vue';
import EventComment from '@/components/eventrating/EventComment.vue';
import { sendComment } from '../../services/event.service';

@Component({
  components: {
    EventComment
  }
})
export default class EventRatingFinished extends Vue {

  @Prop()
  private rating!: RatingButtonType;

  private comment: string = '';

  private showComment: boolean = false;

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

  private showCommentClick() {
    this.showComment = true;
  }

  private hideCommentClick() {
    this.showComment = false;
  }

  @Emit('send-comment')
  private commentFinished() {
    this.hideCommentClick();
    return this.comment;
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

.comment-icon {
  font-size: 30px;
  color: white;
}

#msg-container {
  display: flex;
  align-items: center;
  width: 30em;
  margin: auto;
}

#comment-btn {
  background-color: rgba(0, 0, 0, 0);
  color: #232323;
  width: 20em;
  margin: auto;
  margin-top: 2rem;
  font-size: 1.5em;
  text-align: center;
  vertical-align: bottom;
  display: flex;
  flex-direction: row;
  align-items: center;
}

#icon-container {
  height: 62px;
  width: 62px;
  background-color: var(--btn-blue, blue);
  border-radius: 50%;
  padding: 16px;
  text-align: center;
  vertical-align: center;
}

@media only screen and (max-width: 580px) {
  #comment-btn {
    font-size: 1em;
  }

  .txt {
    font-size: 20px;
    line-height: 24px;
  }

  #msg-container {
    width: 15em;
  }
}
</style>
