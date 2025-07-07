import { StyleSheet, View, FlatList, Pressable, Image } from 'react-native';
import Text from '../../UI/SpText';
import React from 'react';
import { useGetAllProductQuery } from '../../app/service/dummyData';
import { useDispatch, useSelector } from 'react-redux';

import { STATUSES } from '../../app/service/productSlice';
import { useNavigation } from '@react-navigation/native';
import { moderateScale,scale,verticalScale } from 'react-native-size-matters';

const List = () => {
  const navigation = useNavigation();
  const {} = useGetAllProductQuery();
  const { data: products, status } = useSelector(state => state.product);
  if (status === STATUSES.ERROR) {
    return <Text>Oh no! We got an error!</Text>;
  }
  if (status === STATUSES.LOADING) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator />
        <ActivityIndicator size="large" color="#00ff00" />
      </SafeAreaView>
    );
  }

  const renderProductItem = ({ item: p }) => (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate('Details', { id: p._id })}
    >
      <Image style={styles.image} source={{ uri: p.image }} />
      <Text color="black">{p.name}</Text>
      <Text color="#7D7B7B">{p.category}</Text>
      <Text color="#007537" size={16}>
        ${p.price}
      </Text>
    </Pressable>
  );
  return (
    <View>
            <FlatList
      data={products}
      keyExtractor={item => item._id}
      renderItem={renderProductItem}
      contentContainerStyle={{
        paddingBottom: verticalScale(10),
        justifyContent: 'space-between',
      }}
      columnWrapperStyle={{
        marginHorizontal: scale(15),
        
      }}
      scrollEnabled={false}
      numColumns={2}
    />
    <Pressable style={styles.button} onPress={()=>navigation.navigate('More')}>
        <Text  size={16} color='black'>See More</Text>
    </Pressable>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({

  image: {
    width: scale(155),
    height: scale(130),
    borderRadius: scale(8),
  },
  card: {
    width: scale(170),
    height: scale(217),
    borderRadius: scale(8),

    gap: scale(3),
  },
  button:{
    alignSelf:'flex-end',
    borderBottomWidth:scale(1),
    borderBottomColor:'black',
    marginHorizontal:scale(14)
  }
});
