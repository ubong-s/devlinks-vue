import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure
} from 'vee-validate';
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  max_value as maxValue,
  min_value as minValue,
  confirmed
} from '@vee-validate/rules';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);

    defineRule('required', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('email', email);
    defineRule('alphaSpaces', alphaSpaces);
    defineRule('maxValue', maxValue);
    defineRule('minValue', minValue);
    defineRule('passwordsMismatch', confirmed);

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `This field ${ctx.field} is required`,
          min: `This field ${ctx.field} is too short`,
          max: `This field ${ctx.field} is too long`,
          alphaSpaces: `The field ${ctx.field} is may only contain alphabetical characters and spaces`,
          email: `The field ${ctx.field} is must be a valid email`,
          minValue: `The field ${ctx.field} is too low`,
          maxValue: `The field ${ctx.field} is too high`,
          passwordsMismatch: "The passwords don't match"
        };

        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `the field ${ctx.field} is invalid`;

        return message;
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true
    });
  }
};
