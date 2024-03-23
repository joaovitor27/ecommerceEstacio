import React from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import Top from './Top.tsx';
import Producer from './Producer.tsx';
import useProducers from '../../../hooks/userProducers.tsx';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../routers/types-router.ts';

interface ProducersProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

export default function Producers({navigation}: ProducersProps) {
  const [title, producers] = useProducers();

  function topList() {
    return (
      <>
        <Top/>
        <Text style={styles.title}>{title}</Text>
      </>
    );
  }

  return (
    <FlatList
      data={producers}
      renderItem={({item}) => {

        return <Producer navigation={navigation} producerData={item}/>
      }}
      keyExtractor={item => String(item.id)}
      ListHeaderComponent={topList}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    lineHeight: 32,
    marginHorizontal: 16,
    marginTop: 16,
    fontWeight: 'bold',
    color: '#464646',
  },
});
