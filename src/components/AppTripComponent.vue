

<script>
import axios from "axios";
import { store } from "../store";

export default {
  data() {
    return {
      trip: {
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        categories: [],
      },
      tripCategories: [],
    };
  },
  created() {
    this.fetchCategories(); 
  },
  methods: {
    async createTrip() {
      try {
        const tripData = {
          title: this.trip.title,
          description: this.trip.description,
          startDate: this.trip.startDate,
          endDate: this.trip.endDate,
          categories: this.trip.categories.map((categoryId) => {
            const category = this.tripCategories.find((cat) => cat.id === categoryId);
            return {
              id: category.id,
              name: category.name,
              color: category.color,
            };
          }),
        };

        const response = await axios.post(`${store.baseUrl}/api/trips`, tripData);
        if (response.status === 201 || response.status === 200) {
          console.log("Trip created successfully", response.data);
          this.$emit("tripCreated", response.data.data.id); 
        }
      } catch (error) {
        console.error("Error creating trip:", error);
        alert("An error occurred while creating the trip. Please try again.");
      }
    },
    fetchCategories() {
      axios
        .get(`${store.baseUrl}/api/categories`)
        .then((resp) => {
          this.tripCategories = resp.data.data;
          console.log("Categories fetched:", this.tripCategories);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
          alert("An error occurred while fetching categories. Please try again.");
        });
    },
  },
};
</script>

<template>
  <form @submit.prevent="createTrip">
    <div class="mb-3">
      <label for="title" class="form-label">Title:</label>
      <input v-model="trip.title" id="title" class="form-control" placeholder="Trip Title" required />
    </div>

    <div class="mb-3">
      <label for="description" class="form-label">Description:</label>
      <textarea v-model="trip.description" id="description" class="form-control" placeholder="Description"></textarea>
    </div>

    <div class="row mb-3">
      <div class="col-md-6">
        <label for="startDate" class="form-label">Start Date:</label>
        <input type="date" v-model="trip.startDate" id="startDate" class="form-control" required />
      </div>
      <div class="col-md-6">
        <label for="endDate" class="form-label">End Date:</label>
        <input type="date" v-model="trip.endDate" id="endDate" class="form-control" required />
      </div>
    </div>

    <!-- Category Selection -->
    <div class="mb-3">
      <label class="form-label">Select Categories:</label>
      <div class="p-3 col" v-for="category in tripCategories" :key="'category-' + category.id">
        <input
          type="checkbox"
          :id="'category-' + category.id"
          :value="category.id"
          v-model="trip.categories"
        />
        <label class="ms-2" :for="'category-' + category.id">{{ category.name }}</label>
      </div>
    </div>

    <button type="submit" class="btn btn-primary">Create Trip</button>
  </form>
</template>

<style lang="scss">

</style>

