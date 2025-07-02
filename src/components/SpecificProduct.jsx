import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  ImageBackground,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { useGetProductByIdQuery } from '../app/service/dummyData';
import React from 'react';
import { useLayoutEffect } from 'react';
import { fonts } from '../utils/font';
import { colors } from '../utils/color/color';
import { verticalScale,scale,moderateScale } from 'react-native-size-matters';

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
        <SafeAreaView style={{ flex: 1,
            justifyContent: 'center',}}>
              <ActivityIndicator />
              <ActivityIndicator size="large" color="#00ff00" />
            </SafeAreaView>
  }

  return (
     <ImageBackground   source={{
          uri: 'https://images.pexels.com/photos/5942501/pexels-photo-5942501.jpeg',
        }}
        style={styles.bg}
        resizeMode="cover">
    <ScrollView
      
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
     </ImageBackground>

      
     
     
    
  );
};

export default SpecificProduct;
const styles = StyleSheet.create({
 
 
  centered: {
    alignItems: 'center',
  },
  imagecontainer: {
    width: scale(390),
    height: scale(310),
    marginTop: verticalScale(10),
   
  },
  image: {
    width: '100%',
    height: '100%',
  },
  name: {
    color: colors.dark,
    fontWeight: 'bold',
    fontSize: moderateScale(28),
    marginTop: verticalScale(10),
    marginHorizontal: scale(16),
  },
  detailSection: {
    backgroundColor: colors.header,

    borderRadius: moderateScale(16),
    margin: moderateScale(24),
    paddingBottom: verticalScale(22),
    marginVertical: verticalScale(20),
  },
  productDesccard: {
    marginTop: verticalScale(10),
    padding: moderateScale(20),
    backgroundColor: 'white',
    borderRadius: moderateScale(8),
    marginHorizontal: scale(10),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: scale(10),
    marginTop: verticalScale(16),
    marginHorizontal: scale(10),
  },
  productContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: moderateScale(8),
    borderRadius: moderateScale(8),
    alignItems: 'center',
  },
  heading: {
    fontSize: moderateScale(16),
    marginBottom: verticalScale(8),
    color: colors.dark,
    fontFamily: fonts.bold,
  },
  productDescription: {
    color: colors.greyish,
    fontFamily: fonts.regular,
  },
  header: {
    fontSize: moderateScale(22),
    color: colors.dark,
    marginTop: verticalScale(10),

    fontFamily: fonts.bold,
  },
  button:{
    backgroundColor:colors.buttonbg
  },
  bg:{
    flex:1
  }
});
