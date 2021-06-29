import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Resource, ResourcesState } from '../../entities/resourcesEntities';
import ResourcesService from '../../services/ResourcesService';
import YouTubeService from '../../services/YouTubeService';

const resourcesService = new ResourcesService([
  new YouTubeService(),
]);

const initialState: ResourcesState = {
  resourceList: [],
  contentUrl: '',
  isLoading: false,
};

export const loadResourcesByKeyWords = createAsyncThunk(
  'resources/getListResources',
  resourcesService.loadResourcesByKeyWords.bind(resourcesService),
);

export const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    setContentUrl: (state, { payload }: PayloadAction<string>) => {
      state.contentUrl = payload;
    },
    setContentUrlByResourceUrl: (state, { payload }: PayloadAction<string>) => {
      state.contentUrl = resourcesService.getContentUrlByResourceUrl(payload);
      state.resourceList = [];
    },
  },
  extraReducers: {
    [loadResourcesByKeyWords.fulfilled.type]: (state, { payload }: PayloadAction<Resource[]>) => {
      state.resourceList = payload;
      state.isLoading = false;
    },
    [loadResourcesByKeyWords.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [loadResourcesByKeyWords.pending.type]: (state) => {
      state.contentUrl = '';
      state.isLoading = true;
    },
  },
});

export const {
  setContentUrl,
  setContentUrlByResourceUrl,
} = resourcesSlice.actions;

export default resourcesSlice.reducer;
