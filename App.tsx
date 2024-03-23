import React from 'react';
import {SafeAreaView} from 'react-native';
import Home from './src/screens/Home';

function App() {
  return (
    <SafeAreaView style={styles.screen}>
      <Home />
    </SafeAreaView>
  );
}

const styles = {
  screen: {
    flex: 1,
  },
};

export default App;
