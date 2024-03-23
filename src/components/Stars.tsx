import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Star from './Star.tsx';

export default function Stars({quantity, editable = false, big = false}) {
  const [quantityStar, setQuantityStar] = useState<number>(quantity);

  function renderStars() {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          onPress={() => setQuantityStar(i + 1)}
          completed={i < quantityStar}
          editable={editable}
          big={big}
          key={i}
        />,
      );
    }
    return stars;
  }

  return <View style={styles.stars}>{renderStars()}</View>;
}

const styles = StyleSheet.create({
  stars: {
    flexDirection: 'row',
    marginTop: 6,
  },
});
