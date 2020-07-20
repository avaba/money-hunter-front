export const isType = {
  validate(value: string, args: Record<string, any>) {
    return value ? typeof value === args.type : true;
  },
  params: ['type'],
  message: 'Неверный тип'
};