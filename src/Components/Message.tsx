import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

export type messageType = 'error' | 'success' | 'info' | 'warning' | 'default';

interface MessageProps {
  message: string;
  messageType: messageType;
  onHide: () => void;
}

export function Message({message, messageType, onHide}: MessageProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onHide();
    }, 3000); // Define a duração da mensagem em milissegundos (3 segundos neste exemplo)

    return () => clearTimeout(timer);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: messageType === 'error' ? 'red' : 'green' }]}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});
