
import { ContentInterface } from '@/services/ContentInterface';
import { FolderInterface } from '@/services/FoldersInterface';
import { createSlice } from '@reduxjs/toolkit';

export interface LibrarySliceReducer {
    currentContent: ContentInterface | null,
    folderContent: FolderInterface | null,
    allContent: ContentInterface[],
    allFolders: FolderInterface[]
}

const initialState: LibrarySliceReducer = {
    currentContent: null,
    folderContent: null,
    allContent: [],
    allFolders: []
};

const librarySlice = createSlice({
    name: 'library',
    initialState,
    reducers: {
        setCurrentContent: (state, action) => {
            state.currentContent = action.payload;
        },
        setFolderContent: (state, action) => {
            state.folderContent = action.payload;
        },

        setAllFolders: (state, action) => {
            state.allFolders = action.payload;
        },
        setAllContent: (state, action) => {
            state.allContent = action.payload;
        },

    },
});

export const { setCurrentContent, setFolderContent, setAllContent, setAllFolders } = librarySlice.actions;

export default librarySlice.reducer;
