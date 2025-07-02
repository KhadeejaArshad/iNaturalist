import { Image, ScrollView, StyleSheet, View } from 'react-native';
import Text from '../UI/SpText';

import React from 'react';
import { moderateScale,scale,verticalScale } from 'react-native-size-matters';

import Header from '../components/Guest/Header';
import List from '../components/Guest/List';
import { images } from '../utils/Images/images';

const Guest = () => {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
      <Header />
      <View style={styles.root}>
        <Text size={24} color="black" marginH={16} marginV={20}>
          Plants
        </Text>
        <List />
      </View>
      <View>
        <Text size={24} color="black" marginH={16} marginV={20}>
          Equipment
        </Text>
        <List />
      </View>
        <Text size={24} color="black" marginH={16} marginV={12}>
    Planta Care Kit (new)
  </Text>
    <View style={{ marginHorizontal: 14, width: 384, height: 134, backgroundColor: '#f9f9f9', borderRadius: 8 }}>


  <View style={{ flexDirection: 'row', flex: 1 }}>
    <View style={[styles.card, { flex: 1, paddingRight: 10 }]}>
      <Text size={16}  marginH={8}color="black">
        Lemon Balm Grow Kit
      </Text>
      <Text color="#7D7B7B" marginH={8}>
        Include: Lemon Balm seeds, dung, Planta pot, marker...
      </Text>
    </View>

    <View style={styles.imageContainer}>
      <Image source={images.kit} style={styles.image} resizeMode="cover" />
    </View>
  </View>
</View>

    </ScrollView>
  );
};

export default Guest;

const styles = StyleSheet.create({
  root: {
    marginTop: verticalScale(10),
  },
  card: {
    backgroundColor: '#F6F6F6',
    width: scale(370),
    height: verticalScale(134),
  },
//   imagecontainer: {
//     width: 108,
//     height: 134,
//   },
  img: {
    width: '100%',
    height: '100%',
  },
  card: {
  justifyContent: 'center',
    width: 370,
    height: 134,
  
},

imageContainer: {
  width: scale(108),
  height: verticalScale(100),
  
  overflow: 'hidden',
  justifyContent: 'center',
  alignItems: 'center',
},

image: {
  width: '100%',
  height: '100%',

}
});
