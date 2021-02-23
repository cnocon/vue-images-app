// Hold all the ocde related to reaching out to the Imgur API and doing something with it

import qs from 'qs';
import axios from 'axios';
// import sampleData from './sampleData';

const CLIENT_ID = '840762242745-ivhl4blk5kvmuc8u1usssnndgi605fcb.apps.googleusercontent.com';
// const ROOT_URL = 'https://api.imgur.com';
const ROOT_URL = 'https://accounts.google.com/o/oauth2/v2/auth?';
const PHOTOS_URL = 'https://photoslibrary.googleapis.com/v1/mediaItems';


export default {
  login() {
        const querystring = {
          include_granted_scopes: true,
          response_type: 'token',
          scope: 'https://www.googleapis.com/auth/photoslibrary.readonly https://www.googleapis.com/auth/photoslibrary.appendonly https://www.googleapis.com/auth/photoslibrary.readonly.appcreateddata https://www.googleapis.com/auth/photoslibrary.edit.appcreateddata https://www.googleapis.com/auth/photoslibrary https://www.googleapis.com/auth/photoslibrary.sharing',
          client_id: CLIENT_ID,
          redirect_uri: 'http://localhost:8080/oauth2/callback',
        };
        window.location = `${ROOT_URL}?${qs.stringify(querystring)}`;
  },
  fetchImages(token) {
    return axios.get(`${PHOTOS_URL}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          pageSize: 100
        }
    });
  },
  uploadImages(images, token) {
        const promises = Array.from(images).map(image => {
            return new Promise(r => {
                axios.post("https://photoslibrary.googleapis.com/v1/uploads", image, {
                    headers: {
                        'Content-Type': "application/octet-stream",
                        'X-Goog-Upload-File-Name': image.name,
                        'X-Goog-Upload-Protocol': "raw",
                        'Authorization': `Bearer ${token}`,
                    }
                }).then((response) => {
                    r({ description: "item-description", simpleMediaItem: { fileName: image.name, uploadToken: response.data } });
                });
            });
        });
        return Promise.all(promises).then(e => {
            return new Promise((resolve, reject) => {
                axios.post('https://photoslibrary.googleapis.com/v1/mediaItems:batchCreate',
                    JSON.stringify({ newMediaItems: e }),
                    {
                        headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` },
                    })
                    .then(resolve)
                    .catch(reject);
            });
        });
    },
}