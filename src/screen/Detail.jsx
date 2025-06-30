import { Image, Pressable, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { useLayoutEffect } from 'react';
import { useGetProductByIdQuery } from '../app/service/dummyData';
import Text from '../UI/SpText';
import Feather from '@react-native-vector-icons/feather';

const Detail = ({ navigation, route }) => {
  const id = route?.params?.id;
  const { data, isError, isLoading } = useGetProductByIdQuery(id);
  const [count, setCount] = useState(0);
  const [prize, setPrize] = useState(0);
  const isDisabled = count === 0;

  useLayoutEffect(() => {
    if (data?.product?.name) {
      navigation.setOptions({ title: data.product.name,
          headerTitleAlign: 'center'
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
            <Pressable disabled={count === 0} onPress={handleDescrease}>
              <Feather
                name="minus-square"
                color={count === 0 ? '#7D7B7B' : 'black'}
                size={24}
              />
            </Pressable>

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
          <Pressable
            style={[
              styles.button,
              { backgroundColor: isDisabled ? 'gray' : '#007537' },
            ]}
            disabled={isDisabled}
          >
            <Text weight="bold" size={16} alignment="center" color="white">
              Add to Cart
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default Detail;

const styles = StyleSheet.create({
  imagecontainer: {
    width: 410,
    height: 268.31036376953125,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  catcontainer: {
    backgroundColor: '#009245',
    alignSelf: 'flex-start',
    paddingBottom: 4,
    paddingTop: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  category: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 12,
  },
  button: {
    backgroundColor: '#007537',

    width: '100%',

    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  container: {
    padding: 20,
  },

  buttoncontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 60,
  },
});
