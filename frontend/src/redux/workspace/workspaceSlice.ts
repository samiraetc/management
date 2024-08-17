import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WorkspaceState {
  workspace: Workspace | null;
}

const initialState: WorkspaceState = {
  workspace: null,
};

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    setWorkspace(state, action: PayloadAction<Workspace>) {
      state.workspace = action.payload;
    },
  },
});

export const { setWorkspace } = workspaceSlice.actions;

export default workspaceSlice.reducer;
