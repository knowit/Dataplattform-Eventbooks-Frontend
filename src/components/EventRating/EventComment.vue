<template>
  <div class="container" @mouseup.self="onMouseUp" @mousedown.self="onMouseDown">
    <div class="inner-container">
      <button id="comment-back-btn" class="btn" @click="emitBack">
        <i class="material-icons">arrow_back</i>
      </button>
      <textarea v-model="comment" ref="field" class="comment-txt-area" placeholder="Din kommentar her..."></textarea>
      <button id="comment-ok-btn" class="btn" @click="emitFinished">
        <i class="material-icons">check</i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';

@Component({})
export default class EventComment extends Vue {

  @Prop()
  private value!: string;

  private comment = this.value

  private mouseDown = false;

  @Watch('comment')
  @Emit('input')
  private emitInput() {
    return this.comment;
  }

  @Emit('finished')
  private emitFinished() {
    return;
  }

  @Emit('back')
  private emitBack() {
    return;
  }

  // Close only if click started AND ended in container.self
  // @click does not work because this is fired if click started OR ended in container.self
  private onMouseDown() {
    this.mouseDown = true;
  }

  private onMouseUp() {
    const mouseDown = this.mouseDown;
    this.mouseDown = false;

    if (mouseDown) {
      this.emitBack();
    }
  }

  private mounted() {
    console.log('mounted');
    (this.$refs.field as HTMLElement).focus();
  }
}

</script>

<style scoped>
#comment-back-btn {
  float: left;
  background-color: transparent;
  color: #232323;
}

#comment-ok-btn {
  float: right;
  border-radius: 50%;
  margin: 8px;
  background-color: var(--btn-blue);
  color: white;
}

.container {
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  text-align: start;
  width: 100vw;
  height: 100vh;
  background-color: rgba(1, 1, 1, 0.5);
  align-items: center;
  justify-content: center;
}

.inner-container {
  display: block;
  width: 48em;
  background-color: white;
}

.comment-txt-area {
  color: #232323;
  border-radius: 2px;
  border-style: none;
  resize: none;
  padding: 2em;
  height: 15em;
  width: 100%;
  font: 400 14px "Roboto", sans-serif;
}
</style>