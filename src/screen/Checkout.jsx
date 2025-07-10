import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  ScrollView,
} from 'react-native';
import React, { useState, useRef } from 'react';
import Text from '../UI/SpText';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Feather from '@react-native-vector-icons/feather';
import { Formik } from 'formik';
import * as Yup from 'yup';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useNavigation } from '@react-navigation/native';

const Checkout = ({ route }) => {
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const subtotal = route?.params?.subtotal || 0;
  const  selectedProducts= route?.params?.selectedProducts;

  const [step, setStep] = useState(1);
  const refRBSheet = useRef();
  const [submitData, setsumbitData] = useState(null);
  const navigation = useNavigation();
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
    pin: step === 2 ? Yup.string().required('Pin is required') : Yup.string(),
    card: step === 2 ? Yup.string().required('Card is required') : Yup.string(),
    expiry:
      step === 2 ? Yup.string().required('Expiry is required') : Yup.string(),
    cvv: step === 2 ? Yup.string().required('cvv is required') : Yup.string(),
  });

  const handleSubmit = values => {
    if (!selectedDelivery) {
      alert('Please select a delivery method');
      return;
    }

    if (selectedDelivery.id === 'quick' && !selectedPayment) {
      alert('Please select a payment method');
      return;
    }

    const delivery = deliveryOptions.find(d => d.id === selectedDelivery.id);
    const total = subtotal + delivery.fee;

    const finalData = {
      ...values,
      selectedDelivery,
      selectedPayment: selectedDelivery.id === 'quick' ? selectedPayment : 'cash',
      subtotal,
      deliveryFee: delivery.fee,
      total,
    };

    if (step === 1) {
      setsumbitData(finalData);
      setStep(2);
    } else {
      refRBSheet.current?.open();
    }
  };

  const handleUpdate = () => {
    setStep(1);
  };

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        address: '',
        phone: '',
        pin: '',
        card: '',
        expiry: '',
        cvv: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
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
            {step === 1 ? (
              <View style={styles.form}>
                <View style={styles.subform}>
                  <View style={styles.underline}>
                    <Text color="black">Personal Information</Text>
                  </View>

                  {inputFields.map(({ key, placeholder }) => (
                    <View key={key}>
                      <View style={styles.subunderline}>
                        <TextInput
                          placeholder={placeholder}
                          onChangeText={handleChange(key)}
                          onBlur={handleBlur(key)}
                          value={values[key]}
                        />
                      </View>
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
                      key={option?.id}
                      style={styles.container}
                      onPress={() => setSelectedDelivery(option)}
                    >
                      <View style={styles.row}>
                        <Text
                          color={
                            selectedDelivery?.id === option?.id
                              ? '#007537'
                              : 'black'
                          }
                        >
                          {option.label}
                        </Text>
                        {selectedDelivery?.id === option?.id && (
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

                {selectedDelivery?.id === 'quick' ? (
                  <View style={styles.subform}>
                    <View style={styles.underline}>
                      <Text color="black">Payment Method</Text>
                    </View>

                    {paymentOptions.map(option => (
                      <Pressable
                        key={option?.id}
                        style={[
                          styles.subunderline,
                          {
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginVertical: verticalScale(12),
                          },
                        ]}
                        onPress={() => setSelectedPayment(option)}
                      >
                        <Text
                          color={
                            selectedPayment?.id === option?.id
                              ? '#007537'
                              : 'black'
                          }
                        >
                          {option?.label}
                        </Text>
                        {selectedPayment?.id === option?.id && (
                          <Feather name="check" size={20} color="#007537" />
                        )}
                      </Pressable>
                    ))}
                  </View>
                ) : null}
              </View>
            ) : (
              <View style={styles.form}>
                <View style={styles.subform}>
                  <View style={styles.underline}>
                    <Text color="black">Banking Information</Text>
                  </View>
                  <View style={styles.subunderline}>
                    <TextInput
                      placeholder="PIN"
                      onChangeText={handleChange('pin')}
                      onBlur={handleBlur('pin')}
                      value={values.pin}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.subunderline}>
                    <TextInput
                      placeholder="Card Name"
                      onChangeText={handleChange('card')}
                      onBlur={handleBlur('card')}
                      value={values.card}
                    />
                  </View>
                  <View style={styles.subunderline}>
                    <TextInput
                      placeholder="Expired Date (MM/YY)"
                      onChangeText={handleChange('expiry')}
                      onBlur={handleBlur('expiry')}
                      value={values.expiry}
                    />
                  </View>
                  <View style={styles.subunderline3}>
                    <TextInput
                      placeholder="CVV"
                      onChangeText={handleChange('cvv')}
                      onBlur={handleBlur('cvv')}
                      value={values.cvv}
                      secureTextEntry={true}
                      keyboardType="numeric"
                    />
                    <Feather
                      name="info"
                      size={20}
                      color="#7D7B7B"
                      style={styles.icon}
                    />
                  </View>
                </View>
                <View style={styles.subform}>
                  <View style={styles.underline2}>
                    <Text color="black">Personal Information</Text>
                    <Pressable onPress={() => handleUpdate()}>
                      <Text color="#7D7B7B">edit</Text>
                    </Pressable>
                  </View>
                  <View style={styles.review}>
                    <Text color="#7D7B7B" marginV={8}>
                      {submitData.name}
                    </Text>
                    <Text color="#7D7B7B" marginV={8}>
                      {submitData.email}
                    </Text>
                    <Text color="#7D7B7B" marginV={8}>
                      {submitData.address}
                    </Text>
                    <Text color="#7D7B7B" marginV={8}>
                      {submitData.phone}
                    </Text>
                  </View>
                </View>

                <View style={styles.subform}>
                  <View style={styles.underline2}>
                    <Text color="black">Delivery Method</Text>
                    <Pressable>
                      <Text color="#7D7B7B">edit</Text>
                    </Pressable>
                  </View>
                  <View style={styles.review}>
                    <Text color="#7D7B7B" marginV={8}>
                      {submitData.selectedDelivery.label}
                    </Text>
                    <Text color="#7D7B7B" marginV={8}>
                      {submitData.selectedDelivery.placeholder}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </ScrollView>

          <View style={styles.fixed}>
            <View style={styles.pay}>
              <Text color="#858585">SubTotal</Text>
              <Text color="black">${subtotal}</Text>
            </View>
            <View style={styles.pay}>
              <Text color="#858585">Delivery Fee</Text>
              <Text color="black">
                $
                {deliveryOptions.find(d => d.id === selectedDelivery?.id)
                  ?.fee || 0}
              </Text>
            </View>
            <View style={styles.pay}>
              <Text color="#858585">Total</Text>
              <Text color="black">
                $
                {subtotal +
                  (deliveryOptions.find(d => d.id === selectedDelivery?.id)
                    ?.fee || 0)}
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
                  CONTINUE
                </Text>
              </Pressable>
            </View>
          </View>
          <RBSheet
            ref={refRBSheet}
            customStyles={{
              wrapper: {
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
              },
              container: {
                height: verticalScale(173),
                width: scale(320),
                marginHorizontal: scale(15),
                borderRadius: moderateScale(20),

                marginVertical: verticalScale(20),
              },
              draggableIcon: {
                backgroundColor: '#000',
              },
            }}
            customModalProps={{
              animationType: 'slide',
              statusBarTranslucent: true,
            }}
            customAvoidingViewProps={{
              enabled: false,
            }}
          >
            <View style={styles.modal}>
              <Text size={16} color="black">
                Confirm Checkout?
              </Text>

              <View style={styles.buttoncontainer2}>
                <Pressable
                  style={styles.button2}
                  onPress={() => {
                    navigation.navigate('Guest', {
                      screen: 'notification',
                      params: { submitData,selectedProducts },
                    });
                  }}
                >
                  <Text marginH={12} size={16} alignment="center" color="white">
                    Yes
                  </Text>
                </Pressable>
              </View>
              <Pressable
                style={styles.underline}
                onPress={() => refRBSheet.current?.close()}
              >
                <Text size={16} color="black">
                  Cancel
                </Text>
              </Pressable>
            </View>
          </RBSheet>
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
  subunderline3: {
    borderBottomWidth: 0.5,
    borderColor: '#ABABAB',
    flexDirection: 'row',
    alignItems: 'center',
    width: scale(187),
    justifyContent: 'space-between',
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
  review: {
    padding: moderateScale(10),
  },
  underline2: {
    borderBottomWidth: 0.5,
    borderColor: '#221F1F',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttoncontainer2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: verticalScale(30),
    width: scale(285),
  },
  button2: {
    backgroundColor: '#007537',
    width: '100%',
    height: verticalScale(50),
    borderRadius: moderateScale(12),
    justifyContent: 'center',

    alignItems: 'center',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: verticalScale(20),
  },
});
