import { configureStore } from '@reduxjs/toolkit';
import workspaceReducer from './workspace/workspaceSlice';
import teamReducer from './teams/teamsSlice'

export const store = configureStore({
  reducer: {
    workspace: workspaceReducer,
    teams: teamReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
