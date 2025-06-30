import { StyleSheet, View, FlatList,Pressable,Image } from 'react-native';
import Text from '../../UI/SpText';
import React from 'react';
import { useGetAllProductQuery } from '../../app/service/dummyData';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../utils/color/color';
import { fonts } from '../../utils/font';
import { STATUSES } from '../../app/service/productSlice';
import { useNavigation } from '@react-navigation/native';

const List = () => {
    const navigation=useNavigation();
  const {} = useGetAllProductQuery();
  const { data: products, status } = useSelector(state => state.product);
  if (status === STATUSES.ERROR) {
    return <Text>Oh no! We got an error!</Text>;
  }
  if (status === STATUSES.LOADING) {
 return(
       <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator />
      <ActivityIndicator size="large" color="#00ff00" />
    </SafeAreaView>
 )
  }

  const renderProductItem = ({ item: p }) => (
    <Pressable style={styles.card}
    onPress={()=>navigation.navigate('Details',{id:p._id})}
  
      
    
    >
      <Image
        style={styles.image}
        source={{ uri: p.image }}
       
      />
      <Text color='black'>{p.name}</Text>
       <Text color='#7D7B7B'>{p.category}</Text>
       <Text color='#007537' size={16}>${p.price}</Text>

    </Pressable>
  );
  return (
    <View style={styles.root}>
      <Text size={24} color="black" marginH={16} marginV={20}>
        Plants
      </Text>
    <FlatList
  data={products}
  keyExtractor={item => item._id}
  renderItem={renderProductItem}
  contentContainerStyle={{
    paddingBottom: 20,
    justifyContent: 'space-between',
  }}
  columnWrapperStyle={{
   
    marginHorizontal: 30,
    columnGap:20
  }}
  scrollEnabled={true}
  numColumns={2}
/>

    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  root: {
    marginTop: 50,
  },

    image: {
      width: 155,
      height: 130,
      borderRadius:8,
    
    },
    card:{
        width:180,
        height:217,
        borderRadius:8,
     
        gap:3
    }
  
});
