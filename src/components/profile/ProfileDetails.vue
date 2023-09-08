<template>
  <div class="">
    <div class="px-4 py-12 rounded-lg bg-white md:p-10 md:pb-20 lg:flex-1">
      <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Profile Details</h2>
      <p class="mb-10 text-gray-400 lg:text-lg">
        Add your details to create a personal touch to your profile
      </p>
      <!-- Profile Image START-->
      <div
        class="flex flex-col gap-4 items-start bg-neutral-50 p-4 rounded-lg md:p-8 md:grid md:grid-cols-3 md:gap-8 md:items-center"
      >
        <p>Profile Image</p>
        <div class="flex flex-col gap-4 items-center rounded-lg bg-[#EFECFF] p-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="none"
            viewBox="0 0 40 40"
          >
            <path
              fill="#633CFF"
              d="M33.75 6.25H6.25a2.5 2.5 0 0 0-2.5 2.5v22.5a2.5 2.5 0 0 0 2.5 2.5h27.5a2.5 2.5 0 0 0 2.5-2.5V8.75a2.5 2.5 0 0 0-2.5-2.5Zm0 2.5v16.055l-4.073-4.072a2.5 2.5 0 0 0-3.536 0l-3.125 3.125-6.875-6.875a2.5 2.5 0 0 0-3.535 0L6.25 23.339V8.75h27.5ZM6.25 26.875l8.125-8.125 12.5 12.5H6.25v-4.375Zm27.5 4.375h-3.34l-5.624-5.625L27.91 22.5l5.839 5.84v2.91ZM22.5 15.625a1.875 1.875 0 1 1 3.75 0 1.875 1.875 0 0 1-3.75 0Z"
            />
          </svg>
          + Upload Image
        </div>
        <p>Image must be below 1024 X 1024px. Use PNG,JPG or BMP format</p>
      </div>
      <!-- Profile Image END-->

      <!-- Profile Details Form Start -->
      <div class="rounded-lg bg-neutral-50 p-4 mt-8 md:p-8">
        <form>
          <div class="grid gap-2 mt-4 md:grid-cols-3 md:gap-8 md:items-center">
            <label class="text-sm font-bold text-gray-400">First Name</label>
            <input type="text" class="rounded-lg py-3 px-4 border border-gray-200 col-span-2" />
          </div>
          <div class="grid gap-2 mt-4 md:grid-cols-3 md:gap-8 md:items-center">
            <label class="text-sm font-bold text-gray-400">Last Name</label>
            <input type="text" class="rounded-lg py-3 px-4 border border-gray-200 col-span-2" />
          </div>
          <div class="grid gap-2 mt-4 md:grid-cols-3 md:gap-8 md:items-center">
            <label class="text-sm font-bold text-gray-400">Email</label>
            <input type="text" class="rounded-lg py-3 px-4 border border-gray-200 col-span-2" />
          </div>
        </form>
      </div>
      <!-- Profile Details Form  End -->
    </div>
    <hr />
    <div class="flex px-4 py-8 rounded-lg bg-white md:p-10 md:justify-end">
      <button
        class="border-2 rounded-lg border-primary-blue text-center text-white bg-primary-blue font-medium py-3 px-5 w-full md:px-8 hover:bg-transparent hover:text-primary-blue transition-colors md:w-min"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileDetails'
}
</script>
