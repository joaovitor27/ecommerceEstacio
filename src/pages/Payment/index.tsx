import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '/home/joao/Documentos/projetos/JavaScript/ecommerceEstacio/src/routers/types-router.tsx'; // Ajuste o caminho conforme necessário

// Define os parâmetros que podem ser passados para esta tela pelo navegador
type PaymentPageNavigationProp = StackNavigationProp<RootStackParamList, 'Payment'>;

interface PaymentPageProps {
  navigation: PaymentPageNavigationProp;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ navigation }) => {
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  const [cardHolderName, setCardHolderName] = useState<string>('');

  const handlePayment = () => {
    // Lógica para processar o pagamento
    console.log("Processando pagamento...");
    // Aqui você implementaria a integração com o gateway de pagamento
    // Por exemplo, enviar os dados para seu backend ou diretamente para um SDK de pagamento
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Detalhes do Pagamento</Text>
      <TextInput
        style={styles.input}
        placeholder="Número do Cartão"
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Validade"
        value={expiryDate}
        onChangeText={setExpiryDate}
      />
      <TextInput
        style={styles.input}
        placeholder="CVV"
        value={cvv}
        onChangeText={setCvv}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Nome do Titular"
        value={cardHolderName}
        onChangeText={setCardHolderName}
      />
      <Button
        title="Finalizar Pagamento"
        onPress={handlePayment}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  }
});

export default PaymentPage;
