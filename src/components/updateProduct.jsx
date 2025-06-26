import {
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
  Pressable,
  ImageBackground,
} from 'react-native';
import React from 'react';
import { useUpdateProductMutation } from '../app/service/dummyData';
import { useState } from 'react';
import { fonts } from '../utils/font';
import { Picker } from '@react-native-picker/picker';

import { colors } from '../utils/color/color';

const UpdateProduct = ({ route,navigation }) => {
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

      const res=await updateProduct(updatedProductData).unwrap();
      console.log(res);
      
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
          <Text style={styles.title}>Want to Change Something?</Text>

          <TextInput
            style={styles.input}
            placeholder="Name of your plant"
            placeholderTextColor="#075B5E"
            value={form.name}
            onChangeText={text => handleChange('name', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Image Uri"
            placeholderTextColor="#075B5E"
            value={form.image}
            onChangeText={text => handleChange('image', text)}
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
          <Pressable
            style={styles.button}
            disabled={isLoading}
            onPress={handleUpdateProduct}
          >
            <Text style={styles.buttonText}>Change It</Text>
          </Pressable>
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
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: fonts.bold,
    color: '#075B5E',
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderColor: colors.dark,
    borderWidth: 2,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerWrapper: {
    borderColor: colors.dark,
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
    backgroundColor: 'white',
    flex: 1,
  },

  picker: {
    color: '#075B5E',
  },
  button: {
    backgroundColor: colors.dark,
    width: 327,
    height: 60,
    borderRadius: 12,
    marginHorizontal: 18,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: fonts.bold,
    fontSize: 20,
    marginVertical: 15,
  },
  bg: {
    flex: 1,
  },
});
