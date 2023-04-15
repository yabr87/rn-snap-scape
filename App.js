import React from 'react';
import { useState } from 'react';

import { auth } from './firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

import { NavigationContainer } from '@react-navigation/native';

import { Provider } from 'react-redux';
import { store } from './redux/store';

import * as Location from 'expo-location';

//fonts
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();
//fonts

import { router } from './router';

export default function App() {
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, user => setUser(user));

  // fonts
  const [fontsLoaded] = useFonts({
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });

  useEffect(() => {
    async function hideSplashScreen() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }

    hideSplashScreen();
  }, [fontsLoaded]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
    })();
  }, []);

  if (!fontsLoaded) {
    return null;
  }
  //fonts

  const routing = router(user);
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>{routing}</NavigationContainer>
      </Provider>
    </>
  );
}
