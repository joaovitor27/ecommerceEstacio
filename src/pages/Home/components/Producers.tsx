import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import Top from '../../../Components/Top.tsx';
import useProducers from '../../../hooks/userProducers.tsx';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../routers/types-router.tsx';
import Producer from './Producer.tsx';

interface ProducersProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

export default function Producers({navigation}: ProducersProps) {
  const [producers] = useProducers();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (producers.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [producers]);

  function topList() {
    return (
      <>
        <Top title={'Produtores'} subtitle={'Encontre os melhores produtores'}/>
      </>
    );
  }

  return (
    <>
      {topList()}
      <View style={styles.loading}>
        {loading ? <ActivityIndicator size="large"/> : (
          <FlatList
            data={producers}
            renderItem={({item}) => <Producer producerData={item} navigation={navigation}/>}
            keyExtractor={(item) => String(item.id)}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    flexGrow: 1,
  },
});
