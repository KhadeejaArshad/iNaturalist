import { Pressable, StyleSheet, View } from 'react-native'
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
    <Pressable style={styles.option} onPress={()=>navigation.navigate('Edit')}>
        <Text color='black' size={16}>Edit Information</Text>
    </Pressable>
       <Pressable style={styles.option}>
        <Text color='black' size={16}>Planting Guide</Text>
    </Pressable>
       <Pressable style={styles.option}>
        <Text color='black' size={16}>Transaction History</Text>
    </Pressable>
    <Pressable style={styles.option}>
        <Text color='black' size={16}> Q & A</Text>
    </Pressable>


     <View style={styles.underline}>
        <Text color='#7F7F7F' size={16} marginV={6}>Security </Text>
        
     </View>
    <Pressable style={styles.option}>
        <Text color='black' size={16}>Terms and Policy</Text>
    </Pressable>
       <Pressable style={styles.option}>
        <Text color='black' size={16}>Security Policy</Text>
    </Pressable>
       <Pressable style={styles.option}>
        <Text color='red' size={16}>Logout</Text>
    </Pressable>
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