import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

//fonts
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();
//fonts

import { router } from './router';

export default function App() {
  // fonts
  const [fontsLoaded] = useFonts({
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

  if (!fontsLoaded) {
    return null;
  }
  //fonts

  const routing = router(true);
  return (
    <>
      <NavigationContainer>{routing}</NavigationContainer>
    </>
  );
}
