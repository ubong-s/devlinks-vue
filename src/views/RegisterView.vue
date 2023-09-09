<template>
  <div class="bg-neutral-50 p-4 min-h-screen flex items-center justify-center lg:p-8">
    <div class="bg-white w-full max-w-[600px] p-8 rounded-lg lg:p-12">
      <img src="/assets/logo-devlinks-large.svg" alt="" class="w-[125px] mb-4" />
      <h1 class="text-2xl font-bold md:text-3xl mb-6">Create an account</h1>

      <!-- Alert Message -->
      <p
        v-show="registerShowAlert"
        class="rounded-lg bg-light-blue p-4 text-primary-blue mb-4 text-center"
        :class="registerAlertVariant"
      >
        {{ registerAlertMessage }}
      </p>

      <VeeForm :validation-schema="schema" @submit="register">
        <!-- Username -->
        <div class="flex flex-col gap-2 mb-3 lg:grid lg:gap-4 lg:grid-cols-4 lg:items-start">
          <label for="username" class="text-sm font-semibold text-gray-400 lg:mt-2">Username</label>
          <div class="lg:col-span-3">
            <VeeField
              type="text"
              name="username"
              placeholder="Username"
              class="block w-full py-3 px-4 text-gray-800 border border-gray-200 transition duration-500 focus:outline-none focus:border-primary-blue rounded-lg"
            />
            <ErrorMessage class="text-sm mt-0.5 italic text-red-400" name="username" />
          </div>
        </div>

        <!-- Email -->
        <div class="flex flex-col gap-2 mb-3 lg:grid lg:gap-4 lg:grid-cols-4 lg:items-start">
          <label for="email" class="text-sm font-semibold text-gray-400 lg:mt-2">Email</label>
          <div class="lg:col-span-3">
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
        <div class="flex flex-col gap-2 mb-3 lg:grid lg:gap-4 lg:grid-cols-4 lg:items-start">
          <label for="password" class="text-sm font-semibold text-gray-400 lg:mt-2">Password</label>
          <div class="lg:col-span-3">
            <VeeField
              type="password"
              name="password"
              placeholder="Password"
              class="block w-full py-3 px-4 text-gray-800 border border-gray-200 transition duration-500 focus:outline-none focus:border-primary-blue rounded-lg"
            />
            <ErrorMessage class="text-sm mt-0.5 italic text-red-400" name="password" />
          </div>
        </div>

        <!--Confirm Password -->
        <div class="flex flex-col gap-2 mb-3 lg:grid lg:gap-4 lg:grid-cols-4 lg:items-start">
          <label for="confirmPassword" class="text-sm font-semibold text-gray-400 lg:mt-2"
            >Confirm Password</label
          >
          <div class="lg:col-span-3">
            <VeeField
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              class="block w-full py-3 px-4 text-gray-800 border border-gray-200 transition duration-500 focus:outline-none focus:border-primary-blue rounded-lg"
            />
            <ErrorMessage class="text-sm mt-0.5 italic text-red-400" name="confirmPassword" />
          </div>
        </div>

        <button
          class="w-full font-bold bg-primary-blue text-white py-4 px-6 rounded-lg border-primary-blue mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="registerInSubmission"
        >
          Register
        </button>
      </VeeForm>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterView',
  data() {
    return {
      schema: {
        username: 'required|min:4|max:10|alphaSpaces',
        email: 'required|min:4|max:100|email',
        password: 'required|min:6|max:32',
        confirmPassword: 'passwordsMismatch:@password'
      },
      registerShowAlert: false,
      registerInSubmission: false,
      registerAlertVariant: 'bg-light-blue text-primary-blue',
      registerAlertMessage: 'Please wait! Your account is being created'
    };
  },
  methods: {
    async register(values) {
      this.registerShowAlert = true;
      this.registerInSubmission = true;
      this.registerAlertVariant = 'bg-light-blue text-primary-blue';
      this.registerAlertMessage = 'Please wait! Your account is being created';

      try {
        console.log(values);
      } catch (error) {
        this.registerInSubmission = false;
        this.registerAlertVariant = 'bg-red-100 text-red-900';
        this.registerAlertMessage = 'An unexpected error occured. Please try again later';
        console.log(error);

        return;
      }

      this.registerAlertVariant = 'bg-green-100 text-green-900';
      this.registerAlertMessage = 'Success! Your account has been created';
      // this.$router.push({ name: 'profile' })
    }
  }
};
</script>
