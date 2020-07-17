import Vue from 'vue';

export function EventBusPlugin(vue: typeof Vue): void {
  Object.defineProperty(vue.prototype, '$eventBus', {value: new Vue});
}

Vue.use(EventBusPlugin);