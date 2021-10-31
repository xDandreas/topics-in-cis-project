<template>
  <v-footer
    dark
    padless
  >
    <v-card
      flat
      tile
      class="indigo lighten-1 white--text text-center"
    >
      

      <v-card-text class="white--text pt-4">
        The Computer Hardware Information Processing Specialists club is the academic club of the Department of Computer and Information Sciences at NCU. This Web Application is for the C.H.I.P.S. Tuckshop for students to purchase snacks, drinks, and or pastries for students to enjoy without having to go all the way to cafeteria on the hill.
      </v-card-text>

      <v-divider></v-divider>
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4 white--text"
          icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>
      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>CHIPS @NCU</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
  }
</script>