<template>
    <div class="dashboard">
        <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
            <h1>Dashboard</h1>
        </v-subheader>
        <br>
        <v-row>
            <v-col>
                <v-card>
                    <v-data-table
                            caption="Recent Order list"
                            :headers="headers"
                            :items="desserts"
                            :items-per-page="10"
                            class="elevation-1"
                    >
                        <template v-slot:item.action="">
                            <v-btn color="success" outlined small shaped >View</v-btn>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        name: "Dashboard",
        data() {
            return {
                activityLog: [
                    {title: 'Total Products', amount: 50, icon: 'mdi-account', color: 'cyan lighten-3'},
                    {title: 'Total Customer', amount: 3433, icon: 'mdi-account-group-outline', color: 'green darken-2'},
                    {title: 'Total Sale', amount: 3433, icon: 'mdi-account-group-outline', color: 'blue-grey darken-1'},
                    {
                        title: 'Pending Orders',
                        amount: 3433,
                        icon: 'mdi-account-group-outline',
                        color: 'deep-orange darken-1'
                    },
                ],
                headers: [
                    {
                        text: 'Order ID',
                        align: 'start',
                        sortable: false,
                        value: 'orderID',
                    },
                    {text: 'User Email', value: 'userEmail'},
                    {text: 'Items', value: 'items'},
                    {text: 'Total Cost', value: 'totalCost'},
                    {text: 'DateTime', value: 'dateTime'},
                    {text: 'Status', value: 'status'},
                    {text: 'Actions', value: 'action'},
                ],
                desserts: [
                    {
                        orderID: '003',
                        userEmail: 'ken@stu.ncu.edu.jm',
                        items: 6.0,
                        totalCost: '$240.00',
                        dateTime: '4:00pm 2021-10-25',
                        status: 'Pending',
                    },                    
                ],
            }
        },
        methods: {
            onButtonClick(item) {
                console.log('click on ' + item.no)
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