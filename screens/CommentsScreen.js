import React, { useState } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import Comment from '../components/Comment';

const CommentsScreen = ({ navigate, route }) => {
  const { image } = route.params || 'https://placekitten.com/g/643/480';

  const [commentText, setCommentText] = useState('');

  const handleComment = () => {};

  const commentsData = {
    comments: [
      {
        id: '1',
        avatar: 'https://placekitten.com/g/481/480',
        author: 'John Doe',
        text: 'Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!',
        date: '09 jun, 2020 | 08:40',
      },
      {
        avatar: 'https://placekitten.com/g/482/480',
        id: '2',
        author: 'Jane Smith',
        text: 'A fast 50mm like f1.8 would help with the bokeh. Ive been using primes as they tend to get a bit sharper images.',
        date: '09 июня, 2020 | 09:14',
      },

      {
        id: '3',
        avatar: 'https://placekitten.com/g/481/480',
        author: 'John Doe',
        text: 'Thank you! That was very helpful!',
        date: '09 jun, 2020 | 09:20',
      },
    ],
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={commentsData.comments}
        renderItem={({ item }) => <Comment commentsData={item} />}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={
          <View style={styles.imageWrapper}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        }
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write a comment..."
          value={commentText}
          onChangeText={text => setCommentText(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleComment}>
          <AntDesign name="arrowup" size={14} color="#fff" />
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
    paddingTop: 0,
  },
  imageWrapper: {
    width: '100%',
    height: 230,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 8,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    marginBottom: 24,
    marginTop: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
  },
  input: {
    position: 'relative',
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 150,
    padding: 10,
    backgroundColor: '#F7F7F7',
  },
  button: {
    position: 'absolute',
    right: 8,
    top: 24,
    backgroundColor: '#FF6C00',
    padding: 10,
    borderRadius: 50,
  },
});

export default CommentsScreen;
