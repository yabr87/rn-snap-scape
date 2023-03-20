import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import Button from '../../components/Button';

//fonts
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();
//fonts

const initialState = {
  email: '',
  password: '',
};

export default function LoginScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);
  const [securePas, setSecurePas] = useState(true);
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
  });

  //fonts
  const [fontsLoaded] = useFonts({
    'Roboto-Medium': require('../../assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  //fonts

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log('Login Form', state);
    setstate(initialState);
  };

  const handleTouch = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  // handlers
  const handleInputFocus = textinput => {
    setIsShowKeyboard(true);
    setIsFocused({
      [textinput]: true,
    });
  };
  const handleInputBlur = textinput => {
    setIsFocused({
      [textinput]: false,
    });
  };
  // handlers
  return (
    <TouchableWithoutFeedback onPress={handleTouch}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <ImageBackground
          style={styles.bgImage}
          source={require('../../assets/images/bg.jpg')}
        >
          <View
            style={{
              ...styles.form,
              marginBottom: isShowKeyboard ? -170 : 0,
            }}
          >
            <View style={styles.header}>
              <Text style={styles.headerText}>Login</Text>
            </View>

            <View style={{ marginTop: 16 }}>
              <TextInput
                style={
                  isFocused.email
                    ? [styles.input, styles.inputFocused]
                    : styles.input
                }
                onFocus={() => handleInputFocus('email')}
                onBlur={() => handleInputBlur('email')}
                placeholder="E-mail address"
                textAlign="left"
                placeholderTextColor="#BDBDBD"
                value={state.email}
                onChangeText={value =>
                  setstate(prevState => ({ ...prevState, email: value }))
                }
              />
            </View>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={
                  isFocused.password
                    ? [styles.input, styles.inputFocused]
                    : styles.input
                }
                secureTextEntry={securePas}
                onFocus={() => handleInputFocus('password')}
                onBlur={() => handleInputBlur('password')}
                placeholder="Password"
                value={state.password}
                placeholderTextColor="#BDBDBD"
                onChangeText={value =>
                  setstate(prevState => ({ ...prevState, password: value }))
                }
              />
              <Button
                stylesBtn={styles.showBtn}
                stylesText={styles.showText}
                text={securePas ? 'Show' : 'Hide'}
                onPress={() => setSecurePas(!securePas)}
              />
            </View>
            <Button
              text={'Sign in'}
              stylesBtn={styles.btn}
              stylesText={styles.btnText}
              onPress={handleSubmit}
            />
            <Button
              text={'Do not have an account? Sign up.'}
              stylesBtn={styles.link}
              stylesText={styles.linkText}
              onPress={() => navigation.navigate('Register')}
            />
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  showText: {
    color: '#fff',
  },
  showBtn: {
    backgroundColor: '#212121',
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },

  form: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  header: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 32,
  },
  headerText: {
    fontSize: 40,
    color: '#212121',
    fontFamily: 'Roboto-Medium',
  },
  input: {
    borderWidth: 1,
    borderColor: 'transparent',
    height: 50,
    borderRadius: 8,
    backgroundColor: '#F6F6F6',
    marginHorizontal: 16,
    padding: 16,
    fontSize: 16,
    lineHeight: 19,
  },
  inputFocused: {
    borderColor: '#FF6C00',
    backgroundColor: '#FFFFFF',
  },

  passwordWrapper: {
    position: 'relative',
    marginTop: 16,
  },
  showBtn: {
    position: 'absolute',
    right: 16,
    paddingBottom: 15,
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
    width: 60,
  },

  showText: {
    color: '#1B4371',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
  },

  btn: {
    borderRadius: 100,
    height: 50,
    marginTop: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    backgroundColor: '#FF6C00',
  },
  btnText: {
    fontSize: 16,
    lineHeight: 19,
    color: '#ffffff',
    fontFamily: 'Roboto-Regular',
  },
  link: {
    marginTop: 20,
    alignSelf: 'center',
  },
  linkText: {
    color: '#1B4371',
    marginBottom: 78,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
  },
});
