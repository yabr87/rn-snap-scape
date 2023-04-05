import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { AntDesign, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';

const CreatePostScreen = ({ navigation }) => {
  const [image, setImage] = useState(`https://placekitten.com/g/643/480`);
  // const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [isFocused, setIsFocused] = useState({
    title: false,
    location: false,
  });

  const handleSubmit = () => {
    console.log('submit');
    if (!image || !title) {
      return;
    }
    console.log('submit');
    // Handle submission logic here

    // Clear form fields
    handleClear();
    navigation.goBack();
  };

  const handleClear = () => {
    // Clear form fields
    setImage(null);
    setTitle('');
    setLocation('');
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
      <TouchableOpacity
        style={styles.imageWrapper}
        activeOpacity={0.8}
        onPress={() => console.log('add photo')}
      >
        <View style={styles.cameraIconWrapper}>
          <MaterialIcons
            style={styles.cameraIcon}
            name="camera-alt"
            size={24}
            color={image ? '#FFFFFF' : '#BDBDBD'}
          />
        </View>
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </TouchableOpacity>

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
        style={[styles.button, !image ? styles.disabledButton : null]}
        activeOpacity={!image ? 1 : 0.8}
        onPress={handleSubmit}
      >
        <Text
          style={[styles.buttonText, !image ? styles.disabledButtonText : null]}
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
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 230,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 8,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
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
