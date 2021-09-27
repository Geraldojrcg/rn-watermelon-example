import React, {useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {useDatabase} from '@nozbe/watermelondb/hooks';
import {useNavigation} from '@react-navigation/native';

const CreateComment = ({postId}) => {
  const database = useDatabase();
  const {goBack} = useNavigation();

  const [body, setBody] = useState();

  const submit = async () => {
    await database.write(async () => {
      await database.get('comments').create(comment => {
        comment.body = body;
        comment._raw.post_id = postId;
      });
      goBack();
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Body</Text>
        <TextInput style={styles.input} onChangeText={setBody} />
      </View>
      <TouchableOpacity style={styles.button} onPress={submit}>
        <Text>Create</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    padding: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
  },
  button: {
    borderWidth: 1,
    height: 50,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CreateComment;
