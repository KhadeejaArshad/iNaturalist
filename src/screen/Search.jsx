import { ScrollView, StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import Feather from '@react-native-vector-icons/feather';
import { fonts } from '../utils/font';
import Text from '../UI/SpText';

const Search = () => {
  return (
    <ScrollView style={styles.root} contentContainerStyle={{ alignItems: 'center', paddingTop:20 }}>
        <View style={styles.search}>
             <TextInput placeholder='Search' placeholderTextColor='gray'
             style={{ fontFamily: fonts.regular, color: 'black' }}/>
             <Feather name="search" color='black' size={24} />
        </View>
        <View>
            <Text size={16} color='black'>Spider Plant </Text>
        </View>
     
    </ScrollView>
  )
}

export default Search

const styles = StyleSheet.create({
    root:{
        flex:1,
        backgroundColor:'#FFFFFF',
    },search:{
    
        borderBottomWidth:1,
        width:299,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        
       
    }
})