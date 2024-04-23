import {RootStackParamList} from '../../../routers/types-router.tsx';
import {StackNavigationProp} from '@react-navigation/stack';
import {ItemCart} from '../../../models/ItemCart.tsx';
import {Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React from 'react';


interface ItemCartProps {
  navigation: StackNavigationProp<RootStackParamList>;
  item: ItemCart;
  getImage: (item: ItemCart) => ImageSourcePropType | { uri: string };
  getUnidatePrice: (item: ItemCart) => string;
  decrementQuantity: (id: string) => void;
  incrementQuantity: (id: string) => void;
  removeItem: (id: string) => void;
}

export default function ItemCard({
                                   navigation,
                                   item,
                                   getImage,
                                   getUnidatePrice,
                                   decrementQuantity,
                                   incrementQuantity,
                                   removeItem
                                 }: ItemCartProps) {

  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Product', {productData: item.product})}>
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
          <TouchableOpacity onPress={() => decrementQuantity(item.id as string)}>
            <Icon name={'minus'} size={10} color={'#008080'} style={styles.quantityButton}/>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => incrementQuantity(item.id as string)}>
            <Icon name={'plus'} size={10} color={'#008080'} style={styles.quantityButton}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => removeItem(item.id as string)}>
            <Icon name={'trash'} size={20} color={'#bb0000'} style={styles.trashIcon}/>
          </TouchableOpacity>
        </View>
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
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    position: 'relative',
  }, headerText: {
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
