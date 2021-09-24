import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import withObservables from '@nozbe/with-observables';
import CommentList from './CommentList';

const ViewPost = ({post}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <Text>{post.title}</Text>
      <Text style={styles.label}>Subtitle</Text>
      <Text>{post.subtitle}</Text>
      <Text style={styles.label}>Body</Text>
      <Text>{post.body}</Text>
      <Text style={styles.title}>Comments</Text>
      <CommentList postId={post.id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default withObservables(['post'], ({post}) => ({
  post,
}))(ViewPost);
