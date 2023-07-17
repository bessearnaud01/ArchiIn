<template>

  <div color="basil">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold text-h2 basil--text">
        ARCHI-IN
      </h1>
    </v-card-title>

    <v-tabs
      v-model="tab"
      background-color="transparent"
      color="basil"
      grow
    >
       <v-tab link @click="navigation('Home')" >Accueil</v-tab>
       <v-tab >Résidence</v-tab>
       <v-tab link @click="navigation('Commmercial')">Commercial</v-tab>
       <v-tab>Agence</v-tab>
       <v-tab @click="navigation('login')">connexion</v-tab>
       <v-tab>contact</v-tab>
    </v-tabs>

     <div class="container">
      <div class="row">
       <v-col  cols="12" 
               sm="2"   
               md="2" 
         >
        <v-btn-toggle
          v-model="toggle_exclusive"
          mandatory
          class=" white--text"
        >
          <v-btn color="red">
            Louer
          </v-btn>
          <v-btn color="red" >
           Acheter
          </v-btn>
        </v-btn-toggle>
       </v-col>
        <v-col
            cols="12"
            sm="2"
            md="2"
          >
            <v-slider
              v-model="age"
              color="orange"
              label="Age"
              hint="Be honest"
              min="1"
              max="100"
              thumb-label
            ></v-slider>
          </v-col>
       </div>
     </div>
    </div>
  </template>
<script>
   export default {
    data () {
      return {
        tab: null,
        toggle_exclusive: undefined,
        age:null
      }
      
    },
    

     methods: {

      /* service(){
          console.log(this.user)  //on veut tester si le user existe ou pas
     }*/
         navigation(route) {
                if (this.$route.name!== route) {
                    this.$router.push({ name : route })
                       
                        this.drawer = false   
                }
            }
     }

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