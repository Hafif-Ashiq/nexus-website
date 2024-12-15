
import { AiModelInterface } from '@/services/AiModelsInterface';
import { ContentInterface } from '@/services/ContentInterface';
import { FolderInterface } from '@/services/FoldersInterface';
import { createSlice } from '@reduxjs/toolkit';

export interface AiModelsSliceReducer {
    allModels: AiModelInterface[],
    translationModelId: string,
    abstractiveSummarizationModelId: string,
    extractiveSummarizationModelId: string,
    otherModelsId: string
}

const initialState: AiModelsSliceReducer = {
    allModels: [],
    translationModelId: "zkb0ysUiZpKSFcnoaoQD",
    abstractiveSummarizationModelId: "FigG5uIMlUEw1IAlSsBr",
    extractiveSummarizationModelId: "FNJAQivoRd7ouJOcQesX",
    otherModelsId: "DiSUp3yEVucYO6EPU5r1"
};

const aiModelsSlice = createSlice({
    name: 'aiModels',
    initialState,
    reducers: {
        setAllModels: (state, action) => {
            state.allModels = action.payload;
        },
        setTranslationModelId: (state, action) => {
            state.translationModelId = action.payload;
        },
    },
});

export const { setAllModels } = aiModelsSlice.actions;

export default aiModelsSlice.reducer;
