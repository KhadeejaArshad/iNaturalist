import { StyleSheet, View, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import Text from '../UI/SpText';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Feather from '@react-native-vector-icons/feather';

const Checkout = () => {
  const [selectedDelivery, setSelectedDelivery] = useState(null); 
  const [selectedPayment, setSelectedPayment] = useState(null);   

  const deliveryOptions = [
    {
      id: 'quick',
      label: 'Quick Shipping - $15',
      placeholder: 'Expected Shipping Date: May 5th',
    },
    {
      id: 'cod',
      label: 'COD - $20',
      placeholder: 'Expected Shipping Date: May 13th',
    },
  ];

  const paymentOptions = [
    { id: 'visa', label: 'VISA / MASTERCARD' },
    { id: 'debit', label: 'Debit Card' },
  ];

  return (
    <View style={styles.root}>
      <View style={styles.form}>

        <View style={styles.subform}>
          <View style={styles.underline}>
            <Text color="black">Personal Information</Text>
          </View>
          <View style={styles.subunderline}>
            <TextInput placeholder="Trần Minh Trí" />
          </View>
          <View style={styles.subunderline}>
            <TextInput placeholder="tmtri310251@gmail.com" />
          </View>
          <View style={styles.subunderline}>
            <TextInput placeholder="Address" />
          </View>
          <View style={styles.subunderline}>
            <TextInput placeholder="Phone Number" />
          </View>
        </View>

       
        <View style={styles.subform}>
          <View style={styles.underline}>
            <Text color="black">Delivery Method</Text>
          </View>

          {deliveryOptions.map(option => (
            <Pressable
              key={option.id}
              style={styles.container}
              onPress={() => setSelectedDelivery(option.id)}
            >
              <View style={styles.row}>
                <Text color={selectedDelivery === option.id ? '#007537' : 'black'}>
                  {option.label}
                </Text>
                {selectedDelivery === option.id && (
                  <Feather name="check" size={20} color="#007537" style={styles.icon} />
                )}
              </View>
              <TextInput placeholder={option.placeholder} />
            </Pressable>
          ))}
        </View>

    
        <View style={styles.subform}>
          <View style={styles.underline}>
            <Text color="black">Payment Method</Text>
          </View>

          {paymentOptions.map(option => (
            <Pressable
              key={option.id}
              style={[styles.subunderline, { flexDirection: 'row', justifyContent: 'space-between' }]}
              onPress={() => setSelectedPayment(option.id)}
            >
              <Text color={selectedPayment === option.id ? '#007537' : 'black'}>
                {option.label}
              </Text>
              {selectedPayment === option.id && (
                <Feather name="check" size={20} color="#007537" />
              )}
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};




export default Checkout;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  underline: {
    borderBottomWidth: 0.5,
    borderColor: '#221F1F',
  },
  form: {
    paddingHorizontal: scale(30),
    paddingVertical: verticalScale(10),
  },
  subunderline: {
    borderBottomWidth: 0.5,
    borderColor: '#ABABAB',
  },
  subform: {
    marginVertical: verticalScale(15),
  },
  subunderline2: {
    borderBottomWidth: 0.5,
    borderColor: '#ABABAB',
    marginVertical: verticalScale(10),
  },
  container: {
   
    marginTop:verticalScale(10),
     borderBottomWidth: 0.5,
    borderColor: '#ABABAB',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    marginLeft: 6,
  },
});
