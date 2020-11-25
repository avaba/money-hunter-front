import {getTableHeaderClazzWidth} from "@/extenders/mixins/get_table_header_clazz_width";

export const mapItemListToTableItem = {
  mixins: [
    getTableHeaderClazzWidth
  ],
  methods: {
    $mapItemListToTableItem(item: Record<string, any>) {
      const that = this as any;
      const result = {} as any;

      if (!that.$tableHeaderKeys) {
        throw new Error('You must provide "$tableHeaderKeys" in your component or include "table_header_keys" mixin')
      }

      const keys = that.$tableHeaderKeys;
      for (const key of keys) {
        console.log(key)
        result[key] = that[`map_${key}`]
          ? that[`map_${key}`](item)
          : {
            content: item[key],
            clazz: [item[key].clazz || '', that.$getTableHeaderClazzWidth(key)].join(' '),
          }

      }

      return result;
    }
  }
};