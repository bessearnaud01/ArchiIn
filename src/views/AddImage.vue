<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red"
          outlined
          dark
          v-bind="attrs"
          v-on="on"
        >
          <h6>Ajouter les photos du bien</h6>
        </v-btn>
      </template>
      <v-card ref="formulaire">
        <v-card-title  style="background-color: #E0115F;">
          <span class="text-h5" style="color: #ffff;">Ajouter les photos du bien</span>
        </v-card-title>
        <v-card-text>
          <v-container>
             <v-row> 
              <v-col 
                cols="12"
                sm="12"
                md="12"
                >
                <v-file-input
                  label="Photo"
                  hint="Entrer la photo"
                  v-model="images"
                  
                  required
                ></v-file-input>
              </v-col>
            </v-row>
           
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
       <!-- avatar represente la fonction qui recupère l'image et   @click="dialog = false" -->

            <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Fermer
          </v-btn>
         <v-btn
            color="blue darken-1"
            text
            @click="ViderChamps"
          >
          Vider
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="AddImageCommercial"
          >
            Ajouter photo
          </v-btn>
        </v-card-actions>
      </v-card>
     </v-dialog>
    </v-row>
   </template>
 <script>
 
export default {

 //Elle est un composant qui va recupere la classe d'adresse et la valeur de la ville 
    name: 'AddCommercial',
    
    data: () => ({         
        dialog: false,
        user: null,
        images:null,
        id:"",
        

       
    }),

    props:{
      id_commerce:{type:Number,default:0} // id_commerce vient du fichier addCommerce
    },

    computed: {

         user_id(){ //Elle permet de recuperer mon id de user
           return this.$store.getters["auth/userId"]; //Elle me sert de voir si je suis connecte et de verifier si l'id du user existe 
      },

    },

    methods: {
       
        navigation(route) {
                if (this.$route.name!== route) {
                    this.$router.push({ name : route })
                        this.drawer = false   
                }
            },

     
     
      AddImageCommercial() {
        if(this.user_id>0 && this.id_commerce>0){
        this.$store.dispatch('commercial/addImages', {  //users est definir dans le main.js et update dans le fichier store/users.js
            id_commerce:this.id_commerce,
            images:this.images
        })
        
        .catch((error) => {
             //console.log(error);
              throw error
        })
       }
    },
     ViderChamps () {
        this.images='',
        this.$refs.formulaire.reset()
        
      },
    
    },

}
</script>
