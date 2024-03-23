import React, {useMemo} from 'react';
import {ProducerData} from '../../../models/ProducerData.tsx';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Stars from '../../../components/Stars.tsx';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../routers/types-router.ts';

interface ProducerProps {
  navigation: StackNavigationProp<RootStackParamList>;
  producerData: ProducerData;
}

export default function Producer({navigation, producerData}: ProducerProps) {

  function distanceMeters(distance: number): string {
    return `${distance}m`;
  }

  const distance = useMemo(
    () => distanceMeters(producerData.distance),
    [producerData.distance],
  );

  const handleProducer = () => {
    navigation.navigate('Producer', {producerData: producerData});
  };


  return (
    <TouchableOpacity style={styles.card} onPress={handleProducer}>
      <Image
        style={styles.image}
        source={producerData.image}
        accessibilityLabel={producerData.name}
      />
      <View style={styles.information}>
        <View>
          <Text style={styles.name}>{producerData.name}</Text>
          <Stars
            quantity={producerData.stars}
          />
        </View>
        <Text>{distance}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F6F6F6',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 6,
    marginVertical: 16,
    marginLeft: 16,
  },
  information: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 8,
    marginVertical: 16,
    marginRight: 16,
  },
  name: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: 'bold',
  },
  distance: {
    fontSize: 12,
    lineHeight: 19,
  },
});