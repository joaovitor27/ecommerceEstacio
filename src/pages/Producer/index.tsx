import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routers/types-router';
import Stars from '../../components/Stars.tsx';

type ProducerScreenRouteProp = RouteProp<RootStackParamList, 'Producer'>;
type ProducerScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Producer'>;

interface ProducerProps {
  route: ProducerScreenRouteProp;
  navigation: ProducerScreenNavigationProp;
}

export default function Producer({route}: ProducerProps) {
  const {producerData} = route.params;

  return (
    <View style={styles.container}>
      <Image source={producerData.image} style={styles.image}/>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{producerData.name}</Text>
        <Stars
          quantity={producerData.stars}
        />
        <Text>Distance: {producerData.distance} m</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  detailsContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
