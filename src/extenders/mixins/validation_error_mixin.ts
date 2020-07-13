import Vue from 'vue';

Vue.mixin({
  methods: {
    $getValidationError(errors) {
      if (Array.isArray(errors) && errors.length > 0) {
        return errors[0];
      }
      return null;
    }
  }
});