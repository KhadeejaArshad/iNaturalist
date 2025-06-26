import {
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
import React from 'react';
import { useAddNewProductMutation } from '../app/service/dummyData';
import { useState } from 'react';
import { fonts } from '../utils/font';
import { Picker } from '@react-native-picker/picker';

import { colors } from '../utils/color/color';

const AddNewProduct = ({navigation}) => {
  const [addNewProduct, { data, isError, isLoading }] =
    useAddNewProductMutation();
  const [form, setForm] = useState({
    name: '',
    bio: '',
    price: '',
    category: '',
    size: '',
    image:''
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleAddProduct = async () => {
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
      const newProductData = {
        name: form.name,
        price: parseFloat(form.price),
        size: form.size,
        category: form.category,
        bio: form.bio,
        image:form.image,
      };

      await addNewProduct(newProductData).unwrap();
      alert('Product added!');
      setForm({ name: '', bio: '', price: '', category: '', size: '' , image:''});
      navigation.goBack();
    } catch (err) {
      console.error('Cannot add new product:', err);
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
      <Text style={styles.title}>Add a plant to your wishList</Text>

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
    <View style={{flexDirection:'row',gap:10}}>
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
          <Picker.Item label="Flowering Plants" value="Flowering Plants" />
          <Picker.Item label="Succulents" value="Succulents" />
          <Picker.Item label="Herbs" value="Herbs" />
          <Picker.Item label="Cacti" value="Cacti" />
          <Picker.Item label="Medicinal Plants" value="Medicinal Plants" />
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
    <Pressable style={styles.button} disabled={isLoading} onPress={handleAddProduct}>
     <Text style={styles.buttonText}>
      Add A PLant
      </Text>

    </Pressable>

      
      <Text>{data?.name}</Text>
    </ScrollView>
  );
};

export default AddNewProduct;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
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
    backgroundColor: '#E7EFC7',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerWrapper: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
    backgroundColor: '#E7EFC7',
    flex:1
  },

  picker: {
    
    color: '#075B5E',
  },
  button:{
    backgroundColor:colors.dark,
    width:327,
    height:60,
    borderRadius:12,
    marginHorizontal:18,
    marginVertical:10
   
  },
  buttonText:{
    color:'white',
    textAlign:'center',
    fontFamily:fonts.bold,
    fontSize:20,
    marginVertical:15
  }

});
