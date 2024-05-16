import React, {useState} from 'react';
import {Alert, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Top from '../../Components/Top.tsx';
import Icon from 'react-native-vector-icons/FontAwesome';

const PaymentMethods = () => {
  const [paymentOptions, setPaymentOptions] = useState([
    {id: '1', type: 'Visa **** **** **** 1234', details: 'Cartão de Crédito'},
    {id: '2', type: 'Mastercard **** **** **** 5678', details: 'Cartão de Crédito'},
    {id: '3', type: 'Elo **** **** **** 9012', details: 'Cartão de Crédito'},
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newCardType, setNewCardType] = useState('');
  const [newCardDetails, setNewCardDetails] = useState('');

  const renderOption = ({item}) => (
    <TouchableOpacity style={styles.option}>
      <View style={styles.info}>
        <Text style={styles.type}>{item.type}</Text>
        <Text style={styles.details}>{item.details}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleAddCard = () => {
    if (!newCardType.trim() || !newCardDetails.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos para adicionar o cartão.');
      return;
    }

    const newCard = {
      id: String(paymentOptions.length + 1),
      type: newCardType,
      details: newCardDetails,
    };

    setPaymentOptions([...paymentOptions, newCard]);
    setModalVisible(false);
    setNewCardType('');
    setNewCardDetails('');
  };

  return (
    <>
      <Top title={'Formas de pagamentos'} subtitle={'Adicione ou remova cartões de crédito para suas compras.'}/>
      <View style={styles.container}>
        <FlatList
          data={paymentOptions}
          renderItem={renderOption}
          keyExtractor={(item) => item.id}
        />
        <View style={styles.padding}>
          <TouchableOpacity style={styles.addCard} onPress={() => setModalVisible(true)}>
            <Text style={styles.saveCard}>Adicionar Novo Cartão</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                aria-label="Tipo de Cartão"
                placeholder="Tipo de Cartão"
                style={styles.input}
                value={newCardType}
                onChangeText={setNewCardType}
                placeholderTextColor={'#333'}
              />
              <TextInput
                aria-label="Detalhes do Cartão"
                placeholder="Detalhes do Cartão"
                style={styles.input}
                value={newCardDetails}
                onChangeText={setNewCardDetails}
                placeholderTextColor={'#333'}
              />
              <View style={styles.alinghItems}>
                <View>
                  <TouchableOpacity style={styles.checkoutButton} onPress={handleAddCard}>
                    <Icon name={'save'} size={20} color={'#fff'}/>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.closeModal} onPress={() => setModalVisible(false)}>
                  <Icon name={'close'} size={20} color={'#fff'}/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  alinghItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '30%',
  },
  padding: {
    padding: 20,
  },
  addCard: {
    backgroundColor: '#008080',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },

  checkoutButton: {
    backgroundColor: '#008080',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  closeModal: {
    backgroundColor: '#d02d2d',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  saveCard: {
    color: '#fff',
    fontWeight: 'bold',
  },
  option: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  info: {
    flex: 1,
    marginLeft: 15,
  },
  type: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5d5c5c'
  },
  details: {
    fontSize: 14,
    color: '#838080'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
    borderRadius: 5,
    color: '#333'
  }
});

export default PaymentMethods;
