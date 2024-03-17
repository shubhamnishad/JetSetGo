import axios from 'axios';
import {setData} from '../Redux/Reducer';

const baseUrl = 'https://api.npoint.io/378e02e8e732bb1ac55b';

export const fetchData = () => async dispatch => {
  try {
    const response = await axios.get(baseUrl);
    dispatch(setData(response?.data));
  } catch (error) {
    console.error(error, 'ERROR FETCHING DATA');
  }
};
