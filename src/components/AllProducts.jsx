import { StyleSheet, Text, View, Image, Pressable, ImageBackground } from 'react-native';
import React from 'react';
import { useGetAllProductQuery, useDeleteProductMutation } from '../app/service/dummyData';
import Feather from '@react-native-vector-icons/feather';
import { fonts } from '../utils/font';
import { colors } from '../utils/color/color';

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
      
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  return (
    <View style={styles.root}>
      <ImageBackground  source={{
          uri: 'https://images.pexels.com/photos/5942501/pexels-photo-5942501.jpeg',
        }}
      style={styles.bg} resizeMode='cover'>
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
                <Feather name="edit" color="#075B5E" size={20} onPress={()=>navigation.navigate('UpdateProduct',{product:p})}/>
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
      </ImageBackground>
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
    backgroundColor: 'white',
    borderRadius: 8,
    flexDirection: 'row',
    marginHorizontal: 10,
    borderWidth:2,
    borderColor:colors.dark
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
    borderWidth:2,
    borderColor:colors.dark
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
    bg: {
    flex: 1,
  },
});
