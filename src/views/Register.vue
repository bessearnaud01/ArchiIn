<template>
     <v-container>
       <v-row>
         <v-col
        cols="12"
        md="12"
        lg="6"
         >
          <v-card>
            <h2 class="text-center">Inscription</h2>
           <p class="text-center">Tu as déjà un compte ? <span class="lien"  @click="switchToLogin()">Connectez-vous </span></p>
            <v-snackbar
              v-model="snackbar"
              absolute
              top
              right
              color="success"
            >
              <span>Inscription réussie!</span>
              <v-icon dark>
                mdi-checkbox-marked-circle
              </v-icon>
            </v-snackbar>
            <v-form
              ref="form"
              @submit.prevent="submit"
            >
              <v-container fluid>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="form.nom"
                      :rules="rules.name"
                      color="purple darken-2"
                      label="Nom"
                      required
                      solo
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="form.prenom"
                      :rules="rules.name"
                      color="blue darken-2"
                      label="Prénom"
                      required
                      solo
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12"
                        lg="12">
                     <v-text-field
                      type="email"
                      v-model="form.mail"
                      :rules="rules.name"
                      color="blue darken-2"
                      label="Mail"
                      required
                      solo
                    ></v-text-field>
                   
                  </v-col>
                   <v-col cols="12"
                        lg="12">
                     <v-text-field
                      type="password"
                      v-model="form.motdepasse"
                      :rules="rules.passwordRules"
                      color="blue darken-2"
                      label="Mot de passe"
                      required
                      solo
                    ></v-text-field>
                  </v-col>
                   <v-col cols="12"
                          lg="12">
                     <v-text-field
                      type="password"
                      v-model="form.confirmation_motdepasse"
                      :rules="rules.confirmPasswordRules"
                      color="blue darken-2"
                      label="Confirmation de mot de passe"
                      required
                      solo
                    ></v-text-field>
                   
                  </v-col>
                
                
                
                  <v-col cols="12">
                    <v-checkbox
                      v-model="form.terms"
                      color="green"
                    >
                      <template v-slot:label>
                        <div @click.stop="">
                          Acceptez-vous
                          <a
                            href="#"
                            @click.prevent="terms = true"
                          >les termes</a>
                          et
                          <a
                            href="#"
                            @click.prevent="conditions = true"
                          >les conditions?</a>
                        </div>
                      </template>
                    </v-checkbox>
                  </v-col>
                </v-row>
              </v-container>
              <v-card-actions>
                <v-btn
                  text
                  @click="resetForm"
                >
                  Cancel
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  :disabled="!formIsValid"
                  text
                  color="primary"
                  type="submit"
                >
                  Register
                </v-btn>
              </v-card-actions>
            </v-form>
            <v-dialog
              v-model="terms"
              width="70%"
            >
              <v-card>
                <v-card-title class="text-h6">
                  Termes et les conditions
                </v-card-title>
                <v-card-text
                  v-for="n in 5"
                  :key="n"
                >
                  {{ content }}
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="purple"
                    @click="terms = false"
                  >
                    Ok
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog
              v-model="conditions"
              width="70%"
            >
              <v-card>
                <v-card-title class="text-h6">
                  Conditions
                </v-card-title>
                <v-card-text
                  v-for="n in 5"
                  :key="n"
                >
                  {{ content }}
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="purple"
                    @click="conditions = false"
                  >
                    Ok
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card>
           </v-col>
        </v-row> 
   </v-container>
  
  </template>
<script>

  export default {
    data () {
      const defaultForm = Object.freeze({
        prenom: '',
        nom: '',
        mail:'',
        motdepasse:'',
        confirmation_motdepasse:'',
        terms: false,
       
      })

      return {
        form: Object.assign({}, defaultForm),
        rules: {
        passwordRules: [
        (value) => !!value || 'Veuillez saisir le mot de passe.',
        (value) => (value && value.length >= 6) || 'minimum 6 caractères',
      ],
      confirmPasswordRules: [
        (value) => !!value || 'tapez confirmer le mot de passe',
        (value) =>
          value === this.form.motdepasse || 'La confirmation du mot de passe ne correspond pas.',
      ],
        
          name: [val => (val || '').length > 0 || 'Ce champ est obligatoire'],
        },
        conditions: false,
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.',
        terms: false,
        snackbar: false,
        defaultForm,
      }
    },

    computed: {
      formIsValid () {
        return (
          this.form.nom &&
          this.form.prenom &&
          this.form.mail &&
          this.form.motdepasse &&
          this.form.confirmation_motdepasse  &&
          this.form.terms
        )
      },
    },

    methods: {
      resetForm () {
       // console.log("initialiser")
        this.form = Object.assign({}, this.defaultForm)
        this.$refs.form.reset()
      
      },
      submit () {
    
        this.$store.dispatch('users/add',{ //users represente le store dans main.js et la fonction add est dans le store/users.js et add est du users.js
        nom: this.form.nom, 
        prenom: this.form.prenom,
        mail:this.form.mail,
        motdepasse:this.form.motdepasse
        
         }) .then(()=> {
                        
           this.snackbar = true
           this.resetForm()
              
          })
             .catch((err) => {    
          // console.log(err)
           throw err
       })
    
      },
       switchToLogin() {
            this.$router.push({
                name: 'login' 

            })
        }

    },
    
  }
</script>



<style>
 .lien{
     text-decoration: underline;
     color:#0080ff!important;
     cursor:pointer !important;
     
     
     
     
    
 }
</style>