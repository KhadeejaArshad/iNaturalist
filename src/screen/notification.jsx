import { Image, ScrollView, StyleSheet, View,Pressable } from 'react-native';
import Text from '../UI/SpText';
import React from 'react';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useGetProductByIdQuery } from '../app/service/dummyData';

const Notification = ({ route,navigation }) => {
  const submitData = route?.params?.submitData;
  const selectedProducts = route?.params?.selectedProducts;
  // const data = route?.params?.data;
  const count = selectedProducts[0].count;
  console.log(submitData);
  const productId = selectedProducts[0].id;
  const { data } = useGetProductByIdQuery(productId);
  console.log(data);

  function formatDateWithSuffix(date) {
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const day = date.getDate();
    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];

    const getOrdinalSuffix = n => {
      if (n >= 11 && n <= 13) return 'th';
      switch (n % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    };

    return `${dayOfWeek}, ${month} ${day}${getOrdinalSuffix(day)}`;
  }

  const date = new Date();

  const formattedDate = formatDateWithSuffix(date);
  if (!count && !data && !submitData) {
    return (
      <View style={styles.root}>
        <Text color="black" alignment="center" marginV={32}>
          You don’t have any notification
        </Text>
      </View>
    );
  }
  return (
    // <View style={styles.root}>
    //   <View style={styles.root2}>
    //     <View style={styles.container}>
    //       <Text size={16} color="black" marginH={8}>
    //         {' '}
    //         {formattedDate}
    //       </Text>
    //     </View>
    //     <View style={styles.desc}>
    //       <Image
    //         source={{ uri: data?.product?.image }}
    //         style={styles.imgcontainer}
    //       />
    //       <View style={styles.desc2}>
    //         <Text color="#007537">Order Successful</Text>
    //         <View style={styles.desc3}>
    //           <Text color="black">{data?.product?.name} |</Text>
    //           <Text color="#7D7B7B">{data?.product?.category}</Text>
    //         </View>
    //         <Text color="black">
    //           {count} {count === 1 ? 'item' : 'items'}
    //         </Text>
    //       </View>
    //     </View>
    //   </View>
    // </View>
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
              {submitData.selectedPayment.label}
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

          
        </View>
    

        <View style={styles.fixed}>
          <View style={styles.pay}>
            <Text color="black" marginV={10}>You paid</Text>
            <Text color="black">${submitData.total}</Text>
          </View>
          <View style={styles.buttoncontainer}>
            <Pressable style={styles.button}>
              <Text
                marginH={12}
                size={16}
                marginV={20}
                alignment="center"
                color="white"
              >
                Check out Planting Guide
              </Text>
            </Pressable>
            <Pressable style={styles.button2} onPress={()=>navigation.navigate('Guest',{
              screen:'home'
            })}>
              <Text color='black'>Back to Homepage</Text>
            </Pressable>
          </View>
        </View>
        </ScrollView>
      
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    
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
    fixed: {
    position: 'absolute',
    bottom: -30,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: scale(15),
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
  button2:{
    borderBottomWidth:1,
    borderColor:'black',
    marginTop:verticalScale(15)
  }
});
