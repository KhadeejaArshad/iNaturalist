import { ImageBackground, StyleSheet, View } from 'react-native';
import Text from '../../UI/SpText';
import React from 'react';
import { images } from '../../utils/Images/images';
import Feather from '@react-native-vector-icons/feather';
import { moderateScale,verticalScale,scale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation=useNavigation();
  return (
 <View style={styles.root}>
      <View style={styles.header}>
            <Text color="black" size={24}>
              Planta - shining your
            </Text>
          <View style={styles.iconbg}>
              <Feather
              name="shopping-cart"
              color="black"
              size={24}
              onPress={()=>navigation.navigate('cart')}
             
            />
          </View>
          </View>
      <ImageBackground
        source={images.home}
        style={styles.bg}
        resizeMode="cover"
      >
        <View>
        
          <Text color="black" size={24} marginH={12}>
            little space
          </Text>
        <View style={{flexDirection:'row', alignItems:'center', gap:4}}>
              <Text color="#007537" size={16}marginH={12} marginV={10}>
            See New Arrivals
          </Text>
          <Feather name="arrow-right" color="#007537" size={24} />
        </View>
        </View>
      </ImageBackground>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
       root:{
        backgroundColor:'#F6F6F6',
        width:scale(360),
        height:verticalScale(318)
    },
  bg: {
    width: scale(400),
    height: verticalScale(205),
 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:verticalScale(60),
    marginHorizontal:scale(12)
  },
  iconbg:{
    width:scale(48),
    height:scale(46),
    borderRadius:scale(40),
    marginHorizontal:scale(8),
    backgroundColor: '#FFFFFF',
    alignItems:'center',
    justifyContent:'center'
  }
})