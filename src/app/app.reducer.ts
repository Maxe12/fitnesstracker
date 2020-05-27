import {State} from './shared/interfaces/state';

const initialState: State = {
  isLoading: false
};

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'START_LOADING':
      return {
        isLoading: true
      };
    case 'STOP_LOADING':
      return {
        isLoading: false
      };
    default:
      return state;
  }
}
