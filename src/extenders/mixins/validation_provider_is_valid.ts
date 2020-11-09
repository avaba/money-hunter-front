import Vue from 'vue';
import {ValidationResult} from "vee-validate/dist/types/types";

Vue.mixin({
  methods: {
    async $validationProviderIsValid(provider: { validate: () => ValidationResult }) {
      return (await provider.validate()).valid;
    }
  }
});