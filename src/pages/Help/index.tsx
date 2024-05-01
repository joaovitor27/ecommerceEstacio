import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routers/types-router.tsx';
import Stars from '../../Components/Stars.tsx';

type HelpScreenRouteProp = RouteProp<RootStackParamList, 'Help'>;
type HelpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Help'>;

interface HelpProps {
  route: HelpScreenRouteProp;
  navigation: HelpScreenNavigationProp;
}

export default function Help({route, navigation}: HelpProps) {
  return (
    <Text>Ajuda</Text>
  );
}

const styles = StyleSheet.create({

});
