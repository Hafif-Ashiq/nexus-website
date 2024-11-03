
import { ContentInterface } from '@/services/ContentInterface';
import { FolderInterface } from '@/services/FoldersInterface';
import { createSlice } from '@reduxjs/toolkit';

export interface LibrarySliceReducer {
    currentContent: ContentInterface | null,
    folderContent: FolderInterface | null
}

const initialState: LibrarySliceReducer = {
    currentContent: null,
    folderContent: null
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
    },
});

export const { setCurrentContent, setFolderContent } = librarySlice.actions;

export default librarySlice.reducer;
