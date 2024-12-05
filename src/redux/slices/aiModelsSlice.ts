
import { AiModelInterface } from '@/services/AiModelsInterface';
import { ContentInterface } from '@/services/ContentInterface';
import { FolderInterface } from '@/services/FoldersInterface';
import { createSlice } from '@reduxjs/toolkit';

export interface AiModelsSliceReducer {
    allModels: AiModelInterface[]
}

const initialState: AiModelsSliceReducer = {
    allModels: []
};

const aiModelsSlice = createSlice({
    name: 'aiModels',
    initialState,
    reducers: {
        setAllModels: (state, action) => {
            state.allModels = action.payload;
        },
    },
});

export const { setAllModels } = aiModelsSlice.actions;

export default aiModelsSlice.reducer;
