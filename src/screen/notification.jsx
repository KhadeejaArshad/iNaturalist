import { Image, StyleSheet, View } from 'react-native';
import Text from '../UI/SpText';
import React from 'react';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const Notification = ({ route }) => {
  const submitData = route?.params?.submitData;
  const data = route?.params?.data;
  const count = route?.params?.count;
  console.log(submitData);

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
      <Text color="#007537">Order Successful!</Text>
      <View style={styles.underline}>
        <Text color="black">Personal Information</Text>
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
        <Text color="black">Delivery Method</Text>
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
    borderBottomWidth: 0.5,
    borderColor: '#221F1F',
  },
});
