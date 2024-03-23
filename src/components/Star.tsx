import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

import starImage from '../assets/estrela.png';
import starEmptyImage from '../assets/estrelaCinza.png';

export default function Star({
  onPress,
  completed,
  editable = true,
  big = false,
}) {
  const styles = stylesFunction(big);

  function getImage() {
    if (completed) {
      return starImage;
    }
    return starEmptyImage;
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
