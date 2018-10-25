import axios from 'axios';
import * as actionTypes from './action.constants';
import { apiKey, baseUrl } from '../constants';


function receivePhotos (photos) {
  return {
    type: actionTypes.RECEIVE_PHOTOS,
    photos: photos
  }
}

export function clearPhotos () {
  return {
    type: actionTypes.CLEAR_PHOTOS
  }
}

export function requestPhotos (rover, params) {
  return dispatch => {
    const requestUrl = baseUrl + 'rovers/' + rover.toLowerCase() + '/photos';
    let config = {
      params: { api_key: apiKey }
    };
    Object.assign(config.params, params);
    return axios.get(requestUrl, config).then(response => {
      return dispatch(receivePhotos(response.data.photos));
    })
  }
}
