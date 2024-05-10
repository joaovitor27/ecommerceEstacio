import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';

interface Address {
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
}

const AddAddressScreen: React.FC = ({navigation}: any) => {
  const [address, setAddress] = useState<Address>({
    street: '',
    number: '',
    complement: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const handleChange = (name: keyof Address, value: string) => {
    if (value === "Clique aqui para selecionar") {
      // Não atualize o estado se o valor for a mensagem de placeholder
      return;
    }
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('Address Saved:', address);
    // Aqui você poderia adicionar a lógica para salvar o endereço no backend
    alert('Endereço salvo com sucesso!');
  };

  // Função placeholder para obter localização
  const handleGetLocation = () => {
    console.log('Obtendo localização...');
    navigation.navigate('Help');
  };
  const statesWithPlaceholder = [
    "Clique aqui para selecionar",
    "Acre - AC",
    "Alagoas - AL",
    "Amapá - AP",
    "Amazonas - AM",
    "Bahia - BA",
    "Ceará - CE",
    "Distrito Federal - DF",
    "Espírito Santo - ES",
    "Goiás - GO",
    "Maranhão - MA",
    "Mato Grosso - MT",
    "Mato Grosso do Sul - MS",
    "Minas Gerais - MG",
    "Pará - PA",
    "Paraíba - PB",
    "Paraná - PR",
    "Pernambuco - PE",
    "Piauí - PI",
    "Rio de Janeiro - RJ",
    "Rio Grande do Norte - RN",
    "Rio Grande do Sul - RS",
    "Rondônia - RO",
    "Roraima - RR",
    "Santa Catarina - SC",
    "São Paulo - SP",
    "Sergipe - SE",
    "Tocantins - TO"
  ];
  

  const states = [
    "Acre - AC",
    "Alagoas - AL",
    "Amapá - AP",
    "Amazonas - AM",
    "Bahia - BA",
    "Ceará - CE",
    "Distrito Federal - DF",
    "Espírito Santo - ES",
    "Goiás - GO",
    "Maranhão - MA",
    "Mato Grosso - MT",
    "Mato Grosso do Sul - MS",
    "Minas Gerais - MG",
    "Pará - PA",
    "Paraíba - PB",
    "Paraná - PR",
    "Pernambuco - PE",
    "Piauí - PI",
    "Rio de Janeiro - RJ",
    "Rio Grande do Norte - RN",
    "Rio Grande do Sul - RS",
    "Rondônia - RO",
    "Roraima - RR",
    "Santa Catarina - SC",
    "São Paulo - SP",
    "Sergipe - SE",
    "Tocantins - TO"
];
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Endereço</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
     
        
        <Text style={styles.label}>CEP</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleChange('zipCode', value)}
          value={address.zipCode}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Estado</Text>
        <Picker
          selectedValue={address.state}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) => handleChange('state', itemValue)}
          >
        {statesWithPlaceholder.map((state, index) => (
        <Picker.Item key={index} label={state} value={state} />
        ))}
        </Picker>

        <Text style={styles.label}>Cidade</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleChange('city', value)}
          value={address.city}
        />

        <View style={styles.row}>
          <View style={[styles.flexLarge, styles.fieldContainer]}>
            <Text style={styles.label}>Rua</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => handleChange('street', value)}
              value={address.street}
            />
          </View>
          <View style={[styles.flexSmall, styles.fieldContainer]}>
            <Text style={styles.label}>Número</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => handleChange('number', value)}
              value={address.number}
              keyboardType="numeric"
            />
          </View>
        </View>
        <Text style={styles.label}>Complemento</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleChange('complement', value)}
          value={address.complement}
        />

        <View style={styles.button}>
          <Button title="Salvar Endereço" onPress={handleSubmit} />
        </View>
        <View style={styles.button}>
          <Button title="Obter Localização Automaticamente" onPress={handleGetLocation} />
        </View>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  fieldContainer: {
    flexDirection: 'column',
  },
  flexLarge: {
    flex: 3, // Maior parte do espaço
  },
  flexSmall: {
    flex: 1, // Menor parte do espaço
  },
  input: {
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  button: {
    marginBottom: 10,
  },
  banner: {
    backgroundColor: '#008080',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#008080', // Ajuste para a cor verde que você deseja
    paddingVertical: 50,
    paddingHorizontal: 15,
    marginBottom: 20, // Espaço abaixo do cabeçalho
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    alignItems: 'center',
    flexDirection: 'row', // Se você quiser adicionar ícones ou mais elementos ao cabeçalho
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    flex: 1, // Isso garante que o título ocupe a maior parte do espaço se houver outros elementos
    marginLeft: 15, // Se houver um ícone antes do título, por exemplo
  }
});

export default AddAddressScreen;