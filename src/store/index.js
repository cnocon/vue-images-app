// Initial setup of Vuex will take place
import Vuex from 'vuex';
import Vue from 'vue';
import auth from './modules/auth';
import images from './modules/images';

// This line wires the two libraries together so they know about each other; then in /src/store/index.js are the instructions on HOW these two work together
Vue.use(Vuex);

// Store is a term for overall collection of all of our modules assembled together that can be interfaced with Vue code we write
export default new Vuex.Store({
  modules: {
    auth,
    images
  }
});