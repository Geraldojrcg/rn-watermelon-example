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

const CreatePost = () => {
  const database = useDatabase();
  const {goBack} = useNavigation();

  const [title, setTitle] = useState();
  const [subtitle, setSubtitle] = useState();
  const [body, setBody] = useState();

  const submit = async () => {
    await database.write(async () => {
      await database.get('posts').create(post => {
        post.title = title;
        post.subtitle = subtitle;
        post.body = body;
      });
      goBack();
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Title</Text>
        <TextInput style={styles.input} onChangeText={setTitle} />
      </View>
      <View>
        <Text>Subtitle</Text>
        <TextInput style={styles.input} onChangeText={setSubtitle} />
      </View>
      <View>
        <Text>Body</Text>
        <TextInput
          style={styles.input}
          numberOfLines={4}
          multiline
          onChangeText={setBody}
        />
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

export default CreatePost;
