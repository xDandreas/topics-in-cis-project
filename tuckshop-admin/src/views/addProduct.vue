<template>
    <div class="products">
        <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
            <h1>Products</h1> 
        </v-subheader>
        <br>
        <v-row>
            <v-col >
                <v-card class="" style="padding: 20px">
                      <v-text-field
                    v-model="form.name"
                    :rules="emailRules"
                    label="Name"
                    required
                    ></v-text-field>

                        <v-text-field
                    v-model="form.description"
                    :rules="emailRules"
                    label="Description"
                    required
                    ></v-text-field>

                    <v-text-field
                    v-model="form.price"
                    :rules="emailRules"
                    label="Price"
                    required
                    ></v-text-field>

                        <v-text-field
                    v-model="form.stock"
                    :rules="emailRules"
                    label="Stock"
                    required
                    ></v-text-field>

                        <v-text-field
                    v-model="form.product_image"
                    :rules="emailRules"
                    label="Product Image"
                    required
                    ></v-text-field>

                
                      <v-select
                        :items="items"
                        :menu-props="{ top: true, offsetY: true }"
                        label="Type"
                    ></v-select>


                <v-btn color="success" @click="addProduct">
                Add Product
                </v-btn>

                </v-card>

            
            </v-col>
        </v-row>
    </div>
</template>

<script>
import swal from 'sweetalert'
    export default {
        name: "addProduct",

        mounted(){
            this.getProducts()

        },
        data() {
            return {
                items:["Snack", "Refreshment", "Pastries"],
                form:{

                        name:"",
                        description:"",
                        price:"",
                        stock:"",
                        product_image:"",
                        type:""
                }
            }
        },

   
        methods: {
                    addProduct(){

                        try{
                                    let request = {

                                        name: this.form.name,
                                        description: this.form.description,
                                        price: this.form.price,
                                        stock: this.form.stock,
                                        product_image: this.form.product_image,
                                        type: this.form.type,
                                    }
                                  this.$axios.post( this.$routeApi + "products/register", request)
                                    swal("Sucessfully created the product ", "", "success")
                        }catch (e) {

                            console.log(e.message)
                        }

                      

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
</style>