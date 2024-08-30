<script>
import Chart from 'chart.js/auto';
import { store } from '../store';
import axios from 'axios';
import { DateTime } from 'luxon';

export default {
  data() {
    return {
      store,
      trips: [],
      expenseCategories: {
        FLIGHTS: 0,
        HOTELS: 0,
        MEALS: 0,
        TRANSPORT: 0,
        MISCELLANEOUS: 0,
      },
      sortedCategories: [],  // Store sorted categories with total amounts
      sortedTripsByRating: [],  // Store trips sorted by average rating
      mostRatedTrip: null,  // Store the most rated trip
      leastRatedTrip: null,  // Store the least rated trip
      activeTrip: null,  // Store the active trip, if any
      expenseChart: null, 
    };
  },
  created() {
    this.fetchTrips();
  },
  mounted() {

    
    const ctx = document.getElementById('expenseChart').getContext('2d');
    this.expenseChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Flights', 'Hotels', 'Meals', 'Transport', 'Miscellaneous'],
        datasets: [
          {
            label: 'Total expenses',
            data: [0, 0, 0, 0, 0],  
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
          },

        ],
      },
        options : {
            responsive: true, 
            maintainAspectRation : true,
            aspectRatio: 1,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    })
  },
  methods: {
    fetchTrips() {
      console.log("fetching...");
      axios
        .get(`${this.store.baseUrl}/api/trips`)
        .then((resp) => {
          console.log(resp);
          this.trips = resp.data.data;
          console.log(this.trips);
          this.processExpensesByCategory();  
          this.calculateTripRatings();  
          this.checkActiveTrip();  
        })
        .catch((error) => {
          this.error = error;
        });
    },
    processExpensesByCategory() {
      
      this.expenseCategories = {
        FLIGHTS: 0,
        HOTELS: 0,
        MEALS: 0,
        TRANSPORT: 0,
        MISCELLANEOUS: 0,
      };

      this.trips.forEach((trip) => {
        trip.expenses.forEach((expense) => {
          if (this.expenseCategories.hasOwnProperty(expense.category)) {
            this.expenseCategories[expense.category] += expense.amount;
          }
        });
      });

      this.sortedCategories = Object.entries(this.expenseCategories)
        .map(([category, total]) => ({ category, total }))
        .sort((a, b) => b.total - a.total);  
      console.log("Sorted Categories by Total Amount:", this.sortedCategories);

      
      this.updateChart();
    },
    calculateTripRatings() {
      // Calculate average rating for each trip
      this.trips.forEach((trip) => {
        if (trip.stops && trip.stops.length > 0) {
          const totalRating = trip.stops.reduce((sum, stop) => sum + stop.rating, 0);
          trip.averageRating = totalRating / trip.stops.length;
          console.log("Average rating:", trip.averageRating);
        } else {
          trip.averageRating = 0;  
        }
      });

      // Sort trips by average rating in descending order
      this.sortedTripsByRating = [...this.trips].sort((a, b) => b.averageRating - a.averageRating);

      // Get the most and least rated trips
      this.mostRatedTrip = this.sortedTripsByRating[0] || null;  // Most rated trip
      this.leastRatedTrip = this.sortedTripsByRating[this.sortedTripsByRating.length - 1] || null;  // Least rated trip

      console.log("Most Rated Trip:", this.mostRatedTrip);
      console.log("Least Rated Trip:", this.leastRatedTrip);
    },
    checkActiveTrip() {
      const now = DateTime.now();  // Get current time using Luxon

      // Find the active trip if any
      this.activeTrip = this.trips.find(trip => {
        const startDate = DateTime.fromISO(trip.startDate);
        const endDate = DateTime.fromISO(trip.endDate);
        return now >= startDate && now <= endDate;  // Check if current time is within trip's start and end date
      });

      console.log("Active Trip:", this.activeTrip);
    },

    updateChart() {
      
      this.expenseChart.data.datasets[0].data = Object.values(this.expenseCategories);
      this.expenseChart.update();
    },
  },
};
</script>

<template>
  <section>
    <h2 class="text-center mb-3">Dashboard</h2>
    <div class="container">
      <div class="row mb-3">
        <div class="col">
          <button type="button" class="btn btn-primary">Add New Trip</button>
        </div>
        <div class="col">
          <button type="button" class="btn btn-secondary">Manage Expenses</button>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col">
          <h3>Upcoming Trips</h3>
          <ul class="list-group">
            <li
              class="list-group-item d-flex justify-content-between align-items-center"
              v-for="trip in trips"
              :key="trip.id"
            >
              <span><strong>{{ trip.title }}</strong> - {{ trip.startDate }}</span>
              <button type="button" class="btn btn-link btn-sm">View Details</button>
            </li>
          </ul>
        </div>
        <div class="col">
          <h3>Expense Overview</h3>
          <canvas id="expenseChart"></canvas>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">

</style>
