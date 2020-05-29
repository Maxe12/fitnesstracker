import {Exercise} from '../../interfaces/exercise';
import {SET_AVAILABLE_EXERCISES, SET_FINISHED_EXERCISES, START_EXERCISE, STOP_EXERCISE, TrainingActions} from './training.actions';


export interface State {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeExercise: Exercise;
}

const initialState: State = {
  availableExercises: [],
  finishedExercises: [],
  activeExercise: null
};

export function trainingReducer(state = initialState, action: TrainingActions) {
  switch (action.type) {
    case SET_AVAILABLE_EXERCISES:
      return {
        ...state,
        availableExercises: action.payload
      };
    case SET_FINISHED_EXERCISES:
      return {
        ...state,
        finishedExercises: action.payload
      };
    case START_EXERCISE:
      return {
        ...state,
        activeExercise: {...state.availableExercises.find(ex => ex.id === action.payload)}
      };
    case STOP_EXERCISE:
      return {
        ...state,
        activeExercise: null
      };
    default:
      return state;
  }
}

export const getAvailableExercises = (state: State) => state.availableExercises;
export const getFinishedExercises = (state: State) => state.finishedExercises;
export const getActiveExercise = (state: State) => state.activeExercise;
export const getExerciseIsActive = (state: State) => !!state.activeExercise;
