import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import withObservables from '@nozbe/with-observables';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import {compose} from 'recompose';
import {useNavigation} from '@react-navigation/native';

const PostList = ({posts}) => {
  const {navigate} = useNavigation();
  return (
    <FlatList
      data={posts}
      style={styles.container}
      renderItem={({item: post}) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigate('ViewPost', {post})}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.subtitle}>{post.subtitle}</Text>
        </TouchableOpacity>
      )}
      ListFooterComponent={
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigate('CreatePost')}>
          <Text>Create</Text>
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    padding: 20,
  },
  card: {
    padding: 10,
    borderWidth: 1,
    marginVertical: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
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
  withObservables([], ({database}) => ({
    posts: database.get('posts').query(),
  })),
)(PostList);
