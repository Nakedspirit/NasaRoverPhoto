import axios from 'axios';
import superagent from 'superagent';
import * as actionTypes from './action.constants';
import { rovers, apiKey, apiManifestUrl } from '../constants';

export const updateRover = ({ key, ...data }) => ({
  type: actionTypes.ROVER_UPDATE_ACTION,
  payload: { key, data },
});

function receiveAllManifests (allManifests) {
  return {
    type: actionTypes.RECEIVE_ALL_MANIFESTS,
    manifests: allManifests
  }
}

function formatManifests (responses) {
  let manifests = {};
  responses.forEach(response => {
    let data = response.data.photo_manifest;
    manifests[data.name] = data;
  });
  return manifests;
}

export function loadAllManifests () {
  return dispatch => {
    let config = {
      params: { api_key: apiKey }
    };
    let allRequests = rovers.map(rover => ( axios.get(apiManifestUrl + rover, config) ));
    return axios.all(allRequests).then(response => {
      let formattedResponse = formatManifests(response);
      return dispatch(receiveAllManifests(formattedResponse));
    });
  }
}

// fetch manifest

export const fetchManifest = (key) => (dispatch, getState) => {
  return superagent
    .get(`${apiManifestUrl}${key}?api_key=${apiKey}`)
    .then((res) => {
      let { photo_manifest: manifest } = res.body;
      dispatch(updateRover({ key, manifest }));
    });
};