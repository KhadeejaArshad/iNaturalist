import { StyleSheet, View } from 'react-native'
import React from 'react'
import Text from '../UI/SpText'
import { moderateScale,scale,verticalScale } from 'react-native-size-matters'

const cart = () => {
  return (
    <View style={styles.root}>
      <View style={styles.textcontainer}>
        <Text color='black' alignment='center'>Your cart is currently empty.</Text>
      </View>
    </View>
  )
}

export default cart

const styles = StyleSheet.create({
    root:{
    flex: 1,
    backgroundColor: '#FFFFFF',
  
    },
    textcontainer:{
        marginTop:verticalScale(12)
    }
})