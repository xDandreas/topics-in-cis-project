<template>
  <div id="app">
    <div id="nav">
     <Navbar />
    </div>
    <router-view/>
    <BottomNav/>
    <Footer/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import BottomNav from './components/BottomNav.vue'
import Footer from './components/Footer.vue'
export default {
  components:{
      Navbar, BottomNav, Footer
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
