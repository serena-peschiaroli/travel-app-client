<script>
import axios from "axios";
import { store } from "../store";
import { DateTime } from "luxon"; 

export default {
  props: ["tripId"],
  data() {
    return {
      newStop: {
        title: "",
        location: "",
        description: "",
        dateTime: "", 
        photos: [],
      },
      dateInput: "", 
      timeInput: "",
      stops: [],
    };
  },
  methods: {
    async addStop() {
      if (!this.tripId) {
        alert("Please create the trip first.");
        return;
      }

      try {
 
        const combinedDateTime = DateTime.fromISO(`${this.dateInput}T${this.timeInput}`).toISO();

        
        this.newStop.dateTime = combinedDateTime;

        
        const formData = new FormData();
        formData.append(
          "stop",
          new Blob(
            [
              JSON.stringify({
                title: this.newStop.title,
                location: this.newStop.location,
                description: this.newStop.description,
                dateTime: this.newStop.dateTime, 
              }),
            ],
            { type: "application/json" }
          )
        );

       
        this.newStop.photos.forEach((file) => {
          formData.append("photos", file);
        });

        
        const response = await axios.post(`${store.baseUrl}/api/trips/${this.tripId}/stops`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 201 || response.status === 200) {
          console.log("Stop added successfully", response.data);
          const createdStop = response.data.data;
          const createdStopId = response.data.data.id;
          console.log("Created stop id : ", createdStopId);
          this.stops.push(createdStop);
          this.$emit("stopCreated", createdStop); 
          this.$emit("stopsUpdated", this.stops)
          this.resetNewStop();
          
        }
      } catch (error) {
        console.error("Error adding stop:", error);
        alert("An error occurred while adding the stop. Please try again.");
      }
    },
    handleFileChange(event) {
      this.newStop.photos = Array.from(event.target.files); 
    },
    resetNewStop() {
      this.newStop = { title: "", location: "", description: "", dateTime: "", photos: [] }; 
      this.dateInput = ""; 
      this.timeInput = ""; 
    },
  },
};
</script>




<template>
  <div>
    <h3>Add Stops</h3>
    <form @submit.prevent="addStop">
      <div class="row mb-2">
        <div class="col-md-3">
          <input type="text" v-model="newStop.title" placeholder="Stop Title" class="form-control" required />
        </div>
        <div class="col-md-3">
          <input type="text" v-model="newStop.location" placeholder="Location" class="form-control" required />
        </div>
        <div class="col-md-3">
          <input type="text" v-model="newStop.description" placeholder="Description" class="form-control" />
        </div>
        <div class="col-md-3">
 
          <input type="date" v-model="dateInput" class="form-control" placeholder="Select Date" required />
        </div>
        <div class="col-md-3">
   
          <input type="time" v-model="timeInput" class="form-control" placeholder="Select Time" required />
        </div>
        <div class="col-md-3">
          <input type="file" @change="handleFileChange" class="form-control" multiple />
        </div>
        <div class="col-md-12 mt-2">
          <button type="submit" class="btn btn-secondary">Add Stop</button>
        </div>
      </div>
    </form>

    <div v-if="stops.length > 0" class="mb-3">
      <h4>Added Stops</h4>
      <ul class="list-group">
        <li class="list-group-item" v-for="(stop, index) in stops" :key="index">
          {{ stop.title }} - {{ stop.location }} - {{ stop.dateTime }} - {{ stop.description }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss"></style>


