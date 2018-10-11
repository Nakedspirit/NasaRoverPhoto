import superagent from 'superagent';
import { findShortCamera } from '../lib/rover.cameras.js';
import { baseUrl, apiManifestUrl, apiKey } from '../constants';

export const roverUpdateAction = 'ROVER_UPDATE';

export const updateRover = ({ key, ...data }) => ({
  type: roverUpdateAction,
  payload: { key, data },
});

// GET cameras for rover
export const fetchCameras = (key, date) => (dispatch, getState) => {
  return superagent
    .get(`${baseUrl}${key}/photos?earth_date=${date}&api_key=${apiKey}`)
    .then((res) => {
      let cameras = [];
      
      for (let i = 0; i < res.body.photos.length; i++) {
        let fullName = res.body.photos[i].camera.full_name;
        if (cameras.indexOf(fullName) === -1) {
          cameras.push(fullName);
        }
      }
      return cameras;
    })
    .then((cameras) => {
      dispatch(updateRover({ key, cameras }));
    });
};

// fetch photo
export const fetchPhoto = (key, date) => (dispatch, getState) => {

  return superagent
    .get(`${baseUrl}rovers/${key}/photos?sol=${date}&api_key=${apiKey}`)
    .then((res) => {
      let { photos } = res.body;
      console.log (photos)

      dispatch(updateRover({ key, photos }));
    });
};

// export const fetchPhoto = (key, date, camera) => (dispatch, getState) => {
//   let shortCamera = findShortCamera(camera);

//   return superagent
//     .get(`${baseUrl}rovers/${key}/photos?sol=${date}&camera=${shortCamera}&api_key=${apiKey}`)
//     .then((res) => {
//       let { photos } = res.body;

//       dispatch(updateRover({ key, photos }));
//     });
// };

// fetch manifest
export const fetchManifest = (key) => (dispatch, getState) => {
  return superagent
    .get(`${apiManifestUrl}${key}?api_key=${apiKey}`)
    .then((res) => {
      let { photo_manifest: manifest } = res.body;

      dispatch(updateRover({ key, manifest }));
    });
};
