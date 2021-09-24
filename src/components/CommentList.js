import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import withObservables from '@nozbe/with-observables';
import {compose} from 'recompose';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import {Q} from '@nozbe/watermelondb';

const CommentList = ({postId, comments}) => {
  const {navigate} = useNavigation();
  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        renderItem={({item: comment}) => (
          <View style={styles.card}>
            <Text style={styles.title}>{comment.body}</Text>
          </View>
        )}
        ListFooterComponent={
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigate('CreateComment', {postId})}>
            <Text>Add a comment</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    padding: 10,
    borderWidth: 1,
    marginVertical: 5,
  },
  title: {
    fontSize: 14,
  },
  button: {
    borderWidth: 1,
    height: 50,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default compose(
  withDatabase,
  withObservables(['postId'], ({postId, database}) => ({
    comments: database.get('comments').query(Q.where('post_id', postId)),
  })),
)(CommentList);
