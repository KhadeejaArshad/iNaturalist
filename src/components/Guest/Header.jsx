import { ImageBackground, StyleSheet, View } from 'react-native';
import Text from '../../UI/SpText';
import React from 'react';
import { images } from '../../utils/Images/images';
import Feather from '@react-native-vector-icons/feather';

const Header = () => {
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
        width:410,
        height:318
    },
  bg: {
    width: 410,
    height: 205,
 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:113,
    marginHorizontal:12
  },
  iconbg:{
    width:48,
    height:46,
    borderRadius:40,
    marginHorizontal:8,
    backgroundColor: '#FFFFFF',
    alignItems:'center',
    justifyContent:'center'
  }
})