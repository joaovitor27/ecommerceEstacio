import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

interface StarProps {
  onPress: () => void;
  completed: boolean;
  editable?: boolean;
  big?: boolean;
}

export default function Star({
  onPress,
  completed,
  editable = true,
  big = false,
}: StarProps) {
  const styles = stylesFunction(big);

  function getImage() {
    if (completed) {
      return require('../assets/estrela.png');
    }
    return require('../assets/estrelaCinza.png');
  }

  return (
    <TouchableOpacity onPress={onPress} disabled={!editable}>
      <Image source={getImage()} style={styles.star} />
    </TouchableOpacity>
  );
}

function stylesFunction(big: boolean) {
  return StyleSheet.create({
    star: {
      width: big ? 36 : 12,
      height: big ? 36 : 12,
      marginRight: 2,
    },
  });
}
