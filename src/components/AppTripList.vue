<script>
import axios from "axios";
import { store } from "../store";  

export default {
    props: {
        trips: Array,
    },
  data() {
    
    return {
    };
  },
  methods: {
    
    // viewTrip(tripId) {
    //   // Navigate to the trip details page
    //   this.$router.push({ name: "trip-page", params: { id: tripId } });
    // },
    // editTrip(tripId) {
    //   // Navigate to the trip edit page
    //   this.$router.push({ name: "edit-trip", params: { id: tripId } });
    // },
    formatCurrency(value) {
    if (!value) return '€0.00';
    return `€${parseFloat(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  },

    
  },
//   filters: {
//     currency(value) {
//       // Format number as currency
//       if (!value) return "$0.00";
//       return `$${parseFloat(value).toFixed(2)}`;
//     },
//   },
};
</script>

<template>
  <div class="container mt-4">
    <h2 class="mb-4">Trips List</h2>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Number of Stops</th>
          <th>Total Expenses</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="trip in trips" :key="trip.id">
          <td>{{ trip.title }}</td>
          <td>{{ trip.description }}</td>
          <td>{{ trip.startDate }}</td>
          <td>{{ trip.endDate }}</td>
          <td>{{ trip.numberOfStops }}</td> 
          <td>{{ formatCurrency(trip.totalExpenses) }}</td>
          <td>
            <router-link
              class="btn btn-primary btn-sm"
              :to="{ name: 'trip-page', params: { id: trip.id } }"
            >
              View
            </router-link>
            <button class="btn btn-secondary btn-sm" @click="editTrip(trip.id)">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<style lang="scss">

</style>
