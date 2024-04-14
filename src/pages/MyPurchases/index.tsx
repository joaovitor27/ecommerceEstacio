import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet } from 'react-native';
import ProducerService from '../../services/producer';
import { ProducerData } from '../../models/ProducerData';
import Stars from '../../Components/Stars.tsx';

const PreviousRequests: React.FC = () => {
  const [producers, setProducers] = useState<ProducerData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const producerService = new ProducerService();
      const data = await producerService.findAll();
      setProducers(data);
    };

    fetchData();
  }, []);

function topList() {
    return (
      <>
        <Top title={'Pedidos'}/>
      </>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={producers}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.option}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.title}>{item.name}</Text>
              <Text>Pedido entregue</Text>
              <Text>Combo semanal orgânico</Text>
              <View style={styles.evaluationContainer}>
                <Text style={styles.evaluationText}>Avaliação do pedido:</Text>
                <Stars quantity={item.stars} />
              </View>

            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F2F3',
  },
  option: {
    backgroundColor: '#F6F6F6',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  info: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  staticMessage: {
    fontSize: 12,
    color: '#666',
  },
  comboText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
  },
   evaluationContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 8,
      marginBottom: 4,
    },
    evaluationText: {
      fontSize: 12,
      color: '#666',
    },
});

export default PreviousRequests;
