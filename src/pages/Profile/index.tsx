// Importação de bibliotecas e componentes do React e React Native
import React from 'react';
import { Alert, View, Image, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routers/types-router.tsx';

// Importação da imagem de perfil do usuário
import profilePic from '../../assets/perfil.png';

// Importação de um componente customizado para exibição de ícones
import Icon from './Icon';

import Top from '../../Components/Top.tsx';
import { logout } from '../../services/firebase/Auth.tsx';
// No react, tudo o que você for usar numa página você tem que importar.
// Não sei se é obrigatório, mas sempre vejo isso sendo feito primeiro no código,
// antes de tudo.
// Por exemplo: eu quero fazer uma página com flatlist, então eu tenho que puxar antes
// o import dele -> import {FlatList} from 'react-native';


// Definição de um tipo específico para as propriedades de navegação do componente Profile
type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

// Interface para as props do componente Profile, incluindo as de navegação
interface Props {
  navigation: ProfileScreenNavigationProp;
}

// As "consts" são tipo funções, você constrói elas pra depois puxar no "return" .

// Componente funcional sem estado para exibir o cabeçalho do perfil
//*traduzindo* -> função para construir o header
const ProfileHeader = () => (
  <Top title={'Perfil'}>
    <View style={{ alignItems: 'center', marginBottom: 20 }}>
      <Image source={profilePic} style={{ width: 80, height: 80, borderRadius: 40, top: 10 }} />
      <Text style={{ marginTop: 10, fontSize: 20, fontWeight: 'bold' }}>Nome do Usuário</Text>
    </View>
  </Top>
);


// Componente principal Profile, que recebe props incluindo funções de navegação
//*traduzindo* -> função para construir o body
const Profile: React.FC<Props> = ({ navigation }) => {

// Lista de opções de configurações do usuário
//Essa função (const options) constrói cada opção/container.
  const options = [
  {
      id: '1',
      icon: 'shopping-outline',
      title: 'Meus Pedidos',
      description: 'Visualize e acompanhe seus pedidos',
      onPress: () => {navigation.navigate('MyPurchases')},
    },
    {
      id: '2',
      icon: 'map-marker-outline',
      title: 'Endereços',
      description: 'Gerencie seus endereços',
      onPress: () => {navigation.navigate('Address')},
    },
    {
      id: '3',
      icon: 'credit-card-outline',
      title: 'Formas de Pagamento',
      description: 'Suas opções de pagamento',
      onPress: () => {navigation.navigate('PaymentMethods')},
    },
    {
      id: '4',
      icon: 'help-circle-outline',
      title: 'Ajuda',
      description: 'Central de suporte',
      onPress: () => {navigation.navigate('Help')},
    },
    {
      id: '5',
      icon: 'exit-to-app',
      title: 'Sair',
      description: 'Desconectar da conta',
      onPress: () => {logout().then(_r =>
       navigation.navigate('InitialPage')
      )},
    },
  ];

  // Função para renderizar cada item da lista de opções
  const renderOption = ({ item }) => (
    <TouchableOpacity style={styles.option} onPress={item.onPress}>
      <Icon library="MaterialCommunityIcons" name={item.icon} size={35} color="#333" />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <Icon library="MaterialIcons" name="keyboard-arrow-right" color="#999" size={18} />
    </TouchableOpacity>
  );

  // Renderização do componente Profile
  // O "return" é a renderização da página. Se você quer carregar algo na página,
  // tem que colocar dentro de return.
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={ProfileHeader}
        data={options}
        renderItem={renderOption}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

// "const styles" é onde você faz a estilização.
// EU prefiro fazer a estilização na página , depois de todo o código,
// ao invés de fazer um arquivo style.

// Estilos utilizando StyleSheet para otimização
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Estilos para cada opção da lista
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
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  // Estilos para a área de texto de cada opção
  info: {
    flex: 1,
    marginLeft: 15,
  },
  // Estilos para o título de cada opção
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  // Estilos para a descrição de cada opção
  description: {
    fontSize: 10,
    color: '#666',
  },
});

// Exportação do componente Profile para uso em outros lugares do aplicativo
// Não sei exatamente pra que serve esse export, mas pelo jeito
// tem que ser puxado NO FINAL, DEPOIS DE TUDO, assim como o import
// tem que ser puxado no início.
export default Profile;


// Pelo que eu entendi, toda página segue esse padrão:
// Imports
// Constants / Funções
// Return
// Styles
// Export

// Pra conseguir criar a rota da página, você tem que colocar o diretório da página
// que está em src->routers->navigation.tsx
// Ex: essa página aqui é a
// import Profile from '../pages/Profile'; (que está na linha 13)
// Ex 2: Meus pedidos, que está na página Profile é
// <Stack.Screen name='MyPurchases' component={MyPurchases}/> (na linha 95)
