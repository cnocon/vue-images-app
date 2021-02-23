<template>
  <header>
    <div class="ui secondary pointing menu">
      <div  class="ui container">
        <router-link class="ui item" to="/"><b>IMAGE STORAGE</b></router-link>
        <div class="right menu logged-in">
          <div v-if="isLoggedIn" class="horizontal">
            <!-- routes set up in router instance can use router-link tag -->
            <router-link to="/" class="ui item">Galleries</router-link>
            <router-link to="/upload" class="ui item">Upload</router-link>
            <!-- since we're not trying to do nav, we don't have to convert log out or log in to a router-link tag -->
            <a class="ui item" href="#" @click="logout">Log Out</a>
          </div>
          <a v-else class="ui item" href="#" @click="login">Log In</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
// auto connects different actions from inside our modules to instances of our componets, like AppHeader
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AppHeader',
  methods: {
    ...mapActions(['login', 'logout']),
    someOtherMethod: () => {
      // not really using, just to demo why use ...syntax for mapActions
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn']),
  }
}
</script>

<style scoped>
.horizontal {
  display: flex;
  flex-direction: row;
}
</style>