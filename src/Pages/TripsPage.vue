<script>
import axios from "axios";
import { store } from "../store";

export default {
  data() {
    return {
      store,
      stops: [],
      selectedTrip: {}, 
      tripExpenses: [], 
      stopExpenses: {}, 
    };
  },
  created() {
    this.fetchTripDetails(); 
  },
  methods: {
    fetchTripDetails() {
      
      const tripId = this.$route.params.id;
      console.log(tripId);


      axios
        .get(`${store.baseUrl}/api/trips/${tripId}`)
        .then((response) => {
            console.log(response);
          this.selectedTrip = response.data.data; 


          this.tripExpenses = this.selectedTrip.expenses.filter((expense) => !expense.stopId);

         this.stopExpenses = {}; 
        this.selectedTrip.stops.forEach(stop => {
            this.stopExpenses[stop.id] = []; 
        });

     
        this.selectedTrip.expenses.forEach((expense) => {
            if (expense.stopId) {
                if (!this.stopExpenses[expense.stopId]) {
                    this.stopExpenses[expense.stopId] = []; 
                }
                this.stopExpenses[expense.stopId].push(expense);
            }
        });

          console.log("Trip details fetched successfully:", this.selectedTrip);
        })
        .catch((error) => {
          console.error("Error fetching trip details:", error);
          alert("An error occurred while fetching trip details. Please try again."); // Basic user feedback
        });
    },
    formatDate(date) {
      
      return new Date(date).toLocaleDateString();
    },
    formatDateTime(dateTime) {
      
      const date = new Date(dateTime);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    },
    editStop(tripId, stopId) {
      
      this.$router.push({ name: "edit-stop", params: { tripId, stopId } });
    },
    editTrip() {
      
      this.$router.push({ name: "edit-trip", params: { id: this.selectedTrip.id } });
    },
  },
};
</script>

<template>
  <div class="container mt-4">

    <div class="card mb-4">
      <div class="card-body">
        <h3 class="card-title">{{ selectedTrip.title }}</h3>
        <p class="card-text">{{ selectedTrip.description }}</p>
        <p class="card-text">
          <strong>Start Date:</strong> {{ formatDate(selectedTrip.startDate) }} <br />
          <strong>End Date:</strong> {{ formatDate(selectedTrip.endDate) }}
        </p>
      </div>
    </div>


    <div class="card mb-4">
      <div class="card-body">
        <h4 class="card-title">Expenses</h4>

        <ul v-if="tripExpenses.length > 0" class="list-group list-group-flush">
          <li
            class="list-group-item"
            v-for="expense in tripExpenses"
            :key="expense.id"
          >
            {{ expense.description }} - {{ expense.amount }} ({{ expense.category }})
          </li>
        </ul>
  
        <p v-else>No expenses for this trip.</p>
      </div>
    </div>


    <div class="card mb-4">
      <div class="card-body">
        <h4 class="card-title">Categories</h4>
   
        <ul v-if="selectedTrip.categories && selectedTrip.categories.length > 0" class="list-group list-group-flush">
          <li
            class="list-group-item"
            v-for="category in selectedTrip.categories"
            :key="category.id"
          >
            {{ category.name }} - <span :style="{ color: category.color }">{{ category.color }}</span>
          </li>
        </ul>
  
        <p v-else>No categories for this trip.</p>
      </div>
    </div>


    <div class="card mb-4">
      <div class="card-body">
        <h4 class="card-title">Stops</h4>

        <ul v-if="selectedTrip.stops && selectedTrip.stops.length > 0" class="list-group list-group-flush">
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
            v-for="stop in selectedTrip.stops"
            :key="stop.id"
          >
            <div>
              <strong>{{ stop.title }}</strong> - {{ stop.location }} <br />
              <small>{{ formatDateTime(stop.date) }}</small>
              <!-- List expenses associated with this stop -->
              <ul v-if="stopExpenses[stop.id] && stopExpenses[stop.id].length > 0">
                <li v-for="expense in stopExpenses[stop.id]" :key="expense.id">
                  {{ expense.description }} - {{ expense.amount }} ({{ expense.category }})
                </li>
              </ul>
             
              <p v-else>No expenses for this stop.</p>
            </div>
            
            <button
              class="btn btn-primary btn-sm"
              @click="editStop(selectedTrip.id, stop.id)"
            >
              Edit
            </button>
          </li>
        </ul>
        
        <p v-else>No stops for this trip.</p>
      </div>
    </div>
  </div>
</template>


<style>

.stop-card {
  margin-bottom: 20px;
}
</style>
