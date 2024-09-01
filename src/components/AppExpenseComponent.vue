

<script>
import axios from "axios";
import { store } from "../store";

export default {
  props: {
    tripId: Number,
    stops: Array,
    stopId: Number,
  },
  data() {
    return {
      newExpense: {
        amount: "",
        description: "",
        category: "",
        
      },
      expenses: [],
      expenseCategories: ["FLIGHTS", "HOTELS", "MEALS", "TRANSPORT", "MISCELLANEOUS"],
      localStops: [],
    };
  },
  mounted() {
    if (this.tripId) {
      this.fetchStopsForTrip(); 
    }
  },
  methods: {
    async fetchStopsForTrip(){
      const response = await axios.get(`${store.baseUrl}/api/trips/${this.tripId}/stops`);
      this.localStops = response.data.data; 
      console.log("Fetched Stops:", this.localStops);
    },
    async addExpense() {
      
      if (!this.tripId) {
        alert("Please create the trip first.");
        return;
      }

      try {
        const expenseData = [{
          amount: this.newExpense.amount,
          description: this.newExpense.description,
          category: this.newExpense.category,
          tripId: this.tripId,
          stopId: this.newExpense.stopId,
        }];

        const response = await axios.post(`${store.baseUrl}/api/trips/${this.tripId}/expenses`, expenseData, {
          headers: {
            "Content-Type": "application/json", 
          },
        });

        if (response.status === 201 || response.status === 200) {
          console.log("Expense added successfully", response.data);
          this.expenses.push(...response.data.data); 
          this.newExpense = { amount: "", description: "", category: "", stopId: null }; 
        }
      } catch (error) {
        console.error("Error adding expense:", error);
        alert("An error occurred while adding the expense. Please try again.");
      }
    },
  },
};
</script>


<template>
  <div>
    <h3>Add Expenses</h3>
    <form @submit.prevent="addExpense">
      <div class="row mb-2">
        <div class="col-md-3">
          <input type="number" v-model="newExpense.amount" placeholder="Amount" class="form-control" min="0.01"
            step="0.01" required>
        </div>
        <div class="col-md-3">
          <input type="text" v-model="newExpense.description" placeholder="Description" class="form-control">
        </div>
        <div class="col-md-3">
          <select v-model="newExpense.category" class="form-select" required>
            <option v-for="category in expenseCategories" :key="category" :value="category">{{ category }}</option>
          </select>
        </div>
        <div class="col-md-3">
          <select v-model="newExpense.stopId" class="form-select">
            <option value="" selected>Select Stop (Optional)</option>
            <option v-for="stop in localStops" :key="stop.id" :value="stop.id">{{ stop.title }}</option>
          </select>
        </div>
        <div class="col-md-12 mt-2">
          <button type="submit" class="btn btn-secondary">Add Expense</button>
        </div>
      </div>
    </form>

    <div v-if="expenses.length > 0" class="mb-3">
      <h4>Added Expenses</h4>
      <ul class="list-group">
        <li class="list-group-item" v-for="(expense, index) in expenses" :key="index">
          {{ expense.category }} - {{ expense.amount }} - {{ expense.description }}
          <span v-if="expense.stopId"> (Stop: {{ localStops.find(stop => stop.id === expense.stopId)?.title }})</span>
        </li>
      </ul>
    </div>
  </div>
</template>













<style lang="scss">
</style>