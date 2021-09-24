import React from 'react';
import {SafeAreaView} from 'react-native';
import ViewPost from '../components/ViewPost';

const ViewPostScreen = ({route}) => {
  const {post} = route.params;
  return (
    <>
      <SafeAreaView />
      <ViewPost post={post} />
    </>
  );
};

export default ViewPostScreen;
