import {VuexTrackingStateGroupItemInterface} from "@/store/modules/tracking/index";

function directionChecker(direction: string, val: number) {
  return direction === 'asc' ? val : ~val;
}

function getNum(value: number | null) {
  return value || 0
}

export const sorters = {
  sort_count(direction: string) {
    return (a: VuexTrackingStateGroupItemInterface, b: VuexTrackingStateGroupItemInterface) => {
      if (a.details === null || b.details === null) {
        return 0;
      }
      return directionChecker(direction, getNum(a.details.count) - getNum(b.details.count));
    }
  },
  sort_orders(direction: string) {
    return (a: VuexTrackingStateGroupItemInterface, b: VuexTrackingStateGroupItemInterface) => {
      if (a.details === null || b.details === null) {
        return 0;
      }
      return directionChecker(direction, getNum(a.details.orders) - getNum(b.details.orders));
    }
  },
  sort_revenue(direction: string) {
    return (a: VuexTrackingStateGroupItemInterface, b: VuexTrackingStateGroupItemInterface) => {
      if (a.details === null || b.details === null) {
        return 0;
      }
      return directionChecker(direction, getNum(a.details.revenue) - getNum(b.details.revenue));
    }
  }
};