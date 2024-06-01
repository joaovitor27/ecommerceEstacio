import React, {useState} from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routers/types-router.tsx';

type HelpScreenRouteProp = RouteProp<RootStackParamList, 'Help'>;
type HelpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Help'>;

interface HelpProps {
  route: HelpScreenRouteProp;
  navigation: HelpScreenNavigationProp;
}

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <View style={styles.faqItem}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.questionContainer}>
        <Text style={styles.question}>{question}</Text>
        <Text style={styles.symbol}>{expanded ? '-' : '+'}</Text>
      </TouchableOpacity>
      {expanded && <Text style={styles.answer}>{answer}</Text>}
    </View>
  );
};

const Help: React.FC<HelpProps> = () => {
  const faqs: FAQItemProps[] = [
    {
      question: 'Como entro em contato com alguém de sua equipe?',
      answer: 'Você pode ligar para o número de telefone (86)12345-6788'
    },
    {
      question: 'Quais são os métodos de pagamento aceitos?',
      answer: 'Aceitamos cartões de crédito, débito, e pagamentos via PayPal.'
    },
    {
      question: 'Como posso rastrear meu pedido?',
      answer: 'Você pode rastrear seu pedido acessando a seção \'Meus Pedidos\' no aplicativo e clicando no número de rastreamento.'
    },
    {
      question: 'Qual é a política de devolução?',
      answer: 'Aceitamos devoluções dentro de 30 dias após a entrega. O item deve estar em sua embalagem original e em perfeito estado.'
    },
    {
      question: 'Posso alterar meu pedido após a confirmação?',
      answer: 'Após a confirmação, não é possível alterar o pedido. Você pode cancelar e fazer um novo pedido, se necessário.'
    },
    {
      question: 'Como posso cancelar meu pedido?',
      answer: 'Para cancelar seu pedido, acesse a seção \'Meus Pedidos\', selecione o pedido que deseja cancelar e clique em \'Cancelar Pedido\'.'
    },
    {
      question: 'Quanto tempo leva para meu pedido ser entregue?',
      answer: 'O prazo de entrega varia de acordo com a sua localização e o método de envio escolhido, geralmente entre 5 a 10 dias úteis.'
    },
    {
      question: 'Vocês oferecem frete grátis?',
      answer: 'Oferecemos frete grátis para pedidos acima de R$150,00.'
    },
    {
      question: 'Como posso aplicar um código de desconto?',
      answer: 'Você pode aplicar um código de desconto na página de checkout, no campo \'Código de Desconto\'.'
    },
    {
      question: 'O que faço se meu pedido chegar danificado?',
      answer: 'Se seu pedido chegar danificado, entre em contato com nosso suporte ao cliente pelo telefone (86)12345-6789 ou pelo e-mail suporte@seuapp.com.'
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.banner}>
        <Image source={require('../../assets/tomateAjuda.png')} style={styles.bannerImage} />
        <Text style={styles.title}>Precisa de ajuda?</Text>
      </View>
      <View style={styles.faqContainer}>
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </View>
    </ScrollView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  banner: {
    width: width,
    backgroundColor: '#008080',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    width: 100,
    height: 100,
    marginTop: 20,
    borderRadius: 50,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#fff',
  },
  faqContainer: {
    width: '100%',
    padding: 5,
  },
  faqItem: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
  },
  question: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  symbol: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#008080',
  },
  answer: {
    fontSize: 14,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: '#666',
  },
});

export default Help;
