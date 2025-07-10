import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors } from '../utils/color/color';
import Text from '../UI/SpText';
import { useSignUpMutation } from '../app/service/authData';
import { useState } from 'react';
import { verticalScale,moderateScale,scale } from 'react-native-size-matters';

const SignUp = ({ navigation }) => {
  const [signUp, { isLoading, error }] = useSignUpMutation();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSignUp = async () => {
    if (!form.name || !form.email || !form.password) {
      alert('All fields are required!');
      return;
    }

    try {
      const res = await signUp(form).unwrap();
      if (res.status) {
        alert('Signup successful!');
        navigation.navigate('Login');
      } else {
        alert(res.message || 'Signup failed');
      }
    } catch (err) {
      console.error('Signup error:', err);
      alert('Something went wrong');
    }
  };

  return (
    <View style={styles.root}>
      <Text weight="bold" alignment="center" color={colors.dark} size={24}>
        iNaturalist
      </Text>
      <View style={styles.desc}>
        <Text alignment="center" color="black">
          Your Premier Destination for Lush Greenery:{'\n'} Elevate your space
          with our exceptional plant selection
        </Text>
      </View>
      <View style={styles.container}>
        <TextInput
          placeholder="Name"
          style={styles.input}
          keyboardType="default"
          autoCapitalize="words"
           value={form.name}
            onChangeText={text => handleChange('name', text)}
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
           value={form.email}
            onChangeText={text => handleChange('email', text)}
        />

        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry={true}
          keyboardType="default"
           value={form.password}
            onChangeText={text => handleChange('password', text)}
        />
      </View>
      <View style={styles.buttoncontainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text weight="bold" size={20} alignment="center" color="white">
            SignUp
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={{
          alignSelf: 'center',
          borderBottomWidth: 1,
          borderColor: colors.dark,
          marginTop: 30,
        }}
      >
        <Text color={colors.dark} alignment="center" marginV={4}>
          NotNow
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  root: {
  
    marginTop: verticalScale(90),
  },
  desc: {
    width: scale(350),
    height: verticalScale(48),
  },
  button: {
    backgroundColor: colors.dark,
    width: '70%',

    height: verticalScale(50),
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    marginVertical: verticalScale(10),
    marginHorizontal: verticalScale(10),
    alignItems: 'center',
  },
  container: {
    padding: moderateScale(20),
  },
  input: {
    borderBottomWidth: scale(1),
    borderBottomColor: 'black',
    marginBottom: verticalScale(20),
    fontSize: moderateScale(16),
    paddingVertical: verticalScale(8),
  },
  buttoncontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: verticalScale(15),
  },
});
