/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { persistor, store } from "@store";
import React, { useEffect } from 'react';
import { LogBox, Platform, StatusBar } from 'react-native';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Navigation from "./navigation";
import { BaseColor } from "@config";
import { Loading } from "@components";

LogBox.ignoreAllLogs(true);
const App = (props) => {
  useEffect(() => {
    if (Platform.OS == "android") {
      StatusBar.setBackgroundColor(BaseColor.primaryColor)
    }
  });
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
        <Loading />
      </PersistGate>
    </Provider>
  )
};

export default App;
