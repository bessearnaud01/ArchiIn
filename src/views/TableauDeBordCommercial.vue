<template>
     <v-container>

           <v-row>
              <v-col 
                cols="12"
                sm="12"
                md="12"
                >
                <v-card
          
                  class="mx-auto my-12"
                  max-width="900"
                  >
                    <v-card-title>
      
                        <v-text-field
                          v-model="search"
                          append-icon="mdi-magnify"
                          label="Search"
                          single-line
                          hide-details
                        ></v-text-field>
                          <AddCommercial @click="(commercial.id)" />
                      </v-card-title>
                      <v-data-table
                        :headers="headers"
                        :items="biensCommeriaux"
                        :search="search"
                      >
                      
                         <template>
                            <UpdateCommercial class="mt-1" />
                               <v-icon
                                   small
                          
                                >
                                  mdi-delete
                                   </v-icon>
                            </template>
        
                      </v-data-table>
      
                      </v-card>
                    </v-col>
                  </v-row> 
              </v-container>
    </template> 
<script>
import AddCommercial  from '@/views/AddCommercial.vue';
import UpdateCommercial  from '@/views/UpdateCommercial.vue';
  export default {
    components:{
    AddCommercial,
    UpdateCommercial
},
    name: 'TableauDeBordCommercial',
    
    data () {
      return {
        search: '',
  
        headers: [
          {
            text: 'N°',
            align: 'start',
            filterable: false,
            value: 'id',
          },
          { text: 'Status', value: 'status' },
          { text: 'Type', value: 'type' },
          { text: 'Prix(CHF)', value: 'prix' },
          { text: 'Npa', value: 'npa' },
          { text: 'Rue', value: 'rue' },
          { text: 'Ville', value: 'ville' },
          { text: 'Canton', value: 'canton' },
          {text: 'Actions', value: 'actions',width:150}

        ],
      
      }
    },
    methods: {


         navigation(route) {
                if (this.$route.name!== route) {
                    this.$router.push({ name : route })
                       
                        this.drawer = false   
                }
            },
             CommercialDetails(getCommercial_id) {  // Elle permet d'afficher les details de l'utilisateur inscript
            this.$router.push({
                name: ' UpdateCommercial',
                params: {
                    id:getCommercial_id
                }
            })
        }

           
    
    },
    computed: {
        biensCommeriaux() {
            
                   return this.$store.getters["commercial/all"];         
        },
         getCommmercial_id() {
            return this.$route.params ? this.$route.params.id : 0 // elle compare si l'id existe dans la base de données
        }
    },

      mounted() {
       
        this.$store.dispatch('commercial/load')
        .then(() => {
            return true
        })
        .catch((error) => {
            throw error
           
        })
    }

  }
</script>


<style>

  
</style>


