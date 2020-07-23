import {debounce} from 'lodash';

export const paginationMixin = {
  data() {
    const that = this as any;
    return {
      paginationData: {
        page: 1,
        perPage: 25,
        totalCount: 0,
        paginationDebounced: debounce(that.$paginate, 400),
        prevCb: null,
        nextCb: null
      },
    }
  },
  methods: {
    $paginate({type}: { type: 'prev' | 'next' }) {
      const that = this as any;
      if (type === 'prev') {
        that.paginationData.prevCb();
      } else {
        that.paginationData.nextCb();
      }
    },
    $initPaginationHandlers(prevCb: () => void, nextCb: () => void) {
      const that = this as any;
      that.paginationData.prevCb = prevCb;
      that.paginationData.nextCb = nextCb;
    },
    $paginationPrevHandler() {
      const that = this as any;
      that.paginationData.paginationDebounced({type: 'prev'});
    },
    $paginationNextHandler() {
      const that = this as any;
      that.paginationData.paginationDebounced({type: 'next'});
    },
  }
};