import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

const user = {
  id: '00034242',
  email: 'email@example.com',
  nickname: 'Natali Romanova',
  photo: 'https://placekitten.com/201',
};

const userPosts = [
  {
    id: '1',
    photo: 'https://placekitten.com/g/643/480',
    title: 'My cat',
    location: "Ivano-Frankivs'k Region, Ukraine",
    comments: '32',
    likes: '32',
  },
  {
    id: '2',
    photo: 'https://placekitten.com/g/640/480',
    title: 'My cat 2',
    location: "Ivano-Frankivs'k Region, Ukraine",
    comments: '88',
    likes: '32',
  },
  {
    id: '3',
    photo: 'https://placekitten.com/g/641/480',
    title: 'My cat 3',
    location: 'Kyiv, Ukraine',
    comments: '98',
    likes: '32',
  },
];

const PostsScreen = ({ navigation, route }) => {
  const myPost = route.params;

  console.log('======> пост скрин', myPost);
  const { email, nickname, photo } = user;
  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.user}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Profile')}
        >
          <View style={styles.user}>
            <Image source={{ uri: `${photo}` }} style={styles.userPhoto} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{nickname}</Text>
              <Text style={styles.userEmail}>{email}</Text>
            </View>
          </View>
        </TouchableOpacity>
        {!myPost ? (
          <Text>You don't have any posts yet.</Text>
        ) : (
          [myPost].map(post => {
            const { id, image, title, location = '', comments = [] } = post;

            return (
              <TouchableOpacity
                key={id}
                activeOpacity={1}
                onPress={() => navigation.navigate('Comments', myPost)}
              >
                <View style={styles.userPosts}>
                  <Image
                    source={{ uri: `${image}` }}
                    style={styles.postsPhoto}
                  />
                  <Text style={styles.postsTitle}>{title}</Text>
                  <View style={styles.postInfo}>
                    <View style={styles.comments}>
                      <Text style={styles.commentsCount}>
                        {comments.length}
                      </Text>
                      <SimpleLineIcons
                        style={{
                          transform: [{ rotateY: '180deg' }],
                        }}
                        name="bubble"
                        size={18}
                        color="#BDBDBD"
                      />
                    </View>
                    <TouchableOpacity
                      style={styles.location}
                      activeOpacity={0.8}
                      onPress={() => navigation.navigate('Map', myPost)}
                    >
                      <SimpleLineIcons
                        name="location-pin"
                        size={18}
                        color="#BDBDBD"
                      />
                      <Text style={styles.locationText}>{location}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 32,
    paddingBottom: 32,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#fff',
  },
  user: {
    flexDirection: 'row',
    marginRight: 'auto',
    gap: 16,
  },
  userPhoto: {
    width: 80,
    height: 80,
    borderRadius: 16,
  },
  userInfo: {
    justifyContent: 'center',
  },
  userName: { fontFamily: 'Roboto-Bold' },
  userEmail: { fontFamily: 'Roboto-Regular' },
  userPosts: {},
  postsPhoto: {
    width: 340,
    height: 230,
    borderRadius: 8,
  },
  postsTitle: {
    fontFamily: 'Roboto-Medium',
    marginTop: 8,
    marginBottom: 12,
  },
  postInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 2,
    paddingRight: 8,
  },
  comments: { flexDirection: 'row-reverse', alignItems: 'center', gap: 4 },
  commentsCount: {
    fontFamily: 'Roboto-Regular',
    color: '#BDBDBD',
  },
  location: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  locationText: {
    fontFamily: 'Roboto-Regular',
    textDecorationLine: 'underline',
  },
});

export default PostsScreen;
