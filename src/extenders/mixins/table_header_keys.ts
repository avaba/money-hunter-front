export const tableHeaderKeys = {
  computed: {
    $tableHeaderKeys() {
      const that = this as any;
      if(!that.tableHeaders){
        throw new Error('You must provide "tableHeaders" in your component')
      }

      return that.tableHeaders.map((header: { name: string }) => header.name)
    }
  }
};