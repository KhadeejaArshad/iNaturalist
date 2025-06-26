import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import { useGetAllProductQuery, useDeleteProductMutation } from '../app/service/dummyData';
import Feather from '@react-native-vector-icons/feather';
import { fonts } from '../utils/font';

const AllProducts = ({ navigation }) => {
  const { data, isError, isLoading } = useGetAllProductQuery();
  const [deleteProduct, { isLoading: deleting }] = useDeleteProductMutation();

  if (isError) {
    return <Text>Oh no! We got an error!</Text>;
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id).unwrap();
      // Optionally show a toast/snackbar
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  return (
    <View style={styles.root}>
      {data?.products.map((p) => (
        <Pressable
          key={p._id}
          style={styles.productContainer}
          onPress={() => navigation.navigate('SpecificProduct', { id: p._id })}
        >
          <Image style={styles.image} source={{ uri: p.image }} resizeMode="contain" />
          <View style={styles.productdesc}>
            <Text style={styles.productTitle}>{p.name}</Text>
            <Text style={styles.productDescription} numberOfLines={2}>
              {p.bio}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={styles.productPrice}>${p.price.toFixed(2)}</Text>
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <Feather name="edit" color="#075B5E" size={20} />
                <Feather
                  name="trash-2"
                  color="#075B5E"
                  size={20}
                  onPress={() => handleDeleteProduct(p._id)}
                />
              </View>
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default AllProducts;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  productContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#E7EFC7',
    borderRadius: 8,
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  productTitle: {
    fontSize: 18,
    fontFamily: fonts.bold,
  },
  productDescription: {
    fontSize: 14,
    color: '#555',
    width: 250,
    fontFamily: fonts.regular,
  },
  image: {
    width: 100,
    height: 100,
  },
  productPrice: {
    marginTop: 8,
    fontSize: 16,
    fontFamily: fonts.bold,
    color: '#075B5E',
  },
  productdesc: {
    marginHorizontal: 8,
  },
});
