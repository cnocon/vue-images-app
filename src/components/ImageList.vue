<template>
  <div class="list-container">
    <ul>
      <li v-for="image in allImages" v-bind:key="image.id">
        <img
          v-bind:src="image.productUrl"
          v-bind:key="image.id"
          v-bind:alt="image.description" />
          <p>
            <strong>{{ image.title }}</strong><br/>
            <i>{{ image.description }}</i>
          </p>
        </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ImageList',
  methods: mapActions(['fetchImages']),
  computed: mapGetters(['allImages']),
  created() {
    this.fetchImages();
  },
}
</script>

<style scoped>
ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
}

li {
  max-width: calc(25% - 2rem);
  max-height: 350px;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  height: 100%;
}

img {
  display: block;
}
</style>