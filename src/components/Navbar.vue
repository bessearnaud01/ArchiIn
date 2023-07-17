
<template>
  <div class="home">
    <v-app-bar
       red
      
    >
      <v-app-bar-nav-icon @click="drawer = true" ></v-app-bar-nav-icon>
      <v-toolbar-title style=" color:red;">Archi-In</v-toolbar-title>
    </v-app-bar>
     <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary  
      color="white"
      color-text="black"
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
         <v-layout column align-center v-if="getIdUser">
               <v-flex class="mt-5"> 
                    <v-img  :src="photo"   class="img"/>
                    <p class="white--text subheading mt-1 text-center">Usernamebbb</p>
               </v-flex>
               <v-flex class="mt-1 mb-4">
                <template>
                 <v-row align="center" justify="center">
                      <Address v-if="getIdUser"  />
                   <div class="mx-2"></div>
                        </v-row>
                 </template>
               </v-flex>
           </v-layout>
          <v-list-item link href="http://localhost:8082/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home <!--{{ getIdUser }}--></v-list-item-title>
          </v-list-item>
           <v-list-item link @click="navigation('login')"  v-if="!getIdUser"  >
            <v-list-item-icon>
              <v-icon>mdi-format-horizontal-align-right</v-icon>
            </v-list-item-icon>
            <v-list-item-title>connexion</v-list-item-title>
          </v-list-item>

          <v-list-item link @click="navigation('tableau')"   v-if="getIdUser">
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Tableau de bord</v-list-item-title>
          </v-list-item>
          
          <v-list-item link @click="navigation('TableauDeBordCommercial')"   v-if="getIdUser">
            <v-list-item-icon>
              <v-icon>mdi-home-city-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Commercial</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="navigation('TableauDeBordCommercial')"   v-if="getIdUser">
            <v-list-item-icon>
              <v-icon>mdi-home-city-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Résidence</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="navigation('TableauDeBordCommercial')"   v-if="getIdUser">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Agence</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
        
      </v-list>
        <!--<div class="pa-2" style=" margin-top: 150px">
          <v-btn block @click="service" style="position absolute; bottom: 4px " >
            text 
          </v-btn>
           <v-btn block @click="Logout" style="position absolute; bottom: 4px " v-if="getIdUser" >
            Logout  {{ getIdUser }}
          </v-btn>
        </div>
     -->

     <template v-slot:append>
        <div class="">
          <v-btn block  @click="Logout" style="position absolute;" v-if="getIdUser" color="red" outlined>
           
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import  Address from '@/views/Address.vue';
//import Profile  from '@/views/Profile.vue';
//import ComponentAddress  from '@/views/ComponentAddress.vue';
export default {
  name: 'Navbar',
   data: () => ({
            drawer: false,
            group: null,
            address:null,
        }),  
  components: {
    Address
  // Address,Profile,//ComponentAddress
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
            }, 
               Logout(){
                console.log(this.getIdUser)
                  this.$store.dispatch('auth/logout')
                   this.$router.push({
                    name: 'login' 
                })
                   .catch( err =>{
                  console.log('erreur', err)

              })

              }  
    
    },
    
   
    computed: {
    
     
         getIdUser(){
            return this.$store.getters["auth/userId"] >0; //Elle me sert de voir si je suis connecte et de verifier si l'id du user existe
           
      
      },
       photo(){
            return this.user ?`http://localhost:8181/avatar/${this.user.address.avatar ||"Vide"}`:null
        },

    
      user(){
         return this.$store.getters["users/getUser"] // store/users.js/getUser

      }
    },
      
      
  
};
</script>
<style>
.img{
    overflow:hidden;
    -webkit-border-radius:50px;
    -moz-border-radius:50px;
    border-radius:50px;
    width:90px;
    height:90px;
}

</style>