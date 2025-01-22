import { configureStore } from '@reduxjs/toolkit';
import stockReducer from './features/stockSlice.ts';


const store = configureStore({
  reducer: {
    stock: stockReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
