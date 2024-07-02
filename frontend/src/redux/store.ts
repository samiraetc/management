// rootReducer.js
import { combineReducers, PayloadAction } from '@reduxjs/toolkit';
import workspaceReducer from './workspace/workspaceSlice';
import teamReducer from './teams/teamsSlice';
import { configureStore } from '@reduxjs/toolkit';

const appReducer = combineReducers({
  workspace: workspaceReducer,
  teams: teamReducer,
});

const rootReducer = (state: any, action: PayloadAction<any>) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
