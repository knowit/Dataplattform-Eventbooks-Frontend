<template>
  <div>
    <span if="user">
      Welcome {{ name }}
    </span>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { getCurrentUser } from '@/services/authentication.service';
import { getEvents } from '@/services/event.service';
import User from '@/models/user.model';


@Component
export default class UserComponent extends Vue {
  private user: User | null = null;
  
  private async created() {
    try {
      this.user = await getCurrentUser();
      console.log(this.user);
    } catch (error) {
      console.error(error);
    }

    try {
      console.log(await getEvents());
    } catch (error) {
      
    }
  }

  private get name() {
    return this.user ? this.user.name : '';
  }
}
</script>