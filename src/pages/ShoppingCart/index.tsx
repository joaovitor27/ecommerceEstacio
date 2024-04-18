import React, {useEffect, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routers/types-router.tsx';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Top from '../../Components/Top.tsx';
import {getCurrentUser} from '../../services/firebase/Auth.tsx';
import CartService from '../../services/cart.tsx';
import {ItemCart} from '../../models/ItemCart.tsx';
import {useFocusEffect} from '@react-navigation/native';


interface ShoppingCartProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

export default function ShoppingCart({navigation}: ShoppingCartProps) {
  const [cartItems, setCartItems] = useState<ItemCart[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const cartService = new CartService();
      cartService.findAll({
        fieldPath: 'user',
        opStr: '==',
        value: getCurrentUser()?.uid,
      }).then((result) => {
        setCartItems(result);
      });
      return () => {
        // Código para limpeza (se necessário)
      };
    }, [])
  );

  const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const removeItem = (id: string) => {
    const cartService = new CartService();
    cartService.delete(id);
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const incrementQuantity = (id: string) => {
    setCartItems(cartItems.map((item => item.id === id ? {...item, quantity: item.quantity + 1} : item)));
  };

  const decrementQuantity = (id: string) => {
    if (cartItems.find((item) => item.id === id)?.quantity === 1) {
      return;
    }
    setCartItems(cartItems.map((item) => item.id === id ? {...item, quantity: item.quantity - 1} : item));
  };

  function getUnidatePrice(item: ItemCart | undefined) {
    return item?.product?.unidade_price === 'KILO' ? 'por kg' : 'por unidade';
  }

  function getImage(item: ItemCart | undefined) {
    return item?.product?.image ? {uri: item?.product.image} : require('../../assets/profile.png');
  }


  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Product', {productData: item})}>
      <View style={styles.imageContainer}>
        <Image source={getImage(item)} style={styles.image}/>
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
          <TouchableOpacity onPress={() => decrementQuantity(item.id)}>
            <Icon name={'minus'} size={10} color={'#008080'} style={styles.quantityButton}/>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => incrementQuantity(item.id)}>
            <Icon name={'plus'} size={10} color={'#008080'} style={styles.quantityButton}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => removeItem(item.id)}>
            <Icon name={'trash'} size={20} color={'#bb0000'} style={styles.trashIcon}/>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Top title={'Carrrinho'} subtitle={'Confira os produtos que você adicionou ao carrinho'}/>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {(cartItems.length === 0) ? (
            <Text style={styles.cartEmpty}>Seu carrinho está vazio!</Text>
          ) : (
            cartItems.map((item) => (
              <View key={item.id}>
                {renderItem({item})}
              </View>
            ))
          )}
        </ScrollView>
        <View style={styles.summary}>
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryText}>Total: R$ {total.toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Finalizar compra</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  cartEmpty: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
    color: 'rgba(0,128,128,0.58)',
  },
  card: {
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
  },
  unidateText: {
    fontSize: 12,
    color: '#008080',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  image: {
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
  value: {
    color: '#008080',
    fontSize: 18,
  },
  iconContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    position: 'relative',
  },
  scrollViewContent: {
    paddingBottom: 50,
    flexGrow: 1,
    justifyContent: 'center',
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
  quantityButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantity: {
    fontSize: 16,
    fontWeight:
      'bold',
  },
  trashIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  summaryContainer: {
    backgroundColor: '#eeeaea',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'flex-end',
  },
  summary: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 10,
    paddingTop: 10,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#008080',
    padding: 20,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
