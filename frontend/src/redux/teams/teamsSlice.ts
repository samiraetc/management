import { IUseTeamsData } from '@/hook/useTeams/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TeamsState {
  teams: IUseTeamsData | null;
}

const initialState: TeamsState = {
  teams: null,
};

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    setTeams(state, action: PayloadAction<any>) {
      state.teams = action.payload;
    },
  },
});

export const { setTeams } = teamsSlice.actions;

export default teamsSlice.reducer;
