<template>
  <!-- Anytime the router matches a route, it will take that component and put it right here -->
  <main>
    <AppHeader></AppHeader>
    <div class="ui container">
      <router-view></router-view>
    </div>
  </main>
</template>

<script>
import AppHeader from './components/AppHeader';
export default {
  name: 'App',
  components: {
    AppHeader
  }
}
</script>

<style scoped>
.ui.container {
  display: block;
  padding: 1rem;
}
</style>