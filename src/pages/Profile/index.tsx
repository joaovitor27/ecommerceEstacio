import React from 'react';
import { View, Image, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routers/types-router';
import profilePic from '../../assets/perfil.png';
import Icon from './Icon';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

const ProfileHeader = () => (
  <View style={{ alignItems: 'center', marginBottom: 20 }}>
    <Image source={profilePic} style={{ width: 80, height: 80, borderRadius: 40, top: 10 }} />
    <Text style={{ marginTop: 10, fontSize: 20, fontWeight: 'bold' }}>Nome do Usuário</Text>
  </View>
);

const Profile: React.FC<Props> = ({ navigation }) => {
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
      onPress: () => {},
    },
    {
      id: '3',
      icon: 'credit-card-outline',
      title: 'Formas de Pagamento',
      description: 'Suas opções de pagamento',
      onPress: () => {},
    },
    {
      id: '4',
      icon: 'help-circle-outline',
      title: 'Ajuda',
      description: 'Central de suporte',
      onPress: () => {},
    },
    {
      id: '5',
      icon: 'exit-to-app',
      title: 'Sair',
      description: 'Desconectar da conta',
      onPress: () => {},
    },
  ];

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
  description: {
    fontSize: 10,
    color: '#666',
  },
});

export default Profile;
