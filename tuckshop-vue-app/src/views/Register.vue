<template>
    <v-app>
        <div class="justify-center d-flex mt-4">
            <v-card elevation="2" outlined >
              <h4>Register</h4>
                <v-form ref="form" lazy-validation class="pa-4 pt-2 ">

                             <v-text-field
                    label="Username"
                    required
                    v-model= "form.username"
                    ></v-text-field>

                    <v-text-field
                    label="First Name"
                    required
                    v-model= "form.firstname"
                    ></v-text-field>

                    <v-text-field
                    label="Last Name"
                    required
                    v-model="form.lastname"
                    ></v-text-field>

                    <v-text-field
                    label="NCU Email"
                    required
                    v-model="form.email"
                    ></v-text-field>

                    <v-text-field
                    label="Phone Number"
                    required
                    v-model="form.phonenumber"
                    ></v-text-field>

                    <v-text-field
                        :type="show1 ? 'password' : 'text' "
                        :append-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
                        @click:append="show1 = !show1"
                     label="Password"
                     v-model="form.password"
                     required
                    ></v-text-field>

                    <v-text-field

                        :type="show2 ? 'password' : 'text' "
                        :append-icon="show2 ? 'mdi-eye-off' : 'mdi-eye'"
                        @click:append="show2 = !show2"
                        label="Verify Password"
                        v-model="form.check_password"
                     required
                    ></v-text-field>

                    <v-btn
                    color="success"
                    class="mr-4"
                    @click="registerUser()">
                        Register
                    </v-btn>


                </v-form>
            </v-card>
        </div>
    </v-app>
</template>



<script>

import swal from 'sweetalert'
export default
{
    data()
    {
      return{

        show1: true,
        show2: true,
        form: {

          type: "personal",
        },

        password: 'Password',

      }
    },
  components:{

  },
  

  methods: {

      async registerUser(){

        let request = {
              username: this.form.username,
              firstname: this.form.firstname,
              lastname: this.form.lastname,
              password: this.form.password,
              email: this.form.email,
              type: this.form.type,

        }

        await this.$axios.post(this.$routeApi + "register" ,  request ).then((resp)=>{

          if ( resp){
              swal("Sucessfully registered", "", "success")
              this.$router.push({name: "Login"})
          console.log("This is the repsonse", resp)
          }
            console("resp", resp)

        })
      }
  }

};

</script>


<style scoped>

</style>