// think about multi-format https://github.com/logaretm/vee-validate/issues/833#issuecomment-536323414

export const phonenumber = {
  validate(value: string) {
    return value.indexOf('_') === -1;
  },
  message: 'Неверный формат'
};