// think about multi-format https://github.com/logaretm/vee-validate/issues/833#issuecomment-536323414

export const phonenumber = {
  validate(value: string) {
    return /8 \(\d{3}\) \d{3}-\d{2}-\d{2}/.test(value);
  },
  message: 'Неверный формат'
};