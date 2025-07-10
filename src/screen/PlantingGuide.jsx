import { Image, StyleSheet, View,FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import Text from '../UI/SpText';

import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const PlantingGuide = ({navigation}) => {
    const products=useSelector(state =>state.product.data);
    
    const renderProducts=({item})=>{
        return(
            <TouchableOpacity style={styles.card} onPress={()=>{
                navigation.navigate('Specific',{
                    product:item
                })
            }}>
                <Image source={{uri:item?.image}} style={styles.img}/>
               <View>
                 <Text color='black'>{item.name}</Text>
                <Text color='#7D7B7B'>Planting Guide</Text>
               </View>

            </TouchableOpacity>
        )
    }
    
  return (
    <View style={styles.root}>
      <Text>PlantingGuide</Text>
      <FlatList
      data={products}
      renderItem={renderProducts}
      keyExtractor={item=>item._id}
      />
    </View>
  )
}

export default PlantingGuide

const styles = StyleSheet.create({
    root:{
        flex:1,
        backgroundColor:'#FFFFFF'
    },
    img:{
        width:scale(57),
        height:scale(57),
        borderRadius:moderateScale(8)
    },
    card:{
        flexDirection:'row',
        alignItems:'center',
        gap:scale(10),
        marginHorizontal:scale(40),
    
        marginVertical:verticalScale(10)
    }
})