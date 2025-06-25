import {
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React from 'react';
import { useAddNewProductMutation } from '../app/service/dummyData';
import { useState } from 'react';

const AddNewProduct = () => {
  const [addNewProduct, { data, isError, isLoading }] =
    useAddNewProductMutation();
      const [form, setForm] = useState({
    name: '',
    bio: '',
    price: '',
    category: '',
    size:''
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };



const handleAddProduct = async () => {
  if (!form.name || !form.bio || !form.price || !form.category || !form.size) {
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
      image: 'https://t3.ftcdn.net/jpg/00/34/52/36/360_F_34523619_LJvYRSsm9aip6XsqgD5JtpNDIYERs0C4.jpg',
    };

    await addNewProduct(newProductData).unwrap();
    alert('Product added!');
    setForm({ name: '', bio: '', price: '', category: '', size: '' });
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
      <Text style={styles.title}>Add a New Plant</Text>

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
      <TextInput
        style={styles.input}
        placeholder="Category"
        placeholderTextColor="#075B5E"
         value={form.category}
        onChangeText={text => handleChange('category', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Size"
        placeholderTextColor="#075B5E"
         value={form.size}
        onChangeText={text => handleChange('size', text)}
     
      />

      <Button
        onPress={handleAddProduct}
        disabled={isLoading}
        title="Add New Plant"
      />
      <Text>{data?.name}</Text>
    </ScrollView>
  );
};

export default AddNewProduct;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F0F6E9',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#075B5E',
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
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
});
