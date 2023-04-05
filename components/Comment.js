import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Comment = ({ commentsData }) => {
  const { author, text, date, avatar } = commentsData;
  const currentUser = 'Jane Smith';

  const isCurrentUser = () => {
    if (currentUser === author) {
      return true;
    }
    return false;
  };

  return (
    <View
      style={
        isCurrentUser() ? styles.commentContainer : styles.commentContainerRight
      }
    >
      <View>
        <Image style={styles.avatar} source={{ uri: avatar }} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.author}>{author}</Text>
        <Text style={styles.text}>{text}</Text>
        <Text style={isCurrentUser() ? styles.dateRight : styles.date}>
          {date}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    marginBottom: 24,
    gap: 16,
  },
  commentContainerRight: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    gap: 16,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    padding: 16,
  },
  author: {
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
  },
  text: {
    marginTop: 5,
    marginBottom: 5,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
  date: {
    color: '#BDBDBD',
    textAlign: 'right',
    fontSize: 10,
    fontFamily: 'Roboto-Regular',
  },
  dateRight: {
    color: '#BDBDBD',
    textAlign: 'left',
    fontSize: 10,
    fontFamily: 'Roboto-Regular',
  },
});

export default Comment;
