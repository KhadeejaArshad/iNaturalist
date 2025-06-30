import { ScrollView, StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import Feather from '@react-native-vector-icons/feather';
import { fonts } from '../utils/font';
import Text from '../UI/SpText';

const Search = () => {
  return (
    <ScrollView style={styles.root} contentContainerStyle={{marginHorizontal:50, paddingTop:20 }}>
        <View style={styles.search}>
             <TextInput placeholder='Search' placeholderTextColor='gray'
             style={{ fontFamily: fonts.regular, color: 'black' }}/>
             <Feather name="search" color='black' size={24} />
        </View>
        <Text color='black' size={16}>Recent Searches</Text>
        <View style={{flexDirection:'row', alignItems:'center',gap:10,marginVertical:8}}>
                <Feather name="clock" color='black' size={16} />

            <Text size={16} color='black'>Spider Plant </Text>
           
             <View style={{transform:[{rotate:'45deg'}]}}>
                <Feather name="plus" color='black' size={16} />
             </View>
        </View>
         <View style={{flexDirection:'row', alignItems:'center', gap:10, marginVertical:8}}>
                <Feather name="clock" color='black' size={16} />

            <Text size={16} color='black'>Spider Plant </Text>
           
             <View style={{transform:[{rotate:'45deg'}]}}>
                <Feather name="plus" color='black' size={16} />
             </View>
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
        marginVertical:10
        
       
    }
})