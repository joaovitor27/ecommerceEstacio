import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, Modal, TextInput, Alert } from 'react-native';

const PaymentMethods = () => {
  const [paymentOptions, setPaymentOptions] = useState([
    { id: '1', type: 'Visa **** **** **** 1234', details: 'Cartão de Crédito' },
    { id: '2', type: 'Mastercard **** **** **** 5678', details: 'Cartão de Crédito' },
    { id: '3', type: 'Elo **** **** **** 9012', details: 'Cartão de Crédito' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newCardType, setNewCardType] = useState('');
  const [newCardDetails, setNewCardDetails] = useState('');

  const renderOption = ({ item }) => (
    <TouchableOpacity style={styles.option}>
      <View style={styles.info}>
        <Text style={styles.type}>{item.type}</Text>
        <Text style={styles.details}>{item.details}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleAddCard = () => {
    if (!newCardType.trim() || !newCardDetails.trim()) {
      Alert.alert("Erro", "Preencha todos os campos para adicionar o cartão.");
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
    <View style={styles.container}>
      <FlatList
        data={paymentOptions}
        renderItem={renderOption}
        keyExtractor={(item) => item.id}
      />
      <Button title="Adicionar Novo Cartão" onPress={() => setModalVisible(true)} />
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
              placeholder="Tipo de Cartão"
              style={styles.input}
              value={newCardType}
              onChangeText={setNewCardType}
            />
            <TextInput
              placeholder="Detalhes do Cartão"
              style={styles.input}
              value={newCardDetails}
              onChangeText={setNewCardDetails}
            />
            <Button title="Salvar Cartão" onPress={handleAddCard} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  details: {
    fontSize: 14,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
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
  }
});

export default PaymentMethods;
