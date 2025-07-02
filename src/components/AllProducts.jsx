import { StyleSheet, Text, View, Image, Pressable, ImageBackground,SafeAreaView,ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import { useGetAllProductQuery, useDeleteProductMutation } from '../app/service/dummyData';
import Feather from '@react-native-vector-icons/feather';
import { fonts } from '../utils/font';
import { colors } from '../utils/color/color';
import { useDispatch,useSelector } from 'react-redux';
import { fetchProduct, STATUSES } from '../app/service/productSlice';
 import { FlatList } from 'react-native';
 import { verticalScale,moderateScale,scale } from 'react-native-size-matters';

const AllProducts = ({ navigation }) => {
  const {} = useGetAllProductQuery();
  const dispatch=useDispatch();
  const { data:products, status } = useSelector(state => state.product);

  const [deleteProduct, { isLoading: deleting }] = useDeleteProductMutation();
  // useEffect(()=>{
  //   dispatch(fetchProduct());
  // },[])

  // if (isError) {
  //   return <Text>Oh no! We got an error!</Text>;
  // }

  // if (isLoading) {
  //   return <Text>Loading...</Text>;
  // }
  if (status===STATUSES.ERROR){
     return <Text>Oh no! We got an error!</Text>;

  }
  if(status===STATUSES.LOADING){
     <SafeAreaView style={{ flex: 1,
        justifyContent: 'center',}}>
          <ActivityIndicator />
          <ActivityIndicator size="large" color="#00ff00" />
        </SafeAreaView>

  }

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id).unwrap();
      // dispatch(fetchProduct())
      
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };
 


  const renderProductItem = ({ item: p }) => (
    <Pressable
      key={p._id}
      style={styles.productContainer}
      onPress={() => navigation.navigate('SpecificProduct', { id: p._id })}
    >
      <Image
        style={styles.image}
        source={{ uri: p.image }}
        resizeMode="contain"
      />
      <View style={styles.productdesc}>
        <Text style={styles.productTitle}>{p.name}</Text>
        <Text style={styles.productDescription} numberOfLines={2}>
          {p.bio}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={styles.productPrice}>${p.price.toFixed(2)}</Text>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Feather
              name="edit"
              color="#075B5E"
              size={20}
              onPress={() => navigation.navigate('UpdateProduct', { product: p })}
            />
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
  );

  return (
    <View style={styles.root}>
      <ImageBackground
        source={{
          uri: 'https://images.pexels.com/photos/5942501/pexels-photo-5942501.jpeg',
        }}
        style={styles.bg}
        resizeMode="cover"
      >
        <FlatList
          data={products}
          keyExtractor={item => item._id}
          renderItem={renderProductItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          scrollEnabled={true}
        />
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
    marginVertical: verticalScale(10),
    padding: moderateScale(10),
    backgroundColor: 'white',
    borderRadius: moderateScale(8),
    flexDirection: 'row',
    marginHorizontal: scale(10),
    borderWidth:scale(2),
    borderColor:colors.dark
  },
  productTitle: {
    fontSize: moderateScale(18),
    fontFamily: fonts.bold,
  },
  productDescription: {
    fontSize: moderateScale(14),
    color: '#555',
    width: scale(200),
    fontFamily: fonts.regular,
  },
  image: {
    width: scale(100),
    height: scale(100),
    borderWidth:scale(2),
    borderColor:colors.dark
  },
  productPrice: {
    marginTop: verticalScale(8),
    fontSize: moderateScale(16),
    fontFamily: fonts.bold,
    color: '#075B5E',
  },
  productdesc: {
    marginHorizontal: scale(8),
  },
    bg: {
    flex: 1,
  },
});
