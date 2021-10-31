<template>
  <v-app  >
 <div>
    <div class="justify-center d-flex mt-4">
      <v-card elevation="2" outlined >
        <h4>Login</h4>
      <v-form class="pa-4 pt-2 "
    ref="form"
    v-model="valid"
    lazy-validation
  >
      <v-text-field
        v-model="form.email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

    <v-text-field
      v-model="form.password"
      :rules="nameRules"
      label="Password"
      required
      :type="show ? 'password' : 'text' "
      :append-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
       @click:append="show = !show"
    ></v-text-field>

    <v-checkbox
        label="Remember me."
    ></v-checkbox>


        <v-btn color="success" @click="checkForm">Login</v-btn>


 

  </v-form>
      </v-card>

  </div>
</div>
  </v-app>
</template>


<script>

import swal from 'sweetalert';

  export default {
    data: () => ({
      form:
      {
        name:"",
        password: ""
      },
      valid: true,
      show: true,
      name: '',
      nameRules: [
        v => !!v || 'required',

      ],
      email: '',
      emailRules: [
        v => !!v || 'required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      select: null,

      checkbox: false,
    }),

    methods: {

      checkForm()
      {
        if(this.form.email == "" || this.form.password =="")
        {
            this.$refs.form.validate()
        }else{
          this.validateForm();
        }

      },
      mounted(){
  console.log('App Mounted');
    if (localStorage.getItem('admin')) 
        this.customers = JSON.parse(localStorage.getItem('admin'));
},
      async validateForm () {
          
        await this.$axios.post( this.$routeApi + 'admin/login', {email: this.form.email , password: this.form.password }).then((resp) => {
                try{
                  if (resp && resp.data)
                  {

                    this.$user = resp.data;
               
                    console.log("API", this.$user)
                    //this.$loggedIn = true;
                  

                   localStorage.setItem("key", "value");
                     localStorage.setItem('user', JSON.stringify(resp.data));
                  //   this.$session.start();
                  //    this.$session.set("jwt", resp.data.token);
                
                    

                    this.$router.push({name: 'orders'})    
                  // console.log(this.$session)

                    
                  }else if(resp.err){
                             swal("Error")
                             console.log("err", resp.err)
                  }
                  
                 } catch(e)
               {
          
               console.log("error", e)
             } 

             })

       
      },
  
    },

 
  }
</script>

<style scoped>

</style>