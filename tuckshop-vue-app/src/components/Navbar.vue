<template>
  <div>
       <v-app-bar
      app
      color="indigo darken-1"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          
          alt="CHIPS TUCKSHOP"
          class="mr-2"
          contain
          :src="require('../assets/logo-white.png')"
          transition="scale-transition"
          width="60"
        ><a to="/login"></a></v-img>
        <p class="pt-4">CHIPS TUCKSHOP</p>

      </div>

      <v-spacer></v-spacer>



          <div v-if="customer">

      <v-btn
         to="/shop"
        text
      >
      Shop
        <v-icon>mdi-user</v-icon>
      </v-btn>
      
      <v-btn
        to="/cart"
     
        text
      >
    Your Cart
        <v-icon>mdi-cart</v-icon>
      </v-btn>

        <v-btn
        
         @click="logout"
     
        text
      >
     Logout 
        <!-- <v-icon>mdi-cart</v-icon> -->
      </v-btn>

    </div>

              <div v-else>

      <v-btn
         to="/login"
        text
      >
      Login
        <v-icon>mdi-user</v-icon>
      </v-btn>
      
      <v-btn
      to="/register"
     
        text
      >
    Register
        <!-- <v-icon>mdi-cart</v-icon> -->
      </v-btn>



    </div>

    </v-app-bar>
  </div>
</template>


<script>
  export default{

    data(){
      return{
        dialog: false,
        customer: null,
      }


    },
  created()
  {
      this.Load();
  },

  mounted(){
  console.log('App Mounted');
    if (localStorage.getItem('user')) 
        this.customer= JSON.parse(localStorage.getItem('user'));
        console.log(this.customer)
},
  methods:
  {
    Load(){
      this.customer
    },

     logout() {
      
       localStorage.removeItem('user');
      this.$session.destroy();
       
       this.$router.push({name: 'login'}) 
       this.$nextTick(); 
       this.$forceUpdate();
      
    }
  },


  }


</script>



<style scoped>

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

</style>