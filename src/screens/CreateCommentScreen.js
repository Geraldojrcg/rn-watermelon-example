import React from 'react';
import {SafeAreaView} from 'react-native';
import CreateComment from '../components/CreateComment';

const CreateCommentScreen = ({route}) => {
  const {postId} = route.params;
  return (
    <>
      <SafeAreaView />
      <CreateComment postId={postId} />
    </>
  );
};

export default CreateCommentScreen;
