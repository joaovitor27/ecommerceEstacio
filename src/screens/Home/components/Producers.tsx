import React from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import Top from './Top.tsx';
import Producer from './Producer.tsx';
import useProducers from '../../../hooks/userProducers.tsx';

export default function Producers() {
  const [title, producers] = useProducers();

  function topList() {
    return (
      <>
        <Top />
        <Text style={styles.title}>{title}</Text>
      </>
    );
  }

  return (
    <FlatList
      data={producers}
      renderItem={({item}) => <Producer {...item} />}
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
