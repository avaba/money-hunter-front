import Vue from 'vue';
import {TokenService} from "@/services/token_service";

Vue.mixin({
  computed: {
    $isLoggedIn() {
      return (new TokenService()).isLoggedIn();
    }
  }
});