<template>
    <div class="products">
        <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
            <h1>Orders</h1>
         
        </v-subheader>
        <br>
        <v-row>
            <v-col>
                <v-card>
              
                    <v-data-table
                            caption="Orders list"
                            :headers="headers"
                            :items="orders"
                            :items-per-page="10"
                            class="elevation-1"
                    >
                        <template v-slot:item.action="{item}">
                            <v-btn color="warning" outlined small shaped @click="showOrders(item)">View Purchase</v-btn>

                          
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
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
                                <v-data-table
                                  :headers="modalHeader"
                                  :items="modalOrder"
                                  multi-sort
                                  class="elevation-1"
                                ></v-data-table>
                            
                        </div>
                      <div class="col-md-12 col-sm-12 col-xs-12">
                          <p>Total: {{modalTotal}}</p> 

                          
                            <div v-if="status">
                             <v-btn color="primary" outlined small shaped @click="status=false">COMPLETED</v-btn>
                            </div>
                              <div v-else>
                             <v-btn color="error" outlined small shaped @click="status=true">NOT COMPLETED</v-btn>
                            </div>   
                        </div>
                           </div>
                  </div>
            
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
</template>

<script>

import moment from 'moment';
    export default {
        name: "products",

        mounted(){
            this.getOrders()

        },
        data() {
            return {
              
                headers: [
                  
                    {text: 'Email', value: 'email'},
                    {text: 'Firstname', value: 'firstname'},
                    {text: 'Lastname', value: 'lastname'},
                    {text: 'ordered', value: 'created_ts'},
                    {text: 'total', value: 'total'},
           
                    {text: 'Actions', value: 'action'},
                ],
                orders: [
                    {
                       
                    },                    
                ],
                showModal: false,

                modalHeader: [
                    {text: 'Item name', value: 'name'},
                    {text: 'Price', value: 'price'},
                    {text: 'Quantity', value: 'quantity'},
                    {text: 'total', value: 'total'},
           
                   

                ],

                modalOrder:[],
                modalTotal:"",
                status: false
               
            }
        },

   
        methods: {
        
            onButtonClick(item) {
                console.log('click on ' + item.no)
            },

            getOrders(){

                try {
                  this.$axios.get(this.$routeApi + 'orders').then((resp) => {

                   this.orders = resp.data;
                   console.log(this.orders)

                   for (let i = 0; i < this.orders.length; i++) {
                     this.orders[i].created_ts = moment( this.orders[i].created_ts).format('MMMM Do YYYY, h:mm:ss a');
                      this.orders[i].total = "$" +  this.orders[i].total + ".00"
                   }
                 

                   //console.log(this.products)
                 })
                } catch (e) {
                  console.log(e)
                }
                
        
     
              },



              showOrders(items)
                      {
                         this.modalOrder = items.items
                         this.modalTotal = items.total

                          this.showModal = true;
                          console.log(items.items)
                         
                      }

      
            },

                Close()
                  {
                    this.showModal = false;
                    
                  },
         changeStatus()
         {
           this.status = true 
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