<template>
  <section class="">
    <div class="relative flex flex-col gap-4 p-4 md:px-6 md:py-8 md:gap-8 w-full">
      <!-- Profile Navigation-->
      <ProfileNav :tab="tab" @select-tab="selectTab" />

      <!-- Device Preview and Links START -->
      <div class="grid gap-4 lg:flex lg:gap-8 relative">
        <!--Device Preview -->
        <DevicePreview />

        <!-- Tabbed Section -->
        <div class="lg:flex-1">
          <CustomizeLinks v-if="tab === 'links'" />
          <ProfileDetails v-else />
        </div>
      </div>
      <!-- Device Preview and Links END -->
    </div>
  </section>
  <ToastBar />
</template>

<script>
import ProfileNav from '@/components/profile/ProfileNav.vue';
import DevicePreview from '@/components/profile/DevicePreview.vue';
import CustomizeLinks from '@/components/profile/CustomizeLinks.vue';
import ProfileDetails from '@/components/profile/ProfileDetails.vue';
import ToastBar from '../components/profile/ToastBar.vue';

export default {
  name: 'ProfileView',
  data() {
    return {
      tab: 'links',
      loading: false
    };
  },

  methods: {
    selectTab(value) {
      this.tab = value;
    }
  },
  created() {
    const { tab } = this.$route.query;

    this.tab = tab === 'links' || tab === 'details' ? tab : 'links';

    this.$router.push({
      query: {
        tab: this.tab
      }
    });
  },
  watch: {
    tab(value) {
      if (value === this.$route.query.tab) {
        return;
      }

      this.$router.push({
        query: {
          tab: value
        }
      });
    }
  },
  components: { ProfileNav, DevicePreview, CustomizeLinks, ProfileDetails, ToastBar }
};
</script>
