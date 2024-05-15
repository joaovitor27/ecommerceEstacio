import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Stars from '../../Components/Stars.tsx';
import Top from '../../Components/Top.tsx';
import {useFocusEffect} from '@react-navigation/native';
import {getCurrentUser} from '../../services/firebase/Auth.tsx';
import BuyService from '../../services/buy.tsx';
import {Buy} from '../../models/Buy.tsx';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {ItemCart} from '../../models/ItemCart.tsx';

const PreviousRequests: React.FC = () => {
  const [buy, setBuy] = useState<Buy[]>();
  const [selectedProducts, setSelectedProducts] = useState<ItemCart[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const buyService = new BuyService();
  useFocusEffect(
    useCallback(() => {
      setLoading(true)
      buyService.findAll({
        fieldPath: 'user',
        opStr: '==',
        value: getCurrentUser()?.uid,
      }).then((result) => {
        setLoading(false);
        setBuy(result);
      }).catch((error) => {
        console.error(error);
      });
    }, [])
  );

  const formatDate = (date: FirebaseFirestoreTypes.Timestamp) => {
    return new Date(date.toDate()).toLocaleDateString('pt-BR');
  }

  const openModal = (products: ItemCart[]) => {
    setSelectedProducts(products);
    setModalVisible(true);
  }

  const closeModal = () => {
    setSelectedProducts([]);
    setModalVisible(false);
  }

  function topList() {
    return (
      <>
        <Top title={'Meus pedidos'} subtitle={'Veja aqui todos os seus pedidos já feitos:'}/>
      </>
    );
  }

  function getUnidatePrice(item: ItemCart | undefined) {
    return item?.product?.unidade_price === 'KILO' ? 'por kg' : 'por Uni';
  }

  function getImage(item: ItemCart | undefined) {
    return item?.product?.image ? {uri: item?.product.image} : require('../../assets/profile.png');
  }


  return (
    <>
      {topList()}
      <View style={styles.container}>
        {loading ? <ActivityIndicator size="large"/> : (
          <FlatList
            data={buy}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => openModal(item.products)}>
                <View style={styles.option}>
                  <Icon name={'list-alt'} size={50} color={'#333'}/>

                  <View style={styles.info}>
                    <View>
                      <Text style={styles.title}>#PED{item.id}</Text>
                    </View>
                    <View style={styles.evaluationContainer}>
                      <Stars quantity={5} editable={true}/>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.label}>Total R$</Text>
                      <Text style={styles.value}>{item.total.toFixed(2)}</Text>
                    </View>
                  </View>
                  <View style={styles.statusAndDate}>
                    <Text style={styles.staticMessage}>Data: {formatDate(item.date)}</Text>
                    <Text style={styles.staticMessage}>Status: Entregue</Text>

                  </View>
                </View>
              </TouchableOpacity>
            )}
            onTouchStart={() => closeModal()}
          />
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Produtos</Text>
              <FlatList
                data={selectedProducts}
                keyExtractor={item => item.product.id}
                renderItem={({item}) => (
                  <View style={styles.modalItem}>
                    <View style={styles.imageContainer}>
                      <Image source={getImage(item)} style={styles.imageItem}/>
                    </View>
                    <View style={styles.itemDetails}>
                      <View style={styles.infoContainer}>
                        <Text style={styles.name}>{item.product.name}</Text>
                        <View style={styles.row}>
                          <Text style={styles.label}>R$</Text>
                          <Text style={styles.value}>{item.product?.price} <Text
                            style={styles.unidateText}>{getUnidatePrice(item)}</Text></Text>
                        </View>
                      </View>
                      <View style={styles.quantityContainer}>
                        <Text style={styles.quantity}>Quant: {item.quantity}</Text>
                      </View>
                    </View>
                  </View>
                )}
              />
              <Button title="Fechar" onPress={closeModal} color={'#008080'}/>
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
    backgroundColor: '#F3F2F3',
    justifyContent: 'center',
    flexGrow: 1,
  },
  value: {
    color: '#008080',
    fontSize: 18,
  },
  unidateText: {
    fontSize: 12,
    color: '#008080',
  },
  option: {
    backgroundColor: '#F6F6F6',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
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
  statusAndDate: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    maxHeight: '80%', // Defina a altura máxima aqui
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  imageItem: {
    width: 60,
    height: 60,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(0,128,128,0.32)',
  },
  infoContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#696969',
  },
  description: {
    color: '#a0a1a1',
    fontSize: 10,
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 5,
    color: '#008080',
  },
  iconContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  borderedItem: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: '#ddd',
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#696969',
  },
  quantityButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  trashIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
});

export default PreviousRequests;
