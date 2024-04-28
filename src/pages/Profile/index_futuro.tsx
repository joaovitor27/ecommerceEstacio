import React, { useState, useEffect } from 'react';
import { Alert, View, Image, FlatList, Text, TouchableOpacity, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routers/types-router.tsx';
import profilePic from '../../assets/perfil.png';

import Icon from './Icon';
import Top from '../../Components/Top.tsx';
import { launchImageLibrary } from 'react-native-image-picker';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

const Profile: React.FC<Props> = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    async function requestPermissions() {
      const permissions = [PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.CAMERA];
      const result = await PermissionsAndroid.requestMultiple(permissions);
      if (result[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] !== PermissionsAndroid.RESULTS.GRANTED ||
          result[PermissionsAndroid.PERMISSIONS.CAMERA] !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permissions not granted', 'You need to grant storage and camera permissions to use this feature.');
      }
    }

    if (Platform.OS === 'android') {
      requestPermissions();
    }
  }, []);

  const selectImage = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      mediaType: 'photo',
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.assets[0].uri };
        setProfileImage(source);
      }
    });
  };

  const ProfileHeader = () => (
    <Top title={'Perfil'}>
      <View style={styles.container}>
        <TouchableOpacity onPress={selectImage}>
          <Image source={profileImage || profilePic} style={styles.profileImage} />
        </TouchableOpacity>
        <Text style={styles.userName}>Nome do Usuário</Text>
      </View>
    </Top>
  );

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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    marginTop: 10,
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

export default Profile;
