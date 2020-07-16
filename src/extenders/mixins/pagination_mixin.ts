import {Subject} from "rxjs";
import {debounceTime} from "rxjs/operators";

export const paginationMixin = {
  data() {
    return {
      paginationData: {
        page: 1,
        perPage: 25,
        totalCount: 0,
        paginationStream: (new Subject()).pipe(debounceTime((200))),
        paginationSubscription: null,
        prevCb: null,
        nextCb: null
      },
    }
  },
  methods: {
    $initPaginationHandlers(prevCb: () => void, nextCb: () => void) {
      const that = this as any;
      that.paginationData.prevCb = prevCb;
      that.paginationData.nextCb = nextCb;
    },
    $paginationPrevHandler() {
      const that = this as any;
      that.paginationData.paginationStream.next({type: 'prev'});
    },
    $paginationNextHandler() {
      const that = this as any;
      that.paginationData.paginationStream.next({type: 'next'});
    },
  },
  mounted() {
    const that = this as any;
    that.paginationData.paginationSubscription = that
      .paginationData
      .paginationStream
      .subscribe(({type}: { type: 'prev' | 'next' }) => {
        if (type === 'prev') {
          that.paginationData.prevCb();
        } else {
          that.paginationData.nextCb();
        }
      })
  },
  beforeDestroy() {
    const that = this as any;
    that.paginationData.paginationSubscription.unsubscribe();
  }
};