

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
      stopId: null,
    };
  },
  methods: {
    handleTripCreated(tripId) {
      this.tripId = tripId; 
    },
    handleStopsUpdated(stops) {
      this.stops = stops; 
      console.log(stops);
      
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
    <AppStopComponent v-if="tripId" :tripId="tripId" @stopsUpdated="handleStopsUpdated" />

    <!-- Expense Component -->
    <AppExpenseComponent v-if="tripId" :tripId="tripId" :stops="stops" />
  </div>
</template>

<style lang="scss"></style>
