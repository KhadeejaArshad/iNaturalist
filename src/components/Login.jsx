import { ImageBackground, StyleSheet, View, Pressable } from 'react-native';
import React from 'react';
import { images } from '../utils/Images/images';
import Text from '../UI/SpText';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';

const Login = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={images.login} style={styles.imageBackground}>
        <LinearGradient
          colors={['rgba(1, 24, 7, 0)', '#011807']}
          locations={[0, 0.7]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.linear}
        >
          <View style={{ marginHorizontal: 15 }}>
            <Text size={24} color="white">
              Buy Your Favorite
            </Text>
            <Text size={24} color="white">
              Plants, Only Here!
            </Text>
          </View>

          <View style={{ marginHorizontal: 15 }}>
            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate('LoginScreen')}
            >
              <Text weight="bold" size={20} alignment="center" color="white">
                Login
              </Text>
            </Pressable>

            <Pressable
              style={styles.button2}
              onPress={() => navigation.navigate('SignUp')}
            >
              <Text weight="bold" size={20} alignment="center">
                Sign Up
              </Text>
            </Pressable>
          </View>

          <View style={styles.button3}>
            <Pressable onPress={() => navigation.navigate('Guest')}>
              <Text size={20} marginV={8} alignment="center">
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
    width: scale(397),
    height: verticalScale(470),
  },
  linear: {
    paddingTop: verticalScale(170),
    paddingBottom: verticalScale(15),
  },
  button: {
    backgroundColor: '#2D5523',
    width: scale(327),

    height: verticalScale(62),
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    marginVertical: verticalScale(10),
  },
  button2: {
    borderColor: '#2D5523',
    borderWidth: scale(2),
    width: scale(327),
    height: verticalScale(62),
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    marginVertical: verticalScale(10),
  },
  button3: {
    justifyContent: 'center',
    // backgroundColor:'red',
    width:'90%',
    
    marginVertical: verticalScale(10),
  },
});
