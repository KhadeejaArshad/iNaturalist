import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import Text from '../UI/SpText';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Feather from '@react-native-vector-icons/feather';
import { Formik } from 'formik';
import * as Yup from 'yup';

const Checkout = ({ route }) => {
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const subtotal = route?.params?.subtotal || 0;
  const inputFields = [
    { key: 'name', placeholder: 'Trần Minh Trí' },
    { key: 'email', placeholder: 'tmtri310251@gmail.com' },
    { key: 'address', placeholder: 'Address' },
    { key: 'phone', placeholder: 'Phone Number' },
  ];

  const deliveryOptions = [
    {
      id: 'quick',
      label: 'Quick Shipping - $15',
      placeholder: 'Expected Shipping Date: May 5th',
      fee: 15,
    },
    {
      id: 'cod',
      label: 'COD - $20',
      placeholder: 'Expected Shipping Date: May 13th',
      fee: 20,
    },
  ];

  const paymentOptions = [
    { id: 'visa', label: 'VISA / MASTERCARD' },
    { id: 'debit', label: 'Debit Card' },
  ];

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Please input your name'),
    email: Yup.string()
      .email('Invalid email')
      .required('Please input your email'),
    address: Yup.string().required('Please input your address'),
    phone: Yup.string().required('Please input your phonenumber'),
  });

  const handleSubmit = values => {
    if (!selectedDelivery || !selectedPayment) {
      alert('Please select delivery and payment method');
      return;
    }

    const delivery = deliveryOptions.find(d => d.id === selectedDelivery);
    const total = subtotal + delivery.fee;

    console.log({
      ...values,
      selectedDelivery,
      selectedPayment,
      subtotal,
      deliveryFee: delivery.fee,
      total,
    });

    alert('Order placed successfully!');
  };

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        address: '',
        phone: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnMount
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
        dirty,
      }) => (
        <View style={styles.root}>
          <ScrollView contentContainerStyle={styles.scrollcontainer}>
            <View style={styles.form}>
              <View style={styles.subform}>
                <View style={styles.underline}>
                  <Text color="black">Personal Information</Text>
                </View>

                {inputFields.map(({ key, placeholder }) => (
                  <View key={key} style={styles.subunderline}>
                    <TextInput
                      placeholder={placeholder}
                      onChangeText={handleChange(key)}
                      onBlur={handleBlur(key)}
                      value={values[key]}
                    />
                    {touched[key] && errors[key] && (
                      <Text color="red">{errors[key]}</Text>
                    )}
                  </View>
                ))}
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
                      <Text
                        color={
                          selectedDelivery === option.id ? '#007537' : 'black'
                        }
                      >
                        {option.label}
                      </Text>
                      {selectedDelivery === option.id && (
                        <Feather
                          name="check"
                          size={20}
                          color="#007537"
                          style={styles.icon}
                        />
                      )}
                    </View>
                    <TextInput
                      placeholder={option.placeholder}
                      editable={false}
                    />
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
                    style={[
                      styles.subunderline,
                      {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: verticalScale(12),
                      },
                    ]}
                    onPress={() => setSelectedPayment(option.id)}
                  >
                    <Text
                      color={
                        selectedPayment === option.id ? '#007537' : 'black'
                      }
                    >
                      {option.label}
                    </Text>
                    {selectedPayment === option.id && (
                      <Feather name="check" size={20} color="#007537" />
                    )}
                  </Pressable>
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.fixed}>
            <View style={styles.pay}>
              <Text color="#ABABAB">SubTotal</Text>
              <Text color="black">${subtotal}</Text>
            </View>
            <View style={styles.pay}>
              <Text color="#ABABAB">Delivery Fee</Text>
              <Text color="black">
                $
                {deliveryOptions.find(d => d.id === selectedDelivery)?.fee || 0}
              </Text>
            </View>
            <View style={styles.pay}>
              <Text color="#ABABAB">Total</Text>
              <Text color="black">
                $
                {subtotal +
                  (deliveryOptions.find(d => d.id === selectedDelivery)?.fee ||
                    0)}
              </Text>
            </View>
            <View style={styles.buttoncontainer}>
              <Pressable
                style={[
                  styles.button,
                  !(isValid && dirty) && { backgroundColor: '#ABABAB' },
                ]}
                onPress={handleSubmit}
                disabled={!(isValid && dirty)} 
              >
                <Text
                  marginH={12}
                  size={16}
                  marginV={20}
                  alignment="center"
                  color="white"
                >
                  Continue
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </Formik>
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
    marginVertical: verticalScale(5),
  },
  subform: {
    marginVertical: verticalScale(10),
  },
  subunderline2: {
    borderBottomWidth: 0.5,
    borderColor: '#ABABAB',
    marginVertical: verticalScale(10),
  },
  container: {
    marginTop: verticalScale(10),
    borderBottomWidth: 0.5,
    borderColor: '#ABABAB',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    marginLeft: 6,
  },
  pay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scale(15),
  },
  button: {
    backgroundColor: '#007537',
    width: '90%',
    height: verticalScale(50),
    borderRadius: moderateScale(12),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttoncontainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: verticalScale(10),
  },
  fixed: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',

    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(15),
  },
  scrollcontainer: {
    paddingBottom: verticalScale(140),
  },
});
