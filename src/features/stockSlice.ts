import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StockState {
  stocks: any[]; // Replace `any` with the appropriate type for stock data
}

const initialState: StockState = {
  stocks: [],
};

const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    setStocks(state, action: PayloadAction<any[]>) {
      state.stocks = action.payload;
    },
  },
});



export const { setStocks } = stockSlice.actions;
export default stockSlice.reducer;
