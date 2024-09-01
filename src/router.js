import { createRouter, createWebHistory} from "vue-router";
import DashboardPage from "./Pages/DashboardPage.vue";
import TripsPage from "./Pages/TripsPage.vue";
import CreateTripPage from "./Pages/CreateTripPage.vue";
import TripsListPage from "./Pages/TripsListPage.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
    {
        path: "/",
        name: "dashboard",
        component: DashboardPage,
    },
    {
        path:"/trip/:id",
        name: "trip-page",
        component: TripsPage,

    },
    {
        path:"/create-trip",
        name: "create-trip",
        component: CreateTripPage,
    },
    {
        
    }
    ],
    
});

export { router };