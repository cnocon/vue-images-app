import api from '../../api/imgur';
import { router } from '../../main';

const state = {
  images: [],
};

export const getters = {
  allImages: state => state.images
};

// rootState is a reference to all the state in the Vuex instance
const actions = {
  async fetchImages({ commit, rootState }) {
    const { token } = rootState.auth;
    const response = await api.fetchImages(token);
    console.log(response.data.mediaItems.filter(i => i.mimeType === "image/jpeg"));
    commit('setImages', response.data.mediaItems.filter(i => i.mimeType != "video/mp4"));
  },
  async uploadImages({ rootState }, images) {
    // Get the access token
    const { token } = rootState.auth;
    // Call our API module to do the upload
    await api.uploadImages(images, token);
    // Redirect user to ImageList component with newly uploaded images
    router.push('/');
  }
};

const mutations = {
  setImages: (state, images) => {
    state.images = images;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}