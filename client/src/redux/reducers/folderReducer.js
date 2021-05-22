import { createSlice } from '@reduxjs/toolkit';

export const folderReducer = createSlice({
  name: 'folder',
  initialState: {
    folderRoot: null,
    isLoading: true,
  },
  reducers: {
    newFolder: (state, action) => {
      state.folderRoot = action.payload;
      state.isLoading = false;
    },

    removeFolder: (state, action) => {
      state.folderRoot = action.payload;
      state.isLoading = false;
    },

    getFolderRoot: (state, action) => {
      state.folderRoot = action.payload;
      state.isLoading = false;
    },
  },
});

export const { getFolderRoot, newFolder, removeFolder } = folderReducer.actions;

export const selectFolders = state => state.folder;

export default folderReducer.reducer;
