import React from 'react';
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider';
import {database} from './database';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import PostListScreen from './screens/PostListScreen';
import CreatePostScreen from './screens/CreatePostScreen';
import ViewPostScreen from './screens/ViewPostScreen';
import CreateCommentScreen from './screens/CreateCommentScreen';
import SyncScreen from './screens/SyncScreen';

const Stack = createNativeStackNavigator();

const App = () => (
  <DatabaseProvider database={database}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Sync" headerShown={false} component={SyncScreen} />
        <Stack.Screen
          name="Home"
          options={{title: 'Post list'}}
          component={PostListScreen}
        />
        <Stack.Screen
          name="CreatePost"
          options={{title: 'New post'}}
          component={CreatePostScreen}
        />
        <Stack.Screen
          name="ViewPost"
          options={{title: 'Post'}}
          component={ViewPostScreen}
        />
        <Stack.Screen
          name="CreateComment"
          options={{title: 'New comment'}}
          component={CreateCommentScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </DatabaseProvider>
);

export default App;
