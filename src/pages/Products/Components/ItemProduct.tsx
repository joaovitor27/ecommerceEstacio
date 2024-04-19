import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../routers/types-router.tsx';
import {ProductData} from '../../../models/ProductData.tsx';
import ProductService from '../../../services/product.tsx';
import Icon from 'react-native-vector-icons/FontAwesome';
import CartService from '../../../services/cart.tsx';
import {getCurrentUser} from '../../../services/firebase/Auth.tsx';
import {firebase} from '@react-native-firebase/firestore';

interface ItemProductProps {
  navigation: StackNavigationProp<RootStackParamList>;
  productData: ProductData | null;
}

export default function ItemProduct({navigation, productData}: ItemProductProps) {
  const [product, setProduct] = useState<ProductData | null>();

  useEffect(() => {
    if (!productData) return;
    if (!productData.id) {
      setProduct(productData);
      return;
    }
    const productService = new ProductService()
    productService.findId(productData.id).then((result) => {
      return setProduct(result);
    });

  }, []);

  function getDescrition() {
    if (!product) return '';
    return product?.description?.length > 30 ? `${product.description.substring(0, 30)}...` : product.description;
  }

  function getUnidatePrice() {
    return product?.unidade_price === 'KILO' ? 'por kg' : 'por Uni';
  }

  function formatPrice(price?: number) {
    if (price === undefined) return '';
    return price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
  }

  function getImage() {
    return product?.image ? {uri: product.image} : require('../../../assets/profile.png');
  }

  async function addToCart(product: ProductData | null | undefined) {
    if (!product) return;
    if (!getCurrentUser()) return;
    const serviceCart = new CartService();
    await serviceCart.add({
      user: getCurrentUser()?.uid,
      product: firebase.firestore().doc('products/' + product.id),
      quantity: 1,
    });
  }

  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Product', {productData: product})}>
      <View style={styles.imageContainer}>
        <Image source={getImage()} style={styles.image}/>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{product?.name}</Text>
        <Text style={styles.description}>{getDescrition()}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>R$</Text>
          <Text style={styles.value}>{formatPrice(product?.price)} {getUnidatePrice()}</Text>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconContainer} onPress={() => addToCart(product)}>
          <Icon name="shopping-cart" size={24} color={'#008080'}/>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
});
