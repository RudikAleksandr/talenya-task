import { configureStore } from '@reduxjs/toolkit';
import resourcesReducer from './resources/resourcesSlice';

const store = configureStore({
  reducer: {
    resources: resourcesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
