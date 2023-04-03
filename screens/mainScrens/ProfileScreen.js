import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';

import { SimpleLineIcons } from '@expo/vector-icons';

const windowHeight = Dimensions.get('window').height;

const userPosts = [
  {
    id: '1',
    photo: 'https://placekitten.com/g/639/480',
    title: 'My cat',
    location: "Ivano-Frankivs'k Region, Ukraine",
    comments: '19',
    likes: '322',
  },
  {
    id: '2',
    photo: 'https://placekitten.com/g/640/480',
    title: 'My cat 2',
    location: "Ivano-Frankivs'k Region, Ukraine",
    comments: '8',
    likes: '32',
  },
  {
    id: '3',
    photo: 'https://placekitten.com/g/641/480',
    title: 'My cat 3',
    location: 'Kyiv, Ukraine',
    comments: '10',
    likes: '32',
  },
  {
    id: '4',
    photo: 'https://placekitten.com/g/649/480',
    title: 'My cat 3',
    location: 'Kyiv, Ukraine',
    comments: '33',
    likes: '71',
  },
];

export default function ProfileScreen({ navigation }) {
  return (
    <ImageBackground
      style={styles.bgImage}
      source={require('../../assets/images/bg.jpg')}
    >
      <View style={[styles.container, { height: windowHeight }]}>
        <View style={styles.box}>
          <View style={styles.header}>
            <View style={styles.photoBox}>
              <Image
                source={{ uri: `https://placekitten.com/g/643/480` }}
                style={styles.userPhoto}
              />
              <TouchableOpacity
                style={styles.PhotoBtn}
                activeOpacity={0.8}
                onPress={() => console.log('add photo')}
              >
                <SimpleLineIcons name="close" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </View>
            <Text style={styles.headerText}>Natali Romanova</Text>
          </View>
          <ScrollView nestedScrollEnabled={true}>
            {userPosts.map(post => {
              const { id, photo, title, location, comments, likes } = post;
              return (
                <TouchableOpacity
                  key={id}
                  activeOpacity={1}
                  onPress={() => navigation.navigate('Create Posts')}
                >
                  <View style={styles.userPosts}>
                    <Image
                      source={{ uri: `${photo}` }}
                      style={styles.postsPhoto}
                    />
                    <Text style={styles.postsTitle}>{title}</Text>
                    <View style={styles.postInfo}>
                      <View style={styles.feedback}>
                        <View style={styles.comments}>
                          <Text style={styles.commentsCount}>{comments}</Text>
                          <SimpleLineIcons
                            style={{
                              transform: [{ rotateY: '180deg' }],
                            }}
                            name="bubble"
                            size={18}
                            color="#FF6C00"
                          />
                        </View>
                        <View style={styles.comments}>
                          <Text style={styles.commentsCount}>{likes}</Text>
                          <SimpleLineIcons
                            name="like"
                            size={18}
                            color="#FF6C00"
                          />
                        </View>
                      </View>

                      <TouchableOpacity
                        style={styles.location}
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('Profile')}
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
            })}
          </ScrollView>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    resizeMode: 'cover',
  },
  container: {
    paddingTop: 130,
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  box: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  photoBox: {
    position: 'absolute',
    top: -132,
    alignItems: 'center',
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },
  userPhoto: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },

  PhotoBtn: {
    position: 'absolute',
    bottom: 12,
    right: -12,
    height: 25,
    width: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
  },

  header: {
    alignItems: 'center',
    marginTop: 72,
    marginBottom: 12,
  },
  headerText: {
    fontSize: 30,
    color: '#212121',
    fontFamily: 'Roboto-Medium',
  },
  userPosts: {
    paddingLeft: 26,
    paddingRight: 26,
    marginBottom: 32,
  },
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
  feedback: { flexDirection: 'row', gap: 8, marginRight: 10 },
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
