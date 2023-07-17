<template>
  
  
     <v-container>
       <v-row>
         <v-col
        cols="12"
        md="12"
        lg="6"


         >    
          <v-card>
            <h2 class="text-center">connexion</h2>
           <p class="text-center">Tu as déjà un compte ? <span class="lien"  @click="switchToRegister()">Créer vôtre compte </span></p>
            <v-snackbar
              v-model="snackbar"
              absolute
              top
              right
              color="red"
              text-color="white"
            >
              <span>connexion réussie!</span>
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
                  
                  <v-col cols="12"  lg="12">
                                
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
                <v-col cols="12"> <v-card-subtitle text-center> Vous avez oublié  ? <span class="lien"  @click="switchToIdentification()">Vôtre mot de passe </span></v-card-subtitle></v-col>
            </v-form>
          </v-card>
           </v-col>
         </v-row>
        
        </v-container>
   
  </template>

 <script>

  export default {
    data () {
      const defaultForm = Object.freeze({
        mail:'',
        motdepasse:'',
       
      })

      return {
        form: Object.assign({}, defaultForm),
        rules: {
        passwordRules: [
        (value) => !!value || 'Veuillez saisir le mot de passe.',
      ],
        
        },
        snackbar: false,
        defaultForm,
      }
    },

    computed: {
      formIsValid () {
        return (
        
          this.form.mail &&
          this.form.motdepasse 
        
        
        )
      }

    },

    methods: {
      resetForm () {
        this.form = Object.assign({}, this.defaultForm)
        this.$refs.form.reset()
      },
      submit () {
        //console.log(this.form.mail)
        //console.log(this.form.motdepasse)
        this.$store.dispatch('auth/login',{    //users represente le store auth dans main.js et la fonction login est dans le store/users.js
        mail:this.form.mail,
        motdepasse:this.form.motdepasse
        
         }) .then(()=> {        
           this.snackbar = true
           this.resetForm()
              this.$router.push({
                    name: 'tableau',
            })
              
          })
             .catch((err) => {
                
           console.log(err)
       })
    
      },
       switchToRegister(){
           this.$router.push({
                name: 'register' 
            })
       },
       switchToIdentification() {
            this.$router.push({
                name: 'identification' 
            })
        }
    },
  }
</script>



<style>
 .lien{
    text-decoration: underline;
    color:royalblue;
     cursor:help
     
     
     
     ;
    
 }
</style>