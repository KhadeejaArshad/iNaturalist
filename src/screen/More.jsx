import { StyleSheet, View,FlatList,TouchableOpacity,Image } from 'react-native'
import Text from '../UI/SpText'
import React from 'react'
import Filterbutton from '../components/More/filterbutton'
import { useGetAllProductQuery } from '../app/service/dummyData'
import { useSelector } from 'react-redux'
import { verticalScale,scale } from 'react-native-size-matters'

const More = () => {
  
  const { data: products, status } = useSelector(state => state.product);
      const renderProductItem = ({ item: p }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Details', { id: p._id })}
    >
      <Image style={styles.image} source={{ uri: p.image }} />
      <Text color="black">{p.name}</Text>
      <Text color="#7D7B7B">{p.category}</Text>
      <Text color="#007537" size={16}>
        ${p.price}
      </Text>
    </TouchableOpacity>
  );
  return (
    <>
   
    <View style={styles.root}>
         <Filterbutton/>

                     <FlatList
               data={products}
               keyExtractor={item => item._id}
               renderItem={renderProductItem}
               contentContainerStyle={{
                paddingTop:verticalScale(20),
                 paddingBottom: verticalScale(10),
                 justifyContent: 'space-between',
               }}
               columnWrapperStyle={{
                 marginHorizontal: scale(15),
                 
               }}
               scrollEnabled={false}
               numColumns={2}
             />
 
    </View>
    </>
  )
}

export default More

const styles = StyleSheet.create({
    root:{
        flex:1,
        backgroundColor:'#FFFFFF'
    },
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
})