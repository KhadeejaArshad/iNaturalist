import { StyleSheet, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import Text from '../UI/SpText';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Formik } from 'formik';

const Edit = ({ navigation }) => {
  const [focusedField, setFocusedField] = useState(null);
  const handleSubmit = values => {
    console.log(values);
    Alert.alert('Information Saved!!');
    navigation.navigate('profile', {
      screen: 'profile',
    });
  };

  return (
    <View style={styles.root}>
      <View style={styles.desc}>
        <Text color="black" alignment="center">
          The information will be saved for the next {'\n'}
          purchase. Click on the details to edit.
        </Text>
      </View>

      <View style={styles.form}>
        <Formik
          initialValues={{
            name: 'Trần Minh Trí',
            email: 'tranminhtri@gmail.com',
            address: '60 Láng Hạ, Ba Đình, Hà Nộiio',
            number: '0123456789',
          }}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleBlur,
            values,
            isValid,
            dirty,
            handleSubmit,
          }) => (
            <View>
              <View style={styles.field}>
                <TextInput
                  value={focusedField === 'name' ? values.name : ''}
                  onChangeText={handleChange('name')}
                  onFocus={() => setFocusedField('name')}
                  onBlur={e => {
                    setFocusedField(null);
                    handleBlur('name')(e);
                  }}
                  placeholder="Trần Minh Trí"
                  placeholderTextColor="grey"
                />
              </View>

              <View style={styles.field}>
                <TextInput
                  value={focusedField === 'email' ? values.email : ''}
                  onChangeText={handleChange('email')}
                  onFocus={() => setFocusedField('email')}
                  onBlur={e => {
                    handleBlur('email')(e);
                    setFocusedField(null);
                  }}
                  placeholder="tranminhtri@gmail.com"
                  placeholderTextColor="grey"
                />
              </View>

              <View style={styles.field}>
                <TextInput
                  value={focusedField === 'address' ? values.address : ''}
                  onChangeText={handleChange('address')}
                  onFocus={() => setFocusedField('address')}
                  onBlur={e => {
                    handleBlur('address')(e);
                    setFocusedField(null);
                  }}
                  placeholder="60 Láng Hạ, Ba Đình, Hà Nộiio"
                  placeholderTextColor="grey"
                />
              </View>

              <View style={styles.field}>
                <TextInput
                  value={focusedField === 'number' ? values.number : ''}
                  onChangeText={handleChange('number')}
                  onFocus={() => setFocusedField('number')}
                  onBlur={e => {
                    handleBlur('number')(e);
                    setFocusedField(null);
                  }}
                  placeholder="0123456789"
                  placeholderTextColor="grey"
                  keyboardType="numeric"
                />
              </View>

              {/* You can add a Submit Button if needed */}
              {/* <Button onPress={handleSubmit} title="Submit" /> */}
              <View style={styles.buttoncontainer}>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={[
                    styles.button,
                    !(isValid && dirty) && { backgroundColor: '#7D7B7B' },
                  ]}
                  android_ripple={{ color: '#ffffff20' }}
                  disabled={!(isValid && dirty)}
                >
                  <Text
                    marginH={12}
                    size={16}
                    marginV={20}
                    alignment="center"
                    color="white"
                  >
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default Edit;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  desc: {
    marginVertical: verticalScale(20),
  },
  field: {
    borderBottomWidth: 1,
    borderColor: '#ABABAB',
  },
  form: {
    flex: 1,
    padding: moderateScale(30),
  },
  button: {
    backgroundColor: '#007537',
    width: '100%',
    height: verticalScale(50),
    borderRadius: moderateScale(12),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttoncontainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: verticalScale(235),
  },
});
