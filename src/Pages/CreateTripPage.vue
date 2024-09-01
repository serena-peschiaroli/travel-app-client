

<script>
import AppTripComponent from '../components/AppTripComponent.vue';
import AppStopComponent from '../components/AppStopComponent.vue';
import AppExpenseComponent from '../components/AppExpenseComponent.vue';

export default {
  components: {
    AppTripComponent,
    AppStopComponent,
    AppExpenseComponent,
  },
  data() {
    return {
      tripId: null, 
      stops: [], 
    };
  },
  methods: {
    handleTripCreated(tripId) {
      this.tripId = tripId; 
    },
    handleStopsUpdated(stops) {
      this.stops = stops; 
    },
  },
};
</script>

<template>
  <div class="container mt-4">
    <h2 class="mb-4">Create a New Trip</h2>
    <!-- Trip Component -->
    <AppTripComponent @tripCreated="handleTripCreated" />

    <!-- Stop Component -->
    <AppStopComponent v-if="tripId" :tripId="tripId" />

    <!-- Expense Component -->
    <AppExpenseComponent v-if="tripId" :tripId="tripId" :stops="stops" />
  </div>
</template>

<style lang="scss"></style>
