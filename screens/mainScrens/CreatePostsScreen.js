import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { Camera } from 'expo-camera';
import * as Location from 'expo-location';

import { AntDesign, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';

const CreatePostScreen = ({ navigation }) => {
  const cameraRef = useRef();
  const [status, requestPermission] = Camera.useCameraPermissions();
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState(``);
  const [coordinates, setCoordinates] = useState({});
  const [isFocused, setIsFocused] = useState({
    title: false,
    location: false,
  });

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      requestPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (image) return;
    const image = await cameraRef.current.takePictureAsync();
    setImage(image.uri);
  };

  const getLocation = async () => {
    const location = await Location.getCurrentPositionAsync({});
    const myCoordinates = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    const locationName = await Location.reverseGeocodeAsync(myCoordinates);
    const region = locationName?.[0]?.region ?? '';
    const country = locationName?.[0]?.country ?? '';

    setLocation(`${region}, ${country}`);
    setCoordinates(myCoordinates);
  };

  const addPhoto = () => {
    takePicture();
    getLocation();
  };

  const editPhoto = () => {
    setImage(null);
  };

  const handleSubmit = () => {
    if (!image || !title) {
      return;
    }
    // console.log(coordinates);
    // console.log(location);
    // console.log('submit');
    const nwePost = {
      image,
      title,
      comments: [],
      likesCount: 0,
      location,
      coordinates,
    };

    console.log(nwePost);
    handleClear();
    navigation.navigate('Posts', nwePost);
  };

  const handleClear = () => {
    setImage(null);
    setTitle('');
    setLocation(``);
    setCoordinates({});
    setPost({});
  };

  // handlers
  const handleInputFocus = textinput => {
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
    <View style={styles.container}>
      {!image ? (
        <Camera ref={cameraRef} style={styles.camera}>
          <View style={styles.imageWrapper}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => addPhoto()}
              style={styles.cameraIconWrapper}
            >
              <MaterialIcons
                style={styles.cameraIcon}
                name="camera-alt"
                size={24}
                color={image ? '#FFFFFF' : '#BDBDBD'}
              />
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <View style={styles.imageWrapper}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => editPhoto()}
            style={styles.cameraIconWrapper}
          >
            <MaterialIcons
              style={styles.cameraIcon}
              name="camera-alt"
              size={24}
              color={image ? '#FFFFFF' : '#BDBDBD'}
            />
          </TouchableOpacity>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      )}

      <Text style={styles.text}>{image ? 'Edit photo' : 'Upload a photo'}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={
            isFocused.title ? [styles.input, styles.inputFocused] : styles.input
          }
          onFocus={() => handleInputFocus('title')}
          onBlur={() => handleInputBlur('title')}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={
            isFocused.location
              ? [styles.input, styles.locationInput, styles.inputFocused]
              : [styles.input, styles.locationInput]
          }
          onFocus={() => handleInputFocus('location')}
          onBlur={() => handleInputBlur('location')}
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
        />
        <SimpleLineIcons
          style={styles.locationIcon}
          name="location-pin"
          size={18}
          color="#BDBDBD"
        />
      </View>
      <TouchableOpacity
        style={[styles.button, !image || !title ? styles.disabledButton : null]}
        activeOpacity={!image ? 1 : 0.8}
        onPress={handleSubmit}
      >
        <Text
          style={[
            styles.buttonText,
            !image || !title ? styles.disabledButtonText : null,
          ]}
        >
          Publish
        </Text>
      </TouchableOpacity>
      <View style={styles.deleteButtonWrapp}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleClear}>
          <AntDesign name="delete" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  camera: {
    width: '100%',
    height: 230,
    overflow: 'hidden',
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 230,
    borderWidth: 1,
    borderColor: '#BDBDBD',

    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  imagePlaceholder: {
    fontSize: 18,
    color: '#BDBDBD',
  },
  cameraIconWrapper: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: '#FFFFFF70',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  cameraIcon: {},
  text: {
    marginBottom: 12,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#BDBDBD',
  },
  inputWrapper: {
    marginBottom: 24,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontFamily: 'Roboto-Regular',
  },
  locationInput: { paddingLeft: 32 },

  locationIcon: { position: 'absolute', bottom: 32, left: 8 },

  inputFocused: {
    borderColor: '#FF6C00',
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#FF6C00',
    height: 50,
    padding: 16,
    borderRadius: 100,
    alignItems: 'center',
    marginBottom: 16,
  },

  disabledButton: {
    backgroundColor: '#F6F6F6',
    color: '#000',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
  },
  disabledButtonText: { color: '#BDBDBD' },
  deleteButtonWrapp: {
    marginTop: 100,
    alignItems: 'center',
  },
  deleteButton: {
    width: 70,
    backgroundColor: '#F6F6F6',
    padding: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
});

export default CreatePostScreen;
