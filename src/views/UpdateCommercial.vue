<template>
  <v-row justify="center"> 
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
          <v-icon
          small
           class="mr-6"
          v-bind="attrs"
          v-on="on"
        >
          mdi-pencil
        </v-icon>
      </template>
      <v-card
       ref="formulaire"
       >
        <v-card-title  style="background-color: #E0115F;">
          <span class="text-h5" style="color: #ffff;">Modifier  le bien commercial</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col 
                cols="12"
                sm="6"
                md="6"
                
                >
               <v-radio-group
                v-model="status"
                row
              >
                <v-radio
                  label="Achete "
                  value="achete"
                ></v-radio>
                <v-radio
                  label="Alouer"
                  value="louer"
                ></v-radio>
              </v-radio-group>
                </v-col>
                 <v-col 
                cols="12"
                sm="6"
                md="6"
                >
               <v-select
                  v-model="type"
                  :items="items"
                  label="Type de biens"
                  data-vv-name="select"
                  required
                ></v-select>
                  
                </v-col>
             </v-row>
             <v-row>
               
              <v-col 
                cols="12"
                sm="6"
                md="6"
                >
                <v-text-field
                  label="Le prix:"
                  hint="Entrer le prix"
                  v-model="prix"
                  type="number"
                  required
                ></v-text-field>
              </v-col>
               <v-col 
                cols="12"
                sm="6"
                md="6"
                >
                <v-text-field
                  label="Le numéro postal:"
                  hint="Entrer le numéro postal"
                  v-model="npa"
                  type="number"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col 
                cols="12"
                sm="4"
                md="4"
                >
                <v-text-field
                  label="La rue:"
                  hint="Entrer la rue"
                  v-model="rue"
                  type="text"
                  required
                ></v-text-field>
              </v-col>
              <v-col 
                cols="12"
                sm="4"
                md="4"
                >
                <v-text-field
                  label="La ville:"
                  hint="Entrer la ville"
                  v-model="ville"
                  type="text"
                  required
                ></v-text-field>
              </v-col>
               <v-col 
                cols="12"
                sm="4"
                md="4"
                >
                <v-text-field
                  label="Le canton:"
                  hint="Entrer le canton"
                  v-model="canton"
                  type="text"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col 
                cols="12"
                sm="12"
                md="12"
                >

               <AddImage :id_commerce="id_commercial"/> <!-- on met l'id dans le composant addImage-->
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
          
          >
            Modifier le bien
          </v-btn>
        </v-card-actions>
      </v-card>
     </v-dialog>
    </v-row>

   </template>

 <script>
 
import AddImage from '@/views/AddImage.vue';

export default {
 //Elle est un composant qui va recupere la classe d'adresse et la valeur de la ville 
    name: 'AddCommercial',
    
    data: () => ({         
        dialog: false,
        id_commercial:0,
        npa:'',
        rue:'',
        ville:'',
        status:'',
        type:'',
        canton:'',
        prix:'',
        items: [
        'Commercial',
        'Bureau',
        'Hôtellerie',
        'Immeuble',
      ]
  
    }),
components: {
 AddImage
    
},

    computed: {

         user_id(){ //Elle permet de recuperer mon id de user
            return this.$store.getters["auth/userId"]; //Elle me sert de voir si je suis connecte et de verifier si l'id du user existe
      },
       getCommercial_id() {
            return this.$route.params ? this.$route.params.id : 0 
        }
    },

    methods: {
       
        navigation(route) {
                if (this.$route.name!== route) {
                    this.$router.push({ name : route })
                        this.drawer = false   
                }
            },

      UpdateCommercial() {
       if(this.getCommercial_id>0){
       //   console.log(this.date_naissance)
            this.$store.dispatch('commercial/update', {  //users est definir dans le main.js et update dans le fichier store/users.js
            id: this.getCommercial_id,
            status:this.status,
            type:this.type,
            prix:this.prix,
            canton:this.canton,
            npa:this.npa,
            ville:this.ville,
            rue:this.rue,

          })
          .then(id => {
                this.id_commercial=id    
        })
        .catch((error) => {
            // console.log(error);
              throw error
       
        })
       }
    },
    
    mounted() {
        
        this.$store.dispatch('commercial/loadOne', { //Pn charge un seule commercial
            id: this.commercial_id
        })
        .then(commercial => {
           this.commercial = commercial
           this.status = commercial.status
           this.type = commercial.type
           this.prix = commercial.prix  //address le retour du server par rapport à son id et address il est dans entité commercial à la fin
           this.npa = commercial.npa
           this.rue = commercial.rue
           this.canton = commercial.canton
           this.ville = commercial.ville
           
         
        })
        .catch((error) => {
            console.log(error);
            
        })
    }
    },

}
</script>
  