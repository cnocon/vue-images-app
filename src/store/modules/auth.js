import api from '../../api/imgur';
import qs from 'qs';
import { router } from '../../main';

const state = {
  token: window.localStorage.getItem('imgur_token')
};

const getters = {
  isLoggedIn: state => !!state.token
};

// 2nd arg and beyond are provided by me, the developer, when calling hte action
// { commit } is a function to call a mutation (never directly call a mutation like mutation.setToken! That's bad!)
const actions = {
  logout: ({ commit }) => {
    commit('setToken', null);
    window.localStorage.removeItem('imgur_token');
  },
  login: () => {
    api.login();
  },
  finalizeLogin: ({ commit }, hash) => {
    const query = qs.parse(hash.replace('#', ''));
    commit('setToken', query.access_token);
    window.localStorage.setItem('imgur_token', query.access_token);
    router.push('/');
  },
};

// second and beyond args come from the actions that call the mutations
const mutations = {
  setToken: (state, token) => {
    state.token = token;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}