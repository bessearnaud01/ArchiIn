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
          <h6>Complêter les informations</h6>
        </v-btn>
      </template>
      <v-card>
        <v-card-title style="background-color: #E0115F;color: aliceblue;">
          <span class="text-h5">Profile de l'entreprise</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col 
                cols="12"
                sm="12"
                md="12"
              
                 >
               
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                 <v-file-input label="Photo:" v-model="photo"  type="file" />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              > 

              <!---On ne met rien ici-->
               
              </v-col>
               <v-col cols="12"
                    sm="6"
                    md="6"
                >

               <v-text-field
                  label="Nom:"
                  hint="Entrer le nom de l'utilisateur"
                  v-model="nom"
                  type="text"
                  required
                ></v-text-field>
               </v-col>
                <v-col cols="12"
                    sm="6"
                    md="6"
                >

               <v-text-field
                  label="Prénom:"
                  hint="Entre le nom de la rue"
                  v-model="prenom"
                  type="text"
                  required
                ></v-text-field>
               </v-col>

               <v-col cols="12"
               sm="4"
               md="4"
               >
                <v-text-field
                  label="date de créaction:"
                  hint="Mettez la date de créaction"
                  type="date"
                  v-model="date_naissance"
                  required
                ></v-text-field>
              </v-col>
               <v-col cols="12"
               sm="4"
               md="4"
               >
                <v-text-field
                  label="Numéro postal :"
                  hint="Mettez de le numéro postal"
                  type="number"
                  v-model="npa"
                  required
                ></v-text-field>
              </v-col>
             <v-col cols="12"
               sm="4"
               md="4"
               >
               <v-text-field
                  label="Rue:"
                  hint="Entre le nom de la rue"
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
                  label="Entreprise"
                   v-model="entreprise"
                  hint="Mettez de l'entreprise"
                ></v-text-field>
              </v-col>
                <v-col cols="12"
                    sm="4"
                    md="4"
                >

               <v-text-field
                  label="Ville:"
                  hint="Entre le nom de la rue"
                  v-model="ville"
                  type="text"
                  required
                ></v-text-field>
               </v-col>
                <v-col cols="12"
                    sm="4"
                    md="4"
                >
               <v-text-field
                  label="Numéro téléphone:"
                  hint="Entre le numéro de téléphone"
                  v-model="phone"
                  type="text"
                  required
                ></v-text-field>
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
             @click="imprimer"
          >
            Imprimer
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="updateUser"
          >
            Complêter les informations
          </v-btn>
        </v-card-actions>
      </v-card>
     </v-dialog>
    </v-row>

   </template>

 <script>

export default {
 //Elle est un composant qui va recupere la classe d'adresse et la valeur de la ville 
    name: 'UpdateUser',

    data: () => ({
        dialog: false,
        user: null,
        npa:'',
        nom:'',
        rue:'',
        ville:'',
        prenom:'',
        date_naissance:'',
        entreprise:'',
        phone:'',
        address:null,
        photo:[],
        loading: false,
    }),

    computed: {

        image(){
            return this.user ?`http://localhost:8181/avatar/${this.user.avatar}`:null
        },
         user_id(){ //Elle permet de recuperer mon id de user
            return this.$store.getters["auth/userId"]; //Elle me sert de voir si je suis connecte et de verifier si l'id du user existe
           
      
      }

     
    },

    methods: {
       
         imprimer(){
            window.open( this.user ?`http://localhost:8181/imprimer/user/${this.user.id}`:null,"_blank")
        },
        navigation(route) {
                if (this.$route.name!== route) {
                    this.$router.push({ name : route })
                       
                        this.drawer = false   
                }
            },

      updateUser() {
        if(this. user_id>0){
       //   console.log(this.date_naissance)
        this.$store.dispatch('users/update', {  //users est definir dans le main.js et update dans le fichier store/users.js
            id: this.user_id,
            nom:this.nom,
            prenom:this.prenom,
            entreprise:this.entreprise,
            date_naissance:this.date_naissance,
            npa:this.npa,
            photo:this.photo,
            ville:this.ville,
            rue:this.rue,
            phone:this.phone

            //address: this.address,   //elle represente l'address et dans ApiController la function updateUserAddress et $addressId = $request->request->get('address');  
            
        })
        .then(()=> {// je veux mettre quelque chose dans le then

          // console.log("Les données ont été modifier")
           return true;
          
        })
        .catch((error) => {
            // console.log(error)
             throw error;
        })
       }
    }
    },

    mounted() {
        
        this.$store.dispatch('users/loadOne', { //Pn charge un seule user
            id: this.user_id
        })
        .then(user => {
           this.user = user
           this.nom = user.nom
           this.prenom = user.prenom
           this.ville = user.address.ville   //address le retour du server par rapport à son id et address il est dans entité user à la fin
           this.npa = user.address.npa
           this.rue = user.address.rue
           this.date_naissance = user.address.date_naissance
           this.photo = user.photo
           this.entreprise = user.address.entreprise  
           this.phone = user.address.phone
           
         
        })
        .catch((error) => {
            console.log(error);
            
        })
    }
}
</script>
