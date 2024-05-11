import React, {useCallback, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routers/types-router.tsx';
import {ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Top from '../../Components/Top.tsx';
import {getCurrentUser} from '../../services/firebase/Auth.tsx';
import CartService from '../../services/cart.tsx';
import {ItemCart} from '../../models/ItemCart.tsx';
import {useFocusEffect} from '@react-navigation/native';
import ItemCard from './components/itemCard.tsx';
import BuyService from '../../services/buy.tsx';


interface ShoppingCartProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

export default function ShoppingCart({navigation}: ShoppingCartProps) {
  const [cartItems, setCartItems] = useState<ItemCart[]>([]);
  const [loading, setLoading] = useState(true);
  const serviceCart = new CartService();

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      serviceCart.findAll({
        fieldPath: 'user',
        opStr: '==',
        value: getCurrentUser()?.uid,
      }).then((result) => {
        setLoading(false);
        setCartItems(result);
      }).catch((error) => {
        console.error(error);
      });
    }, [])
  );

  const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const removeItem = (id: string) => {
    serviceCart.delete(id).then(r => r);
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const incrementQuantity = (id: string) => {
    setCartItems(cartItems.map(((item) => {
      if (item.id !== id) {
        return item;
      }
      serviceCart.update(id, {quantity: item.quantity + 1}).then(r => r);
      return {...item, quantity: item.quantity + 1}
    })));
  };

  const decrementQuantity = (id: string) => {
    if (cartItems.find((item) => item.id === id)?.quantity === 1) {
      return;
    }
    setCartItems(cartItems.map((item) => {
      if (item.id !== id) {
        return item;
      }
      serviceCart.update(id, {quantity: item.quantity - 1}).then(r => r);
      return {...item, quantity: item.quantity - 1}
    }));
  };

  function getUnidatePrice(item: ItemCart | undefined) {
    return item?.product?.unidade_price === 'KILO' ? 'por kg' : 'por Uni';
  }

  function getImage(item: ItemCart | undefined) {
    return item?.product?.image ? {uri: item?.product.image} : require('../../assets/profile.png');
  }

  function finish() {
    const buyService = new BuyService();
    const buy = {
      user: getCurrentUser()?.uid as string,
      products: cartItems.map((item) => {
        return {
          product: item.product.id,
          quantity: item.quantity,
        }
      }),
      date: new Date(),
      total: total,
    };

    buyService.add(buy).then(() => {
      serviceCart.deleteAll(cartItems).then(() => {
        navigation.navigate('MyPurchases');
      });
    });
  }

  return (
    <>
      <Top title={'Carrrinho'} subtitle={'Confira os produtos que você adicionou ao carrinho!'}/>
      <View style={styles.container}>
        {loading ? <ActivityIndicator size="large"/> : (
          <>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              {(cartItems.length === 0) ? (
                <Text style={styles.cartEmpty}>Seu carrinho está vazio!</Text>
              ) : (
                cartItems.map((item) => (
                  <ItemCard navigation={navigation}
                            item={item}
                            getImage={getImage}
                            getUnidatePrice={getUnidatePrice}
                            decrementQuantity={decrementQuantity}
                            incrementQuantity={incrementQuantity}
                            removeItem={removeItem}
                            key={item.id}/>
                ))
              )}
            </ScrollView>
            <View style={styles.summary}>
              <View style={styles.summaryContainer}>
                <Text style={styles.summaryText}>Total: R$ {total.toFixed(2)}</Text>
              </View>
              <TouchableOpacity style={cartItems.length !== 0 ? styles.checkoutButton : styles.checkoutButtonDisabled}
                                onPress={finish} disabled={cartItems.length === 0}>
                <Text style={styles.checkoutText}>Finalizar compra</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
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
  container: {
    flex: 1,
    justifyContent: 'center',
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  scrollViewContent: {
    paddingBottom: 50,
    flexGrow: 1,
    justifyContent: 'center',
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
    color: '#696969',
  },
  checkoutButton: {
    backgroundColor: '#008080',
    padding: 20,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },

  checkoutButtonDisabled: {
    backgroundColor: '#ccc',
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
