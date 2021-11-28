import React from 'react';
import { View, StyleSheet } from 'react-native';

import Game from './game/screen';

const App = () => {
  return (
    <View style={styles.container}>
      <Game />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
  },
});

export default App;
