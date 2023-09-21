import {
  Form as VeeForm,
  Field as VeeField,
  FieldArray as VeeFieldArray,
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
import { usersCollection } from './firebase';

// eslint-disable-next-line no-unused-vars
async function checkUsername(username) {
  const usernameSnapshot = await usersCollection.where('username', '==', username).get();
  return usernameSnapshot.empty;
}

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('VeeFieldArray', VeeFieldArray);
    app.component('ErrorMessage', ErrorMessage);

    defineRule('required', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('email', email);
    defineRule('alphaSpaces', alphaSpaces);
    defineRule('maxValue', maxValue);
    defineRule('minValue', minValue);
    defineRule('passwordsMismatch', confirmed);
    // defineRule('usernameExists', checkUsername);

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
          passwordsMismatch: "The passwords don't match",
          usernameExists: 'Username is unavailable'
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
