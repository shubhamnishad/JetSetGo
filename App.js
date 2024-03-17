import React from 'react';
import MainNavigation from './src/Navigation/MainNavigation';
import {Provider} from 'react-redux';
import store from './src/Redux/Store';

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}
