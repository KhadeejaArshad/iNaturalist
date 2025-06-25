import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import { useGetProductByIdQuery } from '../app/service/dummyData';
import React from 'react';
import { useLayoutEffect } from 'react';
import { fonts } from '../utils/font';

const SpecificProduct = ({ route, navigation }) => {
  const id = route?.params?.id;
  const { data, isError, isLoading } = useGetProductByIdQuery(id);
  useLayoutEffect(() => {
    if (data?.product?.name) {
      navigation.setOptions({ title: data.product.name });
    }
  }, [navigation, data]);

  if (isError) {
    return <Text>OhhNo we got an error!!!!!</Text>;
  }
  if (isLoading) {
    return <Text>Loading......</Text>;
  }

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.centered}>
        <View style={styles.imagecontainer}>
          <Image
            style={styles.image}
            source={{ uri: data?.product.image }}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.header}>What you should know?</Text>
      </View>

      <View style={styles.detailSection}>
        <View style={styles.productDesccard}>
          <Text style={styles.heading}>Description</Text>
          <Text style={styles.productDescription}>{data?.product.bio}</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.productContainer}>
            <Text style={styles.heading}>Category</Text>
            <Text style={styles.productDescription}>
              {data?.product.category}
            </Text>
          </View>

          <View style={styles.productContainer}>
            <Text style={styles.heading}>Size</Text>
            <Text style={styles.productDescription}>{data?.product.size}</Text>
          </View>

          <View style={styles.productContainer}>
            <Text style={styles.heading}>Price</Text>
            <Text style={styles.productDescription}>
              ${data?.product.price}
            </Text>
          </View>
        </View>
      </View>
     
    </ScrollView>
  );
};

export default SpecificProduct;
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  centered: {
    alignItems: 'center',
  },
  imagecontainer: {
    width: 420,
    height: 350,
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  name: {
    color: '#075B5E',
    fontWeight: 'bold',
    fontSize: 28,
    marginTop: 10,
    marginHorizontal: 16,
  },
  detailSection: {
    backgroundColor: '#D1D8BE',

    borderRadius: 16,
    margin: 24,
    paddingBottom: 22,
    marginVertical: 20,
  },
  productDesccard: {
    marginTop: 10,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    marginHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 16,
    marginHorizontal: 10,
  },
  productContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  heading: {
    fontSize: 16,
    marginBottom: 8,
    color: '#075B5E',
    fontFamily: fonts.bold,
  },
  productDescription: {
    color: '#555',
    fontFamily: fonts.regular,
  },
  header: {
    fontSize: 22,
    color: '#075B5E',
    marginTop: 10,

    fontFamily: fonts.bold,
  },
  button:{
    backgroundColor:'#2D5523'
  }
});
