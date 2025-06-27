import { ImageBackground, StyleSheet, View, Pressable } from 'react-native';
import React from 'react';
import { images } from '../utils/Images/images';
import Text from '../UI/SpText';
import LinearGradient from 'react-native-linear-gradient';


const Login = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.login}
        style={styles.imageBackground}
       
      >
        <LinearGradient
          colors={['rgba(1, 24, 7, 0)', '#011807']}
          locations={[0, 0.7]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.linear}
        >
         <View style={{marginBottom:20}}>
             <Text size={24} color="white">
            Buy Your Favorite
          </Text>
          <Text size={24} color="white">
            Plants, Only Here!
          </Text>
         </View>

          <View >
            <Pressable style={styles.button} onPress={()=>navigation.navigate('AllProducts')}>
            <Text weight="bold" size={20} alignment="center" color="white">
              Login
            </Text>
          </Pressable>

          <Pressable style={styles.button2}>
            <Text weight="bold" size={20} alignment="center" >
              Sign Up
            </Text>
          </Pressable>

          <Pressable>
            <Text size={20} alignment="center" >
              Guest
            </Text>
          </Pressable>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    width:420,
    height:664
  },
  linear: {
     paddingTop: 170,
    paddingHorizontal: 20,
    paddingBottom:60
 },
  button: {
    backgroundColor:'#2D5523',
    width:'90%',
   
    height: 72,
    borderRadius: 12,
    justifyContent: 'center',
    marginVertical: 10,
     marginHorizontal:10
  },
  button2: {
    borderColor: '#2D5523',
    borderWidth: 2,
    width:'90%',
    height: 72,
    borderRadius: 12,
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal:10
  },

});
