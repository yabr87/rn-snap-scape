import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import AddButtonIcon from '../../components/svg/AddButtonIcon';

//fonts
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();
//fonts

const initialState = {
  email: '',
  password: '',
  nickname: '',
};

export default function RegisterScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);

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
    console.log('Regaster Form', state);
    setstate(initialState);
  };

  const handleTouch = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

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
              <View style={styles.photoBox}>
                <TouchableOpacity
                  style={styles.addBtn}
                  activeOpacity={0.8}
                  onPress={() => console.log('add photo')}
                >
                  <AddButtonIcon />
                </TouchableOpacity>
              </View>
              <Text style={styles.headerText}>Registration</Text>
            </View>
            <View>
              <TextInput
                style={styles.input}
                onFocus={() => setIsShowKeyboard(true)}
                value={state.nickname}
                placeholder="login"
                placeholderTextColor="#BDBDBD"
                onChangeText={value =>
                  setstate(prevState => ({ ...prevState, nickname: value }))
                }
              />
            </View>
            <View style={{ marginTop: 16 }}>
              <TextInput
                style={styles.input}
                onFocus={() => setIsShowKeyboard(true)}
                placeholder="E-mail address"
                textAlign="left"
                placeholderTextColor="#BDBDBD"
                value={state.email}
                onChangeText={value =>
                  setstate(prevState => ({ ...prevState, email: value }))
                }
              />
            </View>
            <View style={{ marginTop: 16 }}>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                onFocus={() => setIsShowKeyboard(true)}
                placeholder="Password"
                value={state.password}
                placeholderTextColor="#BDBDBD"
                onChangeText={value =>
                  setstate(prevState => ({ ...prevState, password: value }))
                }
              />
            </View>
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.8}
              onPress={handleSubmit}
            >
              <Text style={styles.btnText}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.link}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.linkText}>
                Do you already have an account? Sign in.
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
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

  form: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  photoBox: {
    position: 'absolute',
    top: -152,
    alignItems: 'center',
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },

  addBtn: {
    position: 'absolute',
    bottom: 12,
    right: -12,
    height: 25,
    width: 25,
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
  header: {
    alignItems: 'center',
    marginTop: 92,
    marginBottom: 32,
  },
  headerText: {
    fontSize: 40,
    color: '#212121',
    fontFamily: 'Roboto-Medium',
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