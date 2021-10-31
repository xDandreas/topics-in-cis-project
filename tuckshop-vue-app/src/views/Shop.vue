<template>
  <div>
    <v-container>
      <div class="row">
        <div
         class="col-md-3 col-sm-3 col-xs-12"
        >
          <v-card outlined>
            <v-card-title>Tuckshop</v-card-title>
            <v-divider></v-divider>
            <template>
              <v-treeview :items="items" :open="[1]" :active="[5]" :selected-color="'#fff'" activatable open-on-click dense></v-treeview>
            </template>
          </v-card>
        </div>
        <div
          class="col-md-9 col-sm-9 col-xs-12"
        >
     
          <v-divider></v-divider>

          <div class="row text-center">
              <div class="row">
        <div class="col-sm-12 col-xs-12 col-md-12">
             
          <v-card-text 
            class="pa-0 pt-4"
            tile
            outlined
          >
            <p class="h1 font-weight-heavy pt-3 text-center">Popular Items</p>
            <v-divider></v-divider>
            <div class="row text-center" >
              <div class="col-md-4 col-sm-8 col-xs-12 text-center d-flex flex-column  " v-for="(items, index) in products" :key="items._id">
                <v-hover
                  v-slot:default="{ hover }"
                  open-delay="200"
                >
                  <v-card
                    :elevation="hover ? 16 : 2"
                    max-height="450px"
                    min-height="450px"
                    max-width="500px"
                    min-width="150px"
                  >

                    <v-img
                      lazy-src="https://scontent-yyz1-1.xx.fbcdn.net/v/t1.6435-9/130311125_3151784524928226_4913379832483419680_n.png?_nc_cat=106&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=Dtfy0N5VOVEAX-8Vj_8&_nc_ht=scontent-yyz1-1.xx&oh=da8b8b332a50d366076e980264386fb8&oe=619A9265"
                      class="white--text align-end"
                      max-height="200px"
                      contain
                      :src="items.product_image"
                    >
                      <v-card-title><p style="background-color:rgba(15, 10, 10, 0.6); padding-left: 5px; padding-right: 5px;color: white;">{{items.name}}</p></v-card-title>
                    </v-img>

                    <v-card-text class="text--primary text-center">
                      <h2>${{items.price}}</h2>
                      <div>{{items.description}}</div>
                    </v-card-text>

                    <div class="text-center">
                      <v-btn
                        class="mt-auto"
                        outlined
                        color="info"
                        @click="placeOrder(index)"
                      >
                       Order
                      </v-btn>
                    </div>
                    <v-spacer class="pt-3"></v-spacer>
                  </v-card>
                </v-hover>
              </div>
            </div>
          </v-card-text>
        </div>
      </div>
          </div>
          <v-spacer></v-spacer>
          <div class="text-center mt-12 pt-5">
         </div>
        </div>
      </div>
    </v-container>
  <!--Modal -->
    <div v-if="showModal">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Order </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true" @click="showModal = false">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                     <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12">
        
        </div>
        <div class="col-md-12 col-sm-12 col-xs-12">
         
          <div class="pl-6">
            <p class="display-5 mb-0"></p>
            <v-card-actions class="pa-0">
           
              <v-spacer></v-spacer>
              
              
            </v-card-actions>
  
            <p class="title">QUANTITY</p> 
                          
       
        <div class="row d-flex">
              <div class="col-6">
                    <v-text-field
                v-model="quantity"
                outlined
                @change="onChange"
                
                dense
            ></v-text-field>
             
              </div>
                   <div class="col-6">
              
               <p class="headline font-weight-light h1">{{total}}</p>
              </div>
      
        </div>   
            <v-btn class="primary white--text" outlined tile dense @click="addCart()"><v-icon>mdi-cart</v-icon> ADD TO CART</v-btn>
          </div>

        
      </div>
      </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="Close()">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
  </div>
</template>
<style>

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
  .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .8;
    position: absolute;
    width: 100%;
  }
</style>
<script>
    export default {
        data: () => ({
            showModal: false,
            range: [0, 10000],
           
            page:1,
           
            items: [
                {
                    id: 2,
                    name: 'Consumables',
                    children: [
                        { id: 2, name: 'Pastries' },
                        { id: 3, name: 'Refreshments' },
                        { id: 4, name: 'Snacks' },
                        
                    ],
                },
           
            ],
            products:[],

            modalItems:[],
            quantity:"1",
            cartItems:[],
            modalItems2:[],
            total:0
        }),

        created()
        {  
          this.Load();
          this.getProducts()
        },

        methods:{

              //Get all the products
              getProducts()
              {
                try {
                  this.$axios.get(this.$routeApi + 'products').then((resp) => {

                   this.products = resp.data;

                   //console.log(this.products)
                 })
                } catch (e) {
                  console.log(e)
                }
                
        
                //
              
              },
       
        Load(){
          this.customer = this.$user
        },
        
      placeOrder(index){
        
            this.showModal = true;
             this.modalItems = this.products[index]
          
           
            
            //this.modalItems2 = this.modalItems
            //let order = this.modalItems[index] 
             console.log(this.modalItems)
           
      },
      addCart (){
        
      
      let items ={
          "name": this.modalItems.name,
          "email": this.$user.user.email,
          "firstname" : this.$user.user.firstname,
          "lastname" : this.$user.user.lastname,
          "user" : this.$user.user._id,
          price : this.modalItems.price ,
          "quantity" : this.quantity,
          "total" : this.total,


      }

      this.cartItems.push(items)

      localStorage.setItem('cart', JSON.stringify(this.cartItems));
          
      }, 
      
      onChange()
      {
        console.log(this.modalItems.price)
       this.total = this.modalItems.price * this.quantity
      
       
       
       this.$nextTick()

      },

      Close()
      {
        this.showModal = false;
        this.quantity =0;
        this.total = 0;
      }
    
      
        }
    }
</script>