import { TouchableOpacity, StyleSheet, View } from 'react-native'
import Text from '../UI/SpText'
import React from 'react'
import { moderateScale, verticalScale } from 'react-native-size-matters'

const Profile = ({navigation}) => {
  return (
    <View style={styles.root}>
    <View style={styles.menu}>
         <View style={styles.underline}>
        <Text color='#7F7F7F' size={16} marginV={6}>General</Text>
        
     </View>
    <TouchableOpacity style={styles.option} onPress={()=>navigation.navigate('Edit')}>
        <Text color='black' size={16}>Edit Information</Text>
    </TouchableOpacity>
       <TouchableOpacity style={styles.option} onPress={()=>navigation.navigate('PlantingGuide')}>
        <Text color='black' size={16}>Planting Guide</Text>
    </TouchableOpacity>
       <TouchableOpacity style={styles.option}>
        <Text color='black' size={16}>Transaction History</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.option} onPress={()=>navigation.navigate('FAQ')}>
        <Text color='black' size={16}> Q & A</Text>
    </TouchableOpacity>


     <View style={styles.underline}>
        <Text color='#7F7F7F' size={16} marginV={6}>Security </Text>
        
     </View>
    <TouchableOpacity style={styles.option}>
        <Text color='black' size={16}>Terms and Policy</Text>
    </TouchableOpacity>
       <TouchableOpacity style={styles.option}>
        <Text color='black' size={16}>Security Policy</Text>
    </TouchableOpacity>
       <TouchableOpacity style={styles.option}>
        <Text color='red' size={16}>Logout</Text>
    </TouchableOpacity>
    </View>
   
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
    root:{
        flex:1,
        backgroundColor:'#FFFFFF'
    },
    underline:{
        borderBottomWidth:1,
        borderColor:'#7F7F7F',

    },
    menu:{
        padding:moderateScale(30)
    },
    option:{
        marginVertical:verticalScale(8)
    }
})