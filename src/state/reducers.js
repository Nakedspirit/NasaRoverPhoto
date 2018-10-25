import * as actionTypes from './action.constants';
import { rovers } from '../constants';

const initialManifests = rovers.reduce((manifests, rover) => {
  manifests[rover] = {};
  return manifests;
}, {});

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ROVER_UPDATE_ACTION : {
      let { key, data } = action.payload;

      return {
        ...state,

        [key]: {
          ...state[key],
          ...data,
        },
      };
    }

  }
  return state;
};

export function manifestsReducer (state = initialManifests, action) {
  switch (action.type) {
    case actionTypes.RECEIVE_ALL_MANIFESTS: {
      return Object.assign({}, state, action.manifests);
    }
    default: {
      return state;
    }
  }
}

export function photosReducer (state = [], action) {
  switch (action.type) {
    case actionTypes.RECEIVE_PHOTOS: {
      return state = [].concat(action.photos);
    }
    case actionTypes.CLEAR_PHOTOS: {
      return state = []
    }
    default: {
      return state;
    }
  }
}

