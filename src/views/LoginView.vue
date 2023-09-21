<template>
  <div class="bg-neutral-50 p-4 min-h-screen flex items-center justify-center lg:p-8">
    <div class="bg-white w-full max-w-[600px] p-8 rounded-lg lg:p-12">
      <img src="/assets/logo-devlinks-large.svg" alt="" class="w-[125px] mb-4" />
      <h1 class="text-2xl font-bold md:text-3xl mb-6">Welcome back</h1>

      <!-- Alert Message -->
      <p v-show="loginShowAlert" class="rounded-lg p-4 mb-4 text-center" :class="loginAlertVariant">
        {{ loginAlertMessage }}
      </p>

      <VeeForm :validation-schema="schema" @submit="login">
        <!-- Email -->
        <div class="flex flex-col gap-2 mb-3">
          <label for="email" class="text-sm font-semibold text-gray-400 lg:mt-2">Email</label>
          <div>
            <VeeField
              type="text"
              name="email"
              placeholder="Email"
              class="block w-full py-3 px-4 text-gray-800 border border-gray-200 transition duration-500 focus:outline-none focus:border-primary-blue rounded-lg"
            />
            <ErrorMessage class="text-sm mt-0.5 italic text-red-400" name="email" />
          </div>
        </div>

        <!-- Password -->
        <div class="flex flex-col gap-2 mb-3">
          <label for="password" class="text-sm font-semibold text-gray-400 lg:mt-2">Password</label>
          <div>
            <VeeField
              type="password"
              name="password"
              placeholder="Password"
              class="block w-full py-3 px-4 text-gray-800 border border-gray-200 transition duration-500 focus:outline-none focus:border-primary-blue rounded-lg"
            />
            <ErrorMessage class="text-sm mt-0.5 italic text-red-400" name="password" />
          </div>
        </div>

        <button
          class="w-full font-bold bg-primary-blue text-white py-4 px-6 rounded-lg border-primary-blue mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="loginInSubmission"
        >
          Login
        </button>
      </VeeForm>

      <p class="mt-8 text-center">
        Don't have an account?
        <RouterLink :to="{ name: 'register' }" class="text-primary-blue"
          >Create an acccount</RouterLink
        >
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import { useUserStore } from '../stores/user';

export default {
  name: 'LoginView',
  data() {
    return {
      schema: {
        email: 'required|min:4|max:100|email',
        password: 'required|min:6|max:32'
      },
      loginShowAlert: false,
      loginInSubmission: false,
      loginAlertVariant: 'bg-light-blue text-primary-blue',
      loginAlertMessage: 'Please wait! Your are being logged in'
    };
  },
  methods: {
    ...mapActions(useUserStore, ['authenticate']),
    async login(values) {
      this.loginShowAlert = true;
      this.loginInSubmission = true;
      this.loginAlertVariant = 'bg-light-blue text-primary-blue';
      this.loginAlertMessage = 'Please wait! Your are being logged in';

      try {
        await this.authenticate(values);
      } catch (error) {
        this.loginInSubmission = false;
        this.loginAlertVariant = 'bg-red-100 text-red-900';
        this.loginAlertMessage = 'Invalid login details';
        console.log(error);

        return;
      }

      this.loginAlertVariant = 'bg-green-100 text-green-900';
      this.loginAlertMessage = 'Success! Logged in';
      this.$router.push({ name: 'profile' });
    }
  }
};
</script>
