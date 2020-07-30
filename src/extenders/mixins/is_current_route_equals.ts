import {RawLocation} from "vue-router";
import Vue from 'vue';

Vue.mixin({
  methods: {
    $isCurrentRouteEquals(routeData: RawLocation) {
      const that = this as any;
      return that.$route.fullPath === that.$router.resolve(routeData).resolved.fullPath;
    }
  }
});