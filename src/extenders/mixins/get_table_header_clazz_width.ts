export const getTableHeaderClazzWidth = {
  methods: {
    $getTableHeaderClazzWidth(key: string) {
      const that = this as any;

      if (!that.tableHeaders) {
        throw new Error('You must define tableHeaders in your component');
      }

      return that
        .tableHeaders
        .find((header: any) => header.name === key)
        .clazz
        ?.split(' ')
        .find((item: any) => item.startsWith('width')) || ''
    }
  }
};