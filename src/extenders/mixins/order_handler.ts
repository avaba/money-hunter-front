export const orderHandler = {
  methods: {
    $orderHandler(name: string) {
      const that = this as any;

      if (!that.orderType) {
        throw new Error('You must provide orderType in your component');
      }
      if (that.orderType === `-${name}`) {
        that.orderType = name;
      } else {
        that.orderType = `-${name}`;
      }
      // console.log('sorting 2')
      // if (that.orderType === name) {
      //   that.orderType = `-${name}`;
      // } else {
      //   that.orderType = name;
      // }
    }
  }
};