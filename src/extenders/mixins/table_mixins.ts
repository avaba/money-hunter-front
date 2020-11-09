import {mapItemListToTableItem} from "@/extenders/mixins/map_item_list_to_table_item";
import {tableHeaderKeys} from "@/extenders/mixins/table_header_keys";
import {orderHandler} from "@/extenders/mixins/order_handler";

export const tableMixins = {
  mixins: [mapItemListToTableItem, tableHeaderKeys, orderHandler]
};