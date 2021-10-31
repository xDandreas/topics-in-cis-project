<template>
    <div class="products">
        <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
            <h1>Products</h1>
            <v-btn color="success" @click="addProduct">
                Add Product
            </v-btn>
        </v-subheader>
        <br>
        <v-row>
            <v-col>
                <v-card>
              
                    <v-data-table
                            caption="Products list"
                            :headers="headers"
                            :items="products"
                            :items-per-page="10"
                            class="elevation-1"
                    >
                        <template v-slot:item.action="{item}">
                            <v-btn color="warning" @click="showProducts(item)" outlined small shaped >Edit</v-btn>
                            <v-btn color="error" @click="Delete" outlined small shaped >Delete</v-btn>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>

            
                <div v-if="showOrderProduct">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Order </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" >
                      <span aria-hidden="true" @click="showOrderProduct = false">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                     <div class="row">
                        <div class="col-md-12 col-sm-12 col-xs-12">
                           <v-col >
       

                     <v-card class="" style="padding: 20px">
     


                        <v-text-field
                            label="Product Name" 
                            v-bind:value="productModal.name"
                        ></v-text-field>


                        
                        <v-text-field
                            label="Regular"
                            v-bind:value="productModal.description"

                        ></v-text-field>

                        <v-text-field
                            label="Price"
                            v-bind:value="productModal.price"
                        ></v-text-field>

                        <v-text-field
                            label="Stock"
                            v-bind:value="productModal.stock"
                        ></v-text-field>

                        
                              <v-select
                        :items="type"
                        :menu-props="{ top: true, offsetY: true }"
                        label="Type"
                    ></v-select>


                
               <v-btn color="success" >
                Update
                </v-btn>

                </v-card>
            </v-col>
                        </div>
                      <div class="col-md-12 col-sm-12 col-xs-12">
                        
                        </div>
                           </div>
                  </div>
            
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
        </v-row>


    </div>
</template>

<script>
    export default {
        name: "products",

        mounted(){
            this.getProducts()

        },
        data() {
            return {
                activityLog: [
                    {title: 'Total Products', amount: 50, icon: 'mdi-account', color: 'cyan lighten-3'},
                    {title: 'Total Customer', amount: 3433, icon: 'mdi-account-group-outline', color: 'green darken-2'},
                    {title: 'Total Sale', amount: 3433, icon: 'mdi-account-group-outline', color: 'blue-grey darken-1'},
                    {
                        title: 'Products List',
                        amount: 3433,
                        icon: 'mdi-account-group-outline',
                        color: 'deep-orange darken-1'
                    },
                ],
                headers: [
                  
                    {text: 'Product Name', value: 'name'},
                    {text: 'Description', value: 'description'},
                    {text: 'Price', value: 'price'},
                    {text: 'Stock', value: 'stock'},
                   
                    {text: 'Type', value: 'type'},
                    {text: 'Actions', value: 'action'},
                ],
                products: [
                    {
                       
                    },                    
                ],

                productModal:[],
                showOrderProduct:false,

                type:["Snack", "Refreshment", "Pastries"]
            }
        },

   
        methods: {
        
            onButtonClick(item) {
                console.log('click on ' + item.no)
            },

            getProducts(){

                try {
                  this.$axios.get(this.$routeApi + 'products').then((resp) => {

                   this.products = resp.data;
                   console.log(this.products)

                   //console.log(this.products)
                 })
                } catch (e) {
                  console.log(e)
                }
                
        

              
              },

              addProduct(){
                  this.$router.push({name : "add"})
              },

              Delete(){

                  this.products.splice(0,1)

              },
              showProducts(item) {

                        this.showOrderProduct = true
                        this.productModal = item
                  console.log("kkh",this.productModal)

              }

      
            }
        }

    
</script>

<style scoped>
    .overlap-icon {
        position: absolute;
        top: -33px;
        text-align: center;
        padding-top: 12px;
    }


    
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