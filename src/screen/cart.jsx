import { Image, Pressable, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import Text from '../UI/SpText';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Feather from '@react-native-vector-icons/feather';
import { useSelector,useDispatch } from 'react-redux';
import { removefrom } from '../app/service/cartSlice';

const cart = ({ route }) => {
  const data = route?.params?.data;
  const count = route?.params?.count;
  const isDisabled = counter === 0;
  const [counter, setCounter] = useState(count);
  const Ids = useSelector(state => state.cart.ids);
  console.log(Ids);
  
  const dispatch=useDispatch();

  

  const [pressed, setPressed] = useState(false);
  const handleCount = () => {
    setCounter(counter + 1);
  };
  const handleDescrease = () => {
    setCounter(counter - 1);
  };
  if (!data && !count) {
    return (
      <View style={styles.root}>
        <View style={styles.textcontainer}>
          <Text color="black" alignment="center">
            Your cart is currently empty.
          </Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.root}>
      <View style={styles.textcontainer}>
        <Pressable
          style={[styles.checkbox, pressed && { backgroundColor: 'black' }]}
          onPress={() => setPressed(!pressed)}
        >
          {pressed && <Feather name="check" size={24} color="white" />}
        </Pressable>

        <View style={styles.imagecontainer}>
          <Image source={{ uri: data?.product?.image }} style={styles.img} />
        </View>
        <View style={styles.desc}>
          <View style={{ flexDirection: 'row' }}>
            <Text color="black">{data?.product?.name} |</Text>
            <Text color="#7D7B7B">{data?.product?.category}</Text>
          </View>
          <View>
            <Text color="#007537">${data?.product?.price}</Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View
              style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}
            >
              <Pressable disabled={isDisabled} onPress={handleDescrease}>
                <Feather
                  name="minus-square"
                  color={counter === 0 ? '#7D7B7B' : 'black'}
                  size={24}
                />
              </Pressable>

              <Text color="black">{counter}</Text>
              <Feather
                name="plus-square"
                color="black"
                size={24}
                onPress={handleCount}
              />
            </View>
            <Pressable onPress={()=>dispatch(removefrom(data.product._id))} style={styles.underline}>
              <Text color="black">Remove</Text>
            </Pressable>
          </View>
        </View>
      </View>
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
    marginHorizontal:scale(8)
  },
  checkbox: {
    width: scale(20),
    height: scale(20),
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: scale(4),
    marginHorizontal: scale(8),
   
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
});
