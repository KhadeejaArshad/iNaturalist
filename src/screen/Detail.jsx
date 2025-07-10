import { Image, TouchableOpacity, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { useLayoutEffect } from 'react';
import { useGetProductByIdQuery } from '../app/service/dummyData';
import Text from '../UI/SpText';
import Feather from '@react-native-vector-icons/feather';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { useSelector, useDispatch } from 'react-redux';
import { addtoCart } from '../app/service/cartSlice';

const Detail = ({ navigation, route }) => {
  const id = route?.params?.id;
  const { data, isError, isLoading } = useGetProductByIdQuery(id);
  const [count, setCount] = useState(0);
  const [prize, setPrize] = useState(0);
  const isDisabled = count === 0;
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (data?.product?.name) {
      navigation.setOptions({
        title: data.product.name,
        headerTitleAlign: 'center',
      });
    }
  }, [navigation, data]);
  const handleCount = () => {
    setCount(count + 1);
    setPrize(prize + data.product.price);
  };
  const handleDescrease = () => {
    setCount(count - 1);
    setPrize(prize - data.product.price);
  };
  return (
    <>
      <View style={styles.imagecontainer}>
        <Image source={{ uri: data?.product?.image }} style={styles.img} />
      </View>
      <View style={{ marginHorizontal: 34 }}>
        <View style={styles.category}>
          <View style={styles.catcontainer}>
            <Text>Plants</Text>
          </View>
          <View style={styles.catcontainer}>
            <Text>{data?.product?.category}</Text>
          </View>
        </View>
        <Text size={24} color="#007537">
          ${data?.product?.price}
        </Text>
        <View
          style={{
            borderBottomWidth: 0.65,
            borderColor: '#ABABAB',
            marginVertical: 15,
          }}
        >
          <Text color="#3A3A3A" size={16} weight="bold">
            Details
          </Text>
        </View>
        <View
          style={{
            borderBottomWidth: 0.65,
            borderColor: '#ABABAB',
            marginVertical: 15,
          }}
        >
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text color="#3A3A3A" size={14}>
              Size
            </Text>
            <Text color="#3A3A3A" size={14}>
              {data?.product?.size}
            </Text>
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 0.65,
            borderColor: '#ABABAB',
            marginVertical: 15,
          }}
        >
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text color="#3A3A3A" size={14}>
              Origin
            </Text>
            <Text color="#3A3A3A" size={14}>
              Africa
            </Text>
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 0.65,
            borderColor: '#ABABAB',
            marginVertical: 15,
          }}
        >
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text color="#3A3A3A" size={14}>
              Status
            </Text>
            <Text color="#007537" size={14}>
              156 items left
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text color="black">You picked {count} item</Text>
          <Text color="black">Subtotal</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
            <TouchableOpacity disabled={count === 0} onPress={handleDescrease}>
              <Feather
                name="minus-square"
                color={count === 0 ? '#7D7B7B' : 'black'}
                size={24}
              />
            </TouchableOpacity>

            <Text color="black">{count}</Text>
            <Feather
              name="plus-square"
              color="black"
              size={24}
              onPress={handleCount}
            />
          </View>
          <View>
            <Text color="black" size={24}>
              ${prize}
            </Text>
          </View>
        </View>

        <View style={styles.buttoncontainer}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: isDisabled ? 'gray' : '#007537' },
            ]}
            disabled={isDisabled}
            onPress={() => {
              console.log(id);
              
              dispatch(addtoCart({id:id, count:count }));
              navigation.navigate('cart');
            }}
          >
            <Text weight="bold" size={16} alignment="center" color="white">
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Detail;

const styles = StyleSheet.create({
  imagecontainer: {
    width: scale(410),
    height: scale(268.31036376953125),
  },
  img: {
    width: '100%',
    height: '100%',
  },
  catcontainer: {
    backgroundColor: '#009245',
    alignSelf: 'flex-start',
    paddingBottom: verticalScale(4),
    paddingTop: verticalScale(4),
    paddingHorizontal: scale(8),
    borderRadius: moderateScale(4),
  },
  category: {
    flexDirection: 'row',
    gap: scale(10),
    marginVertical: verticalScale(12),
  },
  button: {
    backgroundColor: '#007537',

    width: '100%',

    height: verticalScale(50),
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    marginVertical: verticalScale(10),
    marginHorizontal: scale(10),
    alignItems: 'center',
  },
  container: {
    padding: moderateScale(20),
  },

  buttoncontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: verticalScale(30),
  },
});
