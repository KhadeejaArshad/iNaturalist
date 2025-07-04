import { FlatList, Image, Pressable, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import Text from '../UI/SpText';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Feather from '@react-native-vector-icons/feather';
import { useSelector, useDispatch } from 'react-redux';
import { removefrom } from '../app/service/cartSlice';
import { useGetProductByIdQuery } from '../app/service/dummyData';
import { addtoCart } from '../app/service/cartSlice';

const cart = () => {
  const items = useSelector(state => state.cart.items);
  const Ids = items.map(item => item.id);
  const dispatch = useDispatch();
  const [pressedItems, setPressedItems] = useState({});

  const productQueries = Ids.map(id => useGetProductByIdQuery(id));
  const isLoading = productQueries.some(q => q.isLoading);
  const isError = productQueries.some(q => q.isError);
  const products = productQueries.map(q => q.data?.product).filter(Boolean);

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error loading one or more products</Text>;

  const selectedProducts = items.filter(item => pressedItems[item.id]);
  const subtotal = selectedProducts.reduce((sum, cartItem) => {
    const product = products.find(p => p._id === cartItem.id);
    if (!product) return sum;
    return sum + product.price * cartItem.count;
  }, 0);

  const renderItem = ({ item }) => {
    const isPressed = pressedItems[item._id] || false;

    const togglePressed = () => {
      setPressedItems(prev => ({
        ...prev,
        [item._id]: !prev[item._id],
      }));
    };

    const cartItem = items.find(i => i.id === item._id);
    const itemCount = cartItem?.count || 1;

    const handleIncrease = () => {
      dispatch(addtoCart({ id: item._id, count: 1 }));
    };

    const handleDecrease = () => {
      if (itemCount > 1) {
        dispatch(addtoCart({ id: item._id, count: -1 }));
      }
    };

    return (
      <View style={styles.textcontainer}>
        <Pressable
          style={[styles.checkbox, isPressed && { backgroundColor: 'black' }]}
          onPress={togglePressed}
        >
          {isPressed && <Feather name="check" size={24} color="white" />}
        </Pressable>

        <View style={styles.imagecontainer}>
          <Image source={{ uri: item.image }} style={styles.img} />
        </View>

        <View style={styles.desc}>
          <View style={{ flexDirection: 'row' }}>
            <Text color="black">{item.name} | </Text>
            <Text color="#7D7B7B">{item.category}</Text>
          </View>
          <Text color="#007537">${item.price}</Text>

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View
              style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}
            >
              <Pressable disabled={itemCount <= 1} onPress={handleDecrease}>
                <Feather
                  name="minus-square"
                  color={itemCount <= 1 ? '#7D7B7B' : 'black'}
                  size={24}
                />
              </Pressable>

              <Text color="black">{itemCount}</Text>

              <Feather
                name="plus-square"
                color="black"
                size={24}
                onPress={handleIncrease}
              />
            </View>

            <Pressable
              onPress={() => dispatch(removefrom(item._id))}
              style={styles.underline}
            >
              <Text color="black">Remove</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <FlatList
        data={products}
        keyExtractor={item => item._id}
        renderItem={renderItem}
      />

      {selectedProducts.length > 0 && (
        <View>
          <View style={styles.subtotal}>
            <Text size={16} color="black">
              SubTotal
            </Text>
            <Text size={16} color="black">
              ${subtotal}
            </Text>
          </View>

          <View style={styles.buttoncontainer}>
            <Pressable style={styles.button}>
              <Text marginH={12} size={16} alignment="center" color="white">
                Proceed to CheckOut
              </Text>
              <View style={{marginHorizontal:scale(12)}}>
                <Feather name="chevron-right" size={24} color="white" />
              </View>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

export default cart;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  textcontainer: {
    marginTop: verticalScale(12),
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scale(8),
  },
  checkbox: {
    width: scale(20),
    height: scale(20),
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: scale(4),
    marginHorizontal: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagecontainer: {
    width: scale(77),
    height: scale(77),
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(8),
  },
  underline: {
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  desc: {
    marginHorizontal: scale(8),
  },
  button: {
    backgroundColor: '#007537',
    flexDirection: 'row',

    width: '80%',

    height: verticalScale(50),
    borderRadius: moderateScale(12),
    justifyContent: 'space-between',

    alignItems: 'center',
  },
  buttoncontainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: verticalScale(30),
  },
  subtotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: verticalScale(35),
    marginHorizontal: scale(10),
    alignItems: 'center',
  },
});
