<template>
  <div class="center-div">
    <button class="signin-button" @click="signIn">Sign In</button>
    <!-- <button @click="signOut">Sign Out</button> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { signIn, isAuthenticated } from '@/services/authentication.service';


@Component
export default class SigninView extends Vue {
  private async signIn() {
    try {
      await signIn();
    } catch (error) {
      //Handle me if something goes wrong before redirect to idp
    }
  }

  private async created() {
    if ( await isAuthenticated()) {
      this.$router.push({ name: 'admin' });
    }
  }
}
</script>

<style scoped>
.center-div
{
  width: 200px;
  height: 100px;
  background-color: #ccc;
  border-radius: 3px;
}

.signin-button {
  width: 91%;
  padding: 11px 13px;
  background: #4573e3 0% 0% no-repeat padding-box;
  border: none;
  border-radius: 2px;
  opacity: 1;
  text-align: center;
  font: Regular 12px/14px Roboto;
  letter-spacing: 0;
  color: #ffffff;
  margin-top: 10px;
  cursor: pointer; 
}
</style>
