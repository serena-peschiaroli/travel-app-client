<script>
import Chart from 'chart.js/auto';
import { store } from '../store';
import axios from 'axios';
import { DateTime } from 'luxon';
import AppTripList from '../components/AppTripList.vue';


export default {
    components:{
        AppTripList

    },
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
      sortedCategories: [],  
      sortedTripsByRating: [],  
      mostRatedTrip: null,  
      leastRatedTrip: null,  
      activeTrip: null,  
      expenseChart: null, 
    };
  },
  created() {
    this.fetchTrips();
  },
  methods: {
    fetchTrips() {
        console.log("fetching...");
        axios
        .get(`${this.store.baseUrl}/api/trips`)
        .then((resp) => {
        console.log(resp);
        this.trips = resp.data.data;
        console.log("Trips fetched:", this.trips);

        this.trips.forEach(trip => {
                trip.expenseSummary = this.processExpenseCategoriesPerTrip(trip);
            });

        
        console.log("Calling processExpensesByCategory...");
        this.trips.forEach(trip => {
          trip.totalExpenses = this.calculateTotalExpensesForTrip(trip);
          trip.numberOfStops = trip.stops ? trip.stops.length : 0; 
        });

        this.sortTripsByStartDate();  
        try {
            this.processExpensesByCategory();  
        } catch (error) {
            console.error("Error in processExpensesByCategory:", error);
        }

    
        console.log("Calling calculateTripRatings...");
        try {
            this.calculateTripRatings();  
        } catch (error) {
            console.error("Error in calculateTripRatings:", error);
        }

        
        console.log("Calling checkActiveTrip...");
        try {
            this.checkActiveTrip();  
        } catch (error) {
            console.error("Error in checkActiveTrip:", error);
        }

        
        console.log("debug log", this.trips[0].stops);
        })
        .catch((error) => {
        this.error = error;
        console.error("Error fetching trips:", error);
        });
    },
    sortTripsByStartDate() {
      this.trips.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    },
    calculateTotalExpensesForTrip(trip) {
    
    let totalExpenses = 0;

    
    trip.expenses.forEach(expense => {
      totalExpenses += expense.amount;  
    });

    return totalExpenses;  
  },

    processExpenseCategoriesPerTrip(trip) {
       
        const categoryTotals = {
            FLIGHTS: 0,
            HOTELS: 0,
            MEALS: 0,
            TRANSPORT: 0,
            MISCELLANEOUS: 0,
        };

        
        trip.expenses.forEach(expense => {
            if (categoryTotals.hasOwnProperty(expense.category)) {
                categoryTotals[expense.category] += expense.amount;
            }
        });

        return categoryTotals;  
    },


    processExpensesByCategory() {
    try {
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

    } catch (error) {
        console.error("Error in processExpensesByCategory:", error);
    }
    },
     calculateExpensesByCategory(trip) {
   
      const expenseCategories = {
        FLIGHTS: 0,
        HOTELS: 0,
        MEALS: 0,
        TRANSPORT: 0,
        MISCELLANEOUS: 0,
      };

 
      trip.expenses.forEach((expense) => {
        if (expenseCategories.hasOwnProperty(expense.category)) {
          expenseCategories[expense.category] += expense.amount; 
        }
      });

      console.log(`Expense categories for Trip ID ${trip.id}:`, expenseCategories);
      return expenseCategories; 
    },

    calculateTripRatings() {
    try {
        this.trips.forEach((trip) => {
        if (trip.stops && trip.stops.length > 0) {  
            const totalRating = trip.stops.reduce((sum, stop) => {
            if (stop.rating !== undefined && stop.rating !== null) {  
                return sum + stop.rating;
            }
            return sum;
            }, 0);

            
            trip.averageRating = totalRating / trip.stops.length;
            console.log(`Trip ID: ${trip.id}, Average rating:`, trip.averageRating);  
        } else {
            trip.averageRating = 0;  
        }
        });

        
        this.sortedTripsByRating = [...this.trips].sort((a, b) => b.averageRating - a.averageRating);

        
        this.mostRatedTrip = this.sortedTripsByRating[0] || null;  
        this.leastRatedTrip = this.sortedTripsByRating[this.sortedTripsByRating.length - 1] || null;  

        console.log("Most Rated Trip:", this.mostRatedTrip);
        console.log("Least Rated Trip:", this.leastRatedTrip);
    } catch (error) {
        console.error("Error in calculateTripRatings:", error);
    }
    },

    checkActiveTrip() {
    try {
        const now = DateTime.now().toUTC();  
        console.log(now.toISO);

        
        this.activeTrip = this.trips.find(trip => {
        const startDate = DateTime.fromISO(trip.startDate).toUTC().startOf('day');
        const endDate = DateTime.fromISO(trip.endDate).toUTC().endOf('day');

        `Checking trip ID: ${trip.id}, Start (UTC): ${startDate.toISO()}, End (UTC): ${endDate.toISO()}`

        return now >= startDate && now <= endDate;  
        });

        

        console.log("Active Trip:", this.activeTrip);
    } catch (error) {
        console.error("Error in checkActiveTrip:", error);
    }
    },
     viewTrip(tripId) {
      
      this.$router.push({ name: "trip-page", params: { id: tripId } });
    },
    editTrip(tripId) {
      
      this.$router.push({ name: "edit-trip", params: { id: tripId } });
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
          <router-link class="btn btn-primary" :to="{ name: 'create-trip' }">
            Add New Trip
          </router-link>
        </div>
        <div class="col">
          <button type="button" class="btn btn-secondary">Manage Expenses</button>
        </div>
      </div>
    </div>

    <div class="container">
      
        <div class="col">
          <h3>Your trips</h3>
          <AppTripList :trips="trips" @view-trip="viewTrip" @edit-trip="editTrip" />
         
        </div>
    </div>
  </section>
</template>

<style lang="scss">

</style>
