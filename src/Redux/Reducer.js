import {createSlice} from '@reduxjs/toolkit';

export const initialState = {
  originalData: [],
};

const dataSlice = createSlice({
  name: 'airlineData',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.originalData = [...action.payload];
    },
  },
});

export const {setData} = dataSlice.actions;
export default dataSlice.reducer;
