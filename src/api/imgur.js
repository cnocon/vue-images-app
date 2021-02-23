// Hold all the ocde related to reaching out to the Imgur API and doing something with it

import qs from 'qs';
import axios from 'axios';
// import sampleData from './sampleData';

const CLIENT_ID = '7607ce48f6ef7cb';
const ROOT_URL = 'https://api.imgur.com';

export default {
  login() {
    const querystring = {
      client_id: CLIENT_ID,
      response_type: 'token',
      application_state: 'none'
    };

    window.location = `${ROOT_URL}/oauth2/authorize?${qs.stringify(querystring)}`;
  },
  fetchImages(token) {
    return axios.get(`${ROOT_URL}/3/account/me/images`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  },
  uploadImages(images, token) {
    const promises = Array.from(images).map(image => {
      // FormData is a global var that's part of the JS spec
      const formData = new FormData();
      // append key of 'image' with value of image to the formData obj
      formData.append('image', image);

      return axios.post(`${ROOT_URL}/3/image`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    });

    return Promise.all(promises);
  }
}