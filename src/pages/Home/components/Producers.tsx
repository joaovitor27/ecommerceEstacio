import React from 'react';
import {FlatList} from 'react-native';
import Top from '../../../Components/Top.tsx';
import Producer from './Producer.tsx';
import useProducers from '../../../hooks/userProducers.tsx';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../routers/types-router.tsx';

interface ProducersProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

export default function Producers({navigation}: ProducersProps) {
  const [producers] = useProducers();

  function topList() {
    return (
      <>
        <Top title={'Produtores'} subtitle={'Encontre os melhores produtores'}/>
      </>
    );
  }

  return (
    <FlatList
      data={producers}
      renderItem={({item}) => {
        return <Producer navigation={navigation} producerData={item}/>
      }}
      keyExtractor={item => String(item.cnpj)}
      ListHeaderComponent={topList}
    />
  );
}
