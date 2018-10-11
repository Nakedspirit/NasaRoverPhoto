import { roverUpdateAction } from './rovers.actions';

export default (state = {}, action) => {
  switch (action.type) {
    case roverUpdateAction: {
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
