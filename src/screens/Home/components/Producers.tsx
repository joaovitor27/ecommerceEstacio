import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import {getProducer} from '../../../services/producer.tsx';
import {ProducerData} from '../../../models/ProducerData.tsx';
import Top from './Top.tsx';
import Producer from './Producer.tsx';

export default function Producers() {
  const [title, setTitle] = useState<string>('');
  const [producers, setProducers] = useState<ProducerData[]>([]);

  useEffect(() => {
    const result = getProducer();
    setTitle(result.title);
    setProducers(result.data);
  }, []);

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
