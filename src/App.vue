<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import DashboardPage from './Pages/DashboardPage.vue';

export default{
  data(){
    return{};

  },
  components:{
    AppHeader,
    AppFooter,
    DashboardPage
  
  }

}

</script>

<template>
  <AppHeader/>
  <main class="container my-4">
    <DashboardPage/>
  </main>
  <AppFooter/>
  
  
</template>

<style lang="scss">
@use './styles/general.scss' as *;
@import '@fortawesome/fontawesome-free/css/all.css';

</style>
