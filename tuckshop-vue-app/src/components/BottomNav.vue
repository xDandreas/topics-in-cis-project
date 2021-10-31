<template>
  <v-bottom-navigation
    v-model="value"
    :background-color="color"
    dark
    shift
  >

    <v-btn>
      <span>Home</span>

      <v-icon>mdi-store</v-icon>
    </v-btn>

    <v-btn>
      <span>My Cart</span>

      <v-icon>mdi-cart</v-icon>
    </v-btn>

    <v-btn>
      <span>About</span>

      <v-icon>mdi-information</v-icon>
    </v-btn>

  </v-bottom-navigation>
</template>

<script>
  export default {
    data: () => ({ value: 1 }),

    computed: {
      color () {
        switch (this.value) {
          case 0: return 'blue-grey'
          case 1: return 'teal'
          case 2: return 'brown'
          case 3: return 'indigo'
          default: return 'blue-grey'
        }
      },
    },
  }
</script>