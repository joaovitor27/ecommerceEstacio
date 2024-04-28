import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Address {
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
}

const AddAddressScreen: React.FC = () => {
  const [address, setAddress] = useState<Address>({
    street: '',
    number: '',
    complement: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const handleChange = (name: keyof Address, value: string) => {
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('Address Saved:', address);
    // Aqui você poderia adicionar a lógica para salvar o endereço no backend
    alert('Endereço salvo com sucesso!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.label}>Rua</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleChange('street', value)}
          value={address.street}
        />
        <Text style={styles.label}>Número</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleChange('number', value)}
          value={address.number}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Complemento</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleChange('complement', value)}
          value={address.complement}
        />
        <Text style={styles.label}>Cidade</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleChange('city', value)}
          value={address.city}
        />
        <Text style={styles.label}>Estado</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleChange('state', value)}
          value={address.state}
        />
        <Text style={styles.label}>CEP</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleChange('zipCode', value)}
          value={address.zipCode}
          keyboardType="numeric"
        />
        <Button title="Salvar Endereço" onPress={handleSubmit} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  input: {
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  }
});

export default AddAddressScreen;
