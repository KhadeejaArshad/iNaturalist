import {
  Image,
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
import Text from '../UI/SpText';
import React from 'react';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import { useSelector } from 'react-redux';

const Notification = () => {
  const product = useSelector(state => state.product.data);
  console.log(product);
  const count = 4;

  const renderItem = ({ item }) => {
    return (
      <View style={styles.root2}>
        <View style={styles.container}>
          <Text size={16} color="black" marginH={8}>
            {' '}
            {formattedDate}
          </Text>
        </View>
        <View style={styles.desc}>
          <Image source={{ uri: item.image }} style={styles.imgcontainer} />
          <View style={styles.desc2}>
            <Text color="#007537">Order Successful</Text>
            <View style={styles.desc3}>
              <Text color="black">{item.name} |</Text>
              <Text color="#7D7B7B">{item.category}</Text>
            </View>
            <Text color="black">
              {4} {count === 1 ? 'item' : 'items'}
            </Text>
          </View>
        </View>
      </View>
    );
  };

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

  return (
    <View style={styles.root}>
      <FlatList
        data={product}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
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

});
