import React, {useMemo} from 'react';
import {ProducerData} from '../../../models/ProducerData.tsx';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Stars from '../../../Components/Stars.tsx';
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

  function getImage() {
    return producerData.image ? {uri: producerData.image} : require('../../../assets/profile.png');
  }

  function getDescrition() {
    return producerData.description.length > 30 ? `${producerData.description.substring(0, 30)}...` : producerData.description;
  }


  return (
    <TouchableOpacity style={styles.card} onPress={handleProducer}>
      <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={getImage()}
        accessibilityLabel={producerData.name}
      />
        </View>
      <View style={styles.information}>
        <View>
          <Text style={styles.name}>{producerData.name}</Text>
          <Text style={styles.description}>{getDescrition()}</Text>
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
  description: {
    color: '#a0a1a1',
    fontSize: 10,
    marginBottom: 5,
  },

  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(0,128,128,0.32)',
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
    color: '#696969',
  },
  distance: {
    fontSize: 12,
    lineHeight: 19,
  },
});
