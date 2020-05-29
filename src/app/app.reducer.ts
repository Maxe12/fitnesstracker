import * as fromUi from './shared/redux/ui/ui.reducer';
import * as fromAuth from './shared/redux/auth/auth.reducer';
import * as fromTraining from './shared/redux/training/training.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export interface State {
  ui: fromUi.State;
  auth: fromAuth.State;
  training: fromTraining.State;
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUi.uiReducer,
  auth: fromAuth.authReducer,
  training: fromTraining.trainingReducer
};

export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuthenticated = createSelector(getAuthState, fromAuth.getIsAuthenticated);

export const getTrainingState = createFeatureSelector<fromTraining.State>('training');
export const getAvailableExercises = createSelector(getTrainingState, fromTraining.getAvailableExercises);
export const getFinishedExercises = createSelector(getTrainingState, fromTraining.getFinishedExercises);
export const getActiveExercise = createSelector(getTrainingState, fromTraining.getActiveExercise);
export const getExerciseIsActive = createSelector(getTrainingState, fromTraining.getExerciseIsActive);
