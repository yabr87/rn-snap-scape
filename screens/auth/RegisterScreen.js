import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/auth/authOperations';

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
import Button from '../../components/Button';

const initialState = {
  email: '',
  password: '',
  name: '',
};

export default function RegisterScreen({ navigation }) {
  const dispatch = useDispatch();
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);
  const [securePas, setSecurePas] = useState(true);
  const [isFocused, setIsFocused] = useState({
    name: false,
    email: false,
    password: false,
  });

  const handleSubmit = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
    dispatch(registerUser(state));
    console.log('Regaster Form', state);
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
      <View style={styles.container}>
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
                style={
                  isFocused.name
                    ? [styles.input, styles.inputFocused]
                    : styles.input
                }
                onFocus={() => handleInputFocus('name')}
                onBlur={() => handleInputBlur('name')}
                value={state.name}
                placeholder="login"
                placeholderTextColor="#BDBDBD"
                onChangeText={value =>
                  setstate(prevState => ({ ...prevState, name: value }))
                }
              />
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
              text={'Sign up'}
              stylesBtn={styles.btn}
              stylesText={styles.btnText}
              onPress={handleSubmit}
            />
            <Button
              text={'Do you already have an account? Sign in.'}
              stylesBtn={styles.link}
              stylesText={styles.linkText}
              onPress={() => navigation.navigate('Login')}
            />
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
