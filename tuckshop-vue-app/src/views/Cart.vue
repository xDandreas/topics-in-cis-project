<template>
<div>
   <div>
    <v-container>

      <p class="display-3 font-weight-light	text-center pa-5 bg">SHOPPING CART</p>

      <v-row>
        <v-col :cols="16" md="8" sm="12" >
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-center">ITEM</th>
                <th class="text-center">PRICE</th>
                <th class="text-center">QUANTITY</th>
                <th class="text-center">TOTAL</th>
                <th class="text-center"></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(items) in cart " :key="items._id">
                <td>
                  <v-list-item
                  key="1"
               

                >
                  <v-list-item-avatar>
                    <v-img ></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title >{{items.name}}</v-list-item-title>
                    <v-list-item-subtitle></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item></td>
                <td>${{items.price}}</td>
                <td>
                  {{items.quantity}}
                </td>
                <td>${{items.total}}.00</td>
              
              </tr>
              
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
        <v-col :cols="12" md="3" sm="12" style="background-color: lightgray">
          <p class="headline">Order Summary</p>
          <p class="overline">Shipping and additional costs are calculated based on values you have entered.
          </p>
          <v-simple-table>
            <template v-slot:default>
              <tbody>
           
           
              <tr>
                <td>Total</td>
                <td class="text-right" style="width: 50px;"><b>${{cost}}.00</b></td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
          <div class="text-center">
            <v-btn class="primary white--text mt-5" outlined @click="makeOrder">MAKE ORDER </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
   </div>
  </div>
</template>
<script>
import swal from 'sweetalert'
    export default {
        data: () => ({
      
         
            cart: [],
            cost:0,
            quantity:0
        }),

          
      mounted(){

             if (localStorage.getItem('cart')) 
        this.cart = JSON.parse(localStorage.getItem('cart'));
                  
console.log ("cart" , this.cart)
this.totalCharges()
this.totalItems()
},

        methods: {
              totalCharges() {

                for( let i = 0 ; i < this.cart.length; i++)
                {
                 
                  this.cost += this.cart[i].total
                 
                }

              },

                   totalItems() {

                for( let i = 0 ; i < this.cart.length; i++)
                {
                 
                  this.quantity += this.cart[i].quantity
                 
                }

              },
              async makeOrder() {

        let request = {
              email : this.cart[0].email,
              firstname: this.cart[0].firstname,
              lastname: this.cart[0].lastname,
              items : this.cart,
              status : this.cart[0].status,
              total : this.cost
             

        }

        await this.$axios.post(this.$routeApi + "orders/create" ,  request ).then((resp)=>{

          if ( resp){
              swal("Sucessfully registered", "", "success")
              this.$router.push({name: "Shop"})
          //console.log("This is the repsonse", resp)
          }
            console("resp", resp)

        })

                

              }


          }
        
    }
</script>

<style scoped>

</style>
