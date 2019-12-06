<template>
  <div class="container">
  <div class="wrapper">
    <h1>{{title}}</h1>
    <div class="hide-show-button" :class="{show: isExpanded}" @click="isExpanded = !isExpanded"></div>
    </div>
    <table v-if="isExpanded">
      <admin-event-item />
      <admin-event-item />
      <admin-event-item />
      <admin-event-item />
    </table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import AdminEventItem from "./AdminEventItem.vue";

@Component({
  components: {
    AdminEventItem
  }
})
export default class AdminEventList extends Vue {
  @Prop()
  private title!: string;
  
  private isExpanded: boolean = true;
}
</script>

<style scoped>
table {
  table-layout: fixed;
}
.container {
  margin-left: 3px;
}
.wrapper{
  display: flex;
  flex-direction: row;
  width:100%;
  justify-content: space-between;
}
h1 {
  display:flex;
  font: Medium 20px/24px Roboto;
  font-size: 15px;
  letter-spacing: 0;
  color: #212121;
  opacity: 1;
  
}

.hide-show-button {
  width: 10px;
  height: 10px;
  border: 2px solid #696969;
}

.show{
  transform: rotate(45deg);
}

</style>
