<template>
  <div color="basil">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold text-h2 basil--text">
        ARCHI-IN
      </h1>
    </v-card-title>
     <div class="container">
      <div class="row">
       <div class=" col-12 sm-12 md-12" style="margin-top: 100px;  width:600px;height: 200px; background-color:red;">
         <h1 class="text-center" style="margin-top: 50px; color:white;">Votre projet commence ici </h1>
      
       </div>
       </div>
     </div>
      <Footer  style="margin-top: 300px;"/>
    </div>
    
</template>
<script>
import Footer from '../components/Footer.vue';

   export default {
    data() {
        return {
            tab: null,
        };
    },
    components:{
      Footer
    },
    methods: {
        /* service(){
            console.log(this.user)  //on veut tester si le user existe ou pas
       }*/
        navigation(route) {
            if (this.$route.name !== route) {
                this.$router.push({ name: route });
                this.drawer = false;
            }
        }
    },
  
}

</script>

<style>
/* Helper classes */
.basil {
  background-color: #FFFBE6 !important;
}
.basil--text {
  color: red !important;
}
</style>