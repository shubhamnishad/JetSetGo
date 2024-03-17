import {configureStore} from '@reduxjs/toolkit';
import airlineReducer from '../Redux/Reducer';

const store = configureStore({
  reducer: {
    airlineData: airlineReducer,
  },
});

export default store;
