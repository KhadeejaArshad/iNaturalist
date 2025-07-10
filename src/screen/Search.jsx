import { Image, TouchableOpacity, ScrollView, StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import Feather from '@react-native-vector-icons/feather';
import { fonts } from '../utils/font';
import Text from '../UI/SpText';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { verticalScale,scale,moderateScale } from 'react-native-size-matters';


const Search = ({navigation}) => {
  const [query, setQuery] = useState('');
  const { data:products} = useSelector(state => state.product);

  const filteredProducts = products.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ScrollView style={styles.root} contentContainerStyle={{ marginHorizontal: 50, paddingTop: 20 }}>
      <View style={styles.search}>
        <TextInput
          placeholder='Search'
          placeholderTextColor='gray'
          value={query}
          onChangeText={setQuery}
          style={{ fontFamily: fonts.regular, color: 'black', flex: 1 }}
        />
        <Feather name="search" color='black' size={24} />
      </View>

      {query.length === 0 ? (
        <>
          <Text color='black' size={16} marginV={12}>Recent Searches</Text>
          <View style={styles.recentItem}>
            <Feather name="clock" color='gray' size={16} />
            <Text size={16} color='black'>Spider Plant</Text>
            <View style={{ transform: [{ rotate: '45deg' }] }}>
              <Feather name="plus" color='black' size={16} />
            </View>
          </View>
           <View style={styles.recentItem}>
            <Feather name="clock" color='gray' size={16} />
            <Text size={16} color='black'>Song of India</Text>
            <View style={{ transform: [{ rotate: '45deg' }] }}>
              <Feather name="plus" color='black' size={16} />
            </View>
          </View>
        </>
      ) : (
        filteredProducts.map(item => (
          <TouchableOpacity onPress={()=>navigation.navigate('Details',{id:item._id})} key={item._id} style={styles.resultItem}>
           
            <Image source={{uri:item.image}} style={styles.img}/>
          <View>
              <Text size={16} color='black'>{item.name}</Text>
            <Text size={16} color='black'>${item.price}</Text>
             <Text size={16} color='black'>156 items Left</Text>
          </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}

export default Search;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  search: {
    borderBottomWidth: 1,
    width: scale(260),
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(10),
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    marginVertical: verticalScale(8),
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(20),
    marginVertical: verticalScale(8),
  },
  img:{
    width:scale(77),
    height:scale(77),
    borderRadius:scale(8)
  }
});
