import { IUseWorkspaceData } from '@/hook/useWorkspace/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WorkspaceState {
  workspace: IUseWorkspaceData | null;
}

const initialState: WorkspaceState = {
  workspace: null,
};

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    setWorkspace(state, action: PayloadAction<any>) {
      state.workspace = action.payload;
    },
  },
});

export const { setWorkspace } = workspaceSlice.actions;

export default workspaceSlice.reducer;
