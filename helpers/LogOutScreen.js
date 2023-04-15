import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logOutUser } from '../redux/auth/authOperations';
import { Text, View } from 'react-native';

const LogOutScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logOutUser());
  }, []);

  return (
    <View>
      <Text>log out</Text>
    </View>
  );
};

export default LogOutScreen;
