<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';


export default{
  data(){
    return{};

  },
  components:{
    AppHeader,
    AppFooter,
   
  
  }

}

</script>

<template>
  <AppHeader/>
  <main class="container my-4">
    <router-view></router-view>
    
  </main>
  <AppFooter/>
  
  
</template>

<style lang="scss">
@use './styles/general.scss' as *;
@import '@fortawesome/fontawesome-free/css/all.css';

</style>
