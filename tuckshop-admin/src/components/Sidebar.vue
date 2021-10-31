<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-img
      height="200"
      cover
      class="pa-4"
      gradient="to top right, rgba(100,115,201,.63), rgba(25,32,72,.8)"
      src="https://cis.ncu.edu.jm/img/cis_building2.a4dba89c.jpg"
    >
      <div class="text-center">
        <v-avatar class="mb-1" color="grey darken-1" size="100">
          <v-img
            aspect-ratio="30"
            src="https://scontent-yyz1-1.xx.fbcdn.net/v/t1.6435-9/130311125_3151784524928226_4913379832483419680_n.png?_nc_cat=106&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=Dtfy0N5VOVEAX-8Vj_8&_nc_ht=scontent-yyz1-1.xx&oh=da8b8b332a50d366076e980264386fb8&oe=619A9265"
          />
        </v-avatar>
        <h3 class="white--text">CHIPS Tuckshop Admin Portal</h3>
      </div>
    </v-img>
    <v-divider></v-divider>
    <v-list>
      <v-list-item  to='/products'>
        <v-list-item-icon>
          <v-icon>mdi-clipboard-list-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Products</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list>
      <v-list-item  to='/orders'>
        <v-list-item-icon>
          <v-icon>mdi-card-account-details-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title >Orders</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list>
      <v-list-item  to='/login'>
        <v-list-item-icon>
          <v-icon>mdi-cog</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title >Log Out</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Sidebar",
  props: ["drawer"],
  data() {
    return {
      links: [
        ["mdi-clipboard-list-outline", "Products"],
        ["mdi-card-account-details-outline", "Orders"],
        ["mdi-cog", "Log Out"],
      ],
    };
  },
};
</script>

<style scoped></style>
