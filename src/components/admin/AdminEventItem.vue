<template>
  <tr class="container">
    <td class="event-date">{{date}}</td>
    <td class="event-time">{{startTime}}-{{endTime}}</td>
    <td class="event-name">{{eventName}}</td>
    <td class="event-finished" v-if="isFinished"></td>
    <div class="event-id" v-else>
      <td class="event-id">{{eventId}}</td>
    </div>

    
  </tr>
</template>

<script lang="ts">
import { Vue, Component, Watch, Emit, Prop } from "vue-property-decorator";

@Component({})
export default class AdminEventItem extends Vue {
  @Prop()
  private date: string = "12.34";
  @Prop()
  private startTime: string = "11:11";
  @Prop()
  private endTime: string = "12:34";
  @Prop()
  private eventName: string = "Eventnavn - Charlie";
  @Prop()
  private eventId: string = "12345";

  private get isNow() {
    return false;
  }
  private get isActive() {
    return false;
  }
  private get isFinished() {
    return false;
  }

  
}
</script>

<style scoped>
.container {
  display: flex;
  text-align: left;
  width: 100%;
  font: regular 15px/14px "Roboto";
  letter-spacing: 0;
  color: #212121;
}
.now {
}
.event-date-time {
  display: flex;
  justify-content: left;
  flex-direction: row;
}
.event-date {
}
.event-time {
  margin-left: 1.25rem;
  white-space: nowrap;
}
.event-name {
  font: Italic 15px/14px Roboto;
  margin-left: 1.333rem;
  margin-right: 7rem;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 10rem;
}
.event-id {
  font-style: italic;
}
.event-active-indicator {
  margin-top: 1.8px;
  height: 0.9em;
  width: 0.9em;
  border-radius: 50%;
  border: 1.5px solid white;
  margin-right: 10px;
}
.on {
  background-color: #13a313;
}
.off {
  background-color: #d51919;
}
tr:nth-child(even) {
  background-color: #f5f5f3;
}
/*td {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 30px;
}*/

</style>
