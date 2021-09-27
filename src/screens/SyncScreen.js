/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import {syncDatabase} from '../useCases/syncDbUseCase';
import {useNavigation, StackActions} from '@react-navigation/native';

const SyncScreen = () => {
  const {dispatch} = useNavigation();

  const goToHome = () => dispatch(StackActions.replace('Home'));

  useEffect(() => {
    async function handler() {
      try {
        await syncDatabase();
        goToHome();
        dispatch(StackActions.replace('Home'));
      } catch (error) {
        Alert.alert(null, 'Erro when sync database');
        goToHome();
      }
    }
    handler();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <Text>Sync database...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SyncScreen;
