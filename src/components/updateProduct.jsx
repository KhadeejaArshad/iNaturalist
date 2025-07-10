import {
  View,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import { useUpdateProductMutation } from '../app/service/dummyData';
import { useState } from 'react';
import { fonts } from '../utils/font';
import { Picker } from '@react-native-picker/picker';

import { colors } from '../utils/color/color';
import { useDispatch } from 'react-redux';
import { fetchProduct } from '../app/service/productSlice';
import { launchImageLibrary } from 'react-native-image-picker';
import { Image } from 'react-native';
import Text from '../UI/SpText';
import { verticalScale,scale,moderateScale } from 'react-native-size-matters';

const UpdateProduct = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [updateProduct, { data, isError, isLoading }] =
    useUpdateProductMutation();
  const product = route?.params?.product;
  console.log(product);

  const [form, setForm] = useState({
    name: product.name,
    bio: product.bio,
    price: product.price.toString(),
    category: product.category,
    size: product.size,
    image: product.image,
  });
  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleUpdateProduct = async () => {
    if (
      !form.name ||
      !form.bio ||
      !form.price ||
      !form.category ||
      !form.size ||
      !form.image
    ) {
      alert('Please fill in all fields.');
      return;
    }
    try {
      const updatedProductData = {
        _id: product._id,
        name: form.name,
        price: parseFloat(form.price),
        size: form.size,
        category: form.category,
        bio: form.bio,
        image: form.image,
      };

      const res = await updateProduct(updatedProductData).unwrap();
      dispatch(fetchProduct());

      setForm({
        name: form.name,
        price: parseFloat(form.price),
        size: form.size,
        category: form.category,
        bio: form.bio,
        image: form.image,
      });
      alert('Updated!');
      navigation.goBack();
    } catch (err) {
      console.error('Cannot update product:', err);
      alert('Failed to add product');
    }
  };

  if (isError) {
    return <Text>Oh no! We got an error!</Text>;
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  const handleImagePick = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.7,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const selectedImage = response.assets[0].uri;
          setForm({ ...form, image: selectedImage });
        }
      },
    );
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://images.pexels.com/photos/5942501/pexels-photo-5942501.jpeg',
        }}
        style={styles.bg}
        resizeMode="cover"
      >
        <View style={{ padding: 20 }}>
          <Text  weight='bold' size={24} color={colors.dark} alignment='center' marginV={4}>Want to Change Something?</Text>
           <TouchableOpacity
            onPress={handleImagePick}
            style={{ alignItems: 'center', marginVertical: 10 }}
          >
            {form.image ? (
              <Image
                source={{ uri: form.image }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 8,
                  marginBottom: 10,
                }}
              />
            ) : (
              <Text  weight='bold' size={20} alignment='center' marginV={15}>Pick an Image</Text>
            )}
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Name of your plant"
            placeholderTextColor="#075B5E"
            value={form.name}
            onChangeText={text => handleChange('name', text)}
          />
         
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description"
            placeholderTextColor="#075B5E"
            multiline
            numberOfLines={4}
            value={form.bio}
            onChangeText={text => handleChange('bio', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Price"
            keyboardType="numeric"
            placeholderTextColor="#075B5E"
            value={form.price}
            onChangeText={text => handleChange('price', text)}
          />
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={form.category}
                onValueChange={value => handleChange('category', value)}
                style={styles.picker}
                dropdownIconColor="#075B5E"
              >
                <Picker.Item label="Select Category" value="" />
                <Picker.Item label="Indoor Plants" value="Indoor Plants" />
                <Picker.Item label="Outdoor Plants" value="Outdoor Plants" />
                <Picker.Item
                  label="Flowering Plants"
                  value="Flowering Plants"
                />
                <Picker.Item label="Succulents" value="Succulents" />
                <Picker.Item label="Herbs" value="Herbs" />
                <Picker.Item label="Cacti" value="Cacti" />
                <Picker.Item
                  label="Medicinal Plants"
                  value="Medicinal Plants"
                />
                <Picker.Item
                  label="Air Purifying Plants"
                  value="Air Purifying Plants"
                />
              </Picker>
            </View>

            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={form.size}
                onValueChange={itemValue => handleChange('size', itemValue)}
                style={styles.picker}
                dropdownIconColor="#075B5E"
              >
                <Picker.Item label="Select Size" value="" />
                <Picker.Item label="Small" value="Small" />
                <Picker.Item label="Medium" value="Medium" />
                <Picker.Item label="Large" value="Large" />
              </Picker>
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            disabled={isLoading}
            onPress={handleUpdateProduct}
          >
            <Text  weight='bold' size={20} alignment='center' marginV={15}>Change It</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default UpdateProduct;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },

  input: {
    backgroundColor: 'white',
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(15),
    borderColor: colors.dark,
    borderWidth: scale(2),
    fontSize: moderateScale(16),
  },
  textArea: {
    height: verticalScale(100),
    textAlignVertical: 'top',
  },
  pickerWrapper: {
    borderColor: colors.dark,
    borderWidth: scale(2),
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(15),
    overflow: 'hidden',
    backgroundColor: 'white',
    flex: 1,
  },

  picker: {
    color: '#075B5E',
  },
  button: {
    backgroundColor: colors.dark,
    width: scale(319),
    height: verticalScale(50),
    borderRadius: moderateScale(12),
    
    marginVertical: verticalScale(10),
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: fonts.bold,
    fontSize: moderateScale(20),
    marginVertical: verticalScale(15),
  },
  bg: {
    flex: 1,
  },
});
