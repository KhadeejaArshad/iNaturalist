import { Image, ScrollView, StyleSheet, View,TouchableOpacity } from 'react-native';
import Text from '../UI/SpText';
import React from 'react';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useGetProductByIdQuery } from '../app/service/dummyData';

const End = ({ route, navigation }) => {
  const submitData = route?.params?.submitData;
  const selectedProducts = route?.params?.selectedProducts;
  const count = selectedProducts[0].count;
  console.log(submitData);
  const productId = selectedProducts[0].id;
  const { data } = useGetProductByIdQuery(productId);
  console.log(data);
  return (
    <View style={styles.root}>
      <ScrollView>
        <Text color="#007537" alignment="center" marginV={10}>
          Order Successful!
        </Text>
        <View style={styles.subform}>
          <View style={styles.underline}>
            <Text color="black" alignment="center">
              Personal Information
            </Text>
          </View>
          <View style={styles.review}>
            <Text color="#7D7B7B" marginV={8}>
              {submitData.name}
            </Text>
            <Text color="#7D7B7B" marginV={8}>
              {submitData.email}
            </Text>
            <Text color="#7D7B7B" marginV={8}>
              {submitData.address}
            </Text>
            <Text color="#7D7B7B" marginV={8}>
              {submitData.phone}
            </Text>
          </View>

          <View style={styles.underline}>
            <Text color="black" alignment="center">
              Delivery Method
            </Text>
          </View>
          <View style={styles.review}>
            <Text color="#7D7B7B" marginV={8}>
              {submitData.selectedDelivery.label}
            </Text>
            <Text color="#7D7B7B" marginV={8}>
              {submitData.selectedDelivery.placeholder}
            </Text>
          </View>

          <View style={styles.underline}>
            <Text color="black" alignment="center">
              Payment Method
            </Text>
          </View>
          <View style={styles.review}>
            <Text color="#7D7B7B" marginV={8}>
              {submitData.selectedPayment.label || submitData.selectedPayment}
            </Text>
          </View>

          <View style={styles.underline}>
            <Text color="black">Your Item </Text>
          </View>
          <View style={styles.review}>
            <View style={styles.desc}>
              <Image
                source={{ uri: data?.product?.image }}
                style={styles.imgcontainer}
              />
              <View style={styles.desc2}>
                <Text color="#007537">Order Successful</Text>
                <View style={styles.desc3}>
                  <Text color="black">{data?.product?.name} |</Text>
                  <Text color="#7D7B7B">{data?.product?.category}</Text>
                </View>
                <Text color="black">
                  {count} {count === 1 ? 'item' : 'items'}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.review}>
            <View style={styles.desc}>
              <Image
                source={{ uri: data?.product?.image }}
                style={styles.imgcontainer}
              />
              <View style={styles.desc2}>
                <Text color="#007537">Order Successful</Text>
                <View style={styles.desc3}>
                  <Text color="black">{data?.product?.name} |</Text>
                  <Text color="#7D7B7B">{data?.product?.category}</Text>
                </View>
                <Text color="black">
                  {count} {count === 1 ? 'item' : 'items'}
                </Text>
              </View>
            </View>
          </View>
        </View>
   
      </ScrollView>
      <View style={styles.fixed}>
        <View style={styles.pay}>
          <Text color="black" marginV={10}>
            You paid
          </Text>
          <Text color="black">${submitData.total}</Text>
        </View>
        <View style={styles.buttoncontainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('profile', {
                screen: 'PlantingGuideStack',
              })
            }
          >
            <Text
              marginH={12}
              size={16}
              marginV={20}
              alignment="center"
              color="white"
            >
              Check out Planting Guide
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() =>
              navigation.navigate('Guest', {
                screen: 'home',
              })
            }
          >
            <Text color="black">Back to Homepage</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default End;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingBottom: verticalScale(150),
  },
  container: {
    borderBottomWidth: 0.5,
    borderColor: '#7D7B7B',
    marginTop: verticalScale(20),
    width: scale(279),

    justifyContent: 'center',
  },
  root2: {
    marginHorizontal: scale(35),
  },
  imgcontainer: {
    width: scale(77),
    height: scale(77),
    borderRadius: moderateScale(8),
  },
  desc: {
    flexDirection: 'row',
    marginVertical: scale(15),
    alignItems: 'center',
  },
  desc2: {
    marginHorizontal: scale(10),
  },
  desc3: {
    flexDirection: 'row',
  },
  underline: {
    borderBottomWidth: 1,
    borderColor: '#221F1F',
    marginVertical: verticalScale(8),
  },
  subform: {
    padding: moderateScale(10),
    paddingLeft: scale(30),
    paddingRight: scale(30),
  },
  pay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scale(15),
  },
  button: {
    backgroundColor: '#007537',
    width: '90%',
    height: verticalScale(50),
    borderRadius: moderateScale(12),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttoncontainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button2: {
    borderBottomWidth: 1,
    borderColor: 'black',
    marginTop: verticalScale(15),
  },
  fixed:{
    position:'absolute',
    bottom:30,
    right:0,
    left:0,

  }
});
