import {
  View,

  Button,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import React from 'react';
import { useAddNewProductMutation } from '../app/service/dummyData';
import { useState } from 'react';
import { fonts } from '../utils/font';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import Text from '../UI/SpText';

import { colors } from '../utils/color/color';
import { useDispatch } from 'react-redux';
import { moderateScale,scale,verticalScale } from 'react-native-size-matters';


const AddNewProduct = ({ navigation }) => {
  const dispatch = useDispatch();
  const [addNewProduct, { data, isError, isLoading }] =
    useAddNewProductMutation();
  const [form, setForm] = useState({
    name: '',
    bio: '',
    price: '',
    category: '',
    size: '',
    image: '',
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };
  const CLOUDINARY_URL =
    'https://api.cloudinary.com/v1_1/dqxayznlk/image/upload';
  const CLOUDINARY_UPLOAD_PRESET = 'ml_default';

  const handleImagePick = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
      });

      if (result.didCancel) {
        console.log('User cancelled image picker');
      } else if (result.errorCode) {
        console.log('Image Picker Error:', result.errorMessage);
      } else {
        const asset = result.assets[0];
        const formData = new FormData();

        formData.append('file', {
          uri: asset.uri,
          type: asset.type,
          name: asset.fileName || 'upload.jpg',
        });

        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        const response = await fetch(CLOUDINARY_URL, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (data.secure_url) {
          setForm({ ...form, image: data.secure_url });
          alert('Image uploaded successfully!');
        } else {
          throw new Error(data.error?.message || 'Upload failed');
        }
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Failed to upload image');
    }
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
        image: form.image,
      };

      await addNewProduct(newProductData).unwrap();
      // dispatch(fetchProduct());

      alert('Product added!');
      setForm({
        name: '',
        bio: '',
        price: '',
        category: '',
        size: '',
        image: '',
      });
      navigation.goBack();
    } catch (err) {
      console.error('Cannot add new product:', err);
      alert('Failed to add product');
    }
  };

  if (isError) {
    return <Text weight={bold} size={16}>OH NO WE GOT AN ERROR</Text>;
  }

  if (isLoading) {
 
    <SafeAreaView style={{ flex: 1,
    justifyContent: 'center',}}>
      <ActivityIndicator />
      <ActivityIndicator size="large" color="#00ff00" />
    </SafeAreaView>

    
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
          <Text style={styles.title} weight='bold' size={24} color={colors.dark} alignment='center' marginV={4}>Add a plant to your wishList</Text>
           <TouchableOpacity onPress={handleImagePick} style={styles.imagePickerButton}>
            {form.image ? (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  source={{ uri: form.image }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    marginVertical: 10,
                  }}
                />
              </View>
            ) : (
              <Text weight='bold' size={20} alignment='center' marginV={15}>Pick an Image</Text>
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
            onPress={handleAddProduct}
          >
            <Text weight='bold' size={20} alignment='center' marginV={15}>Add A PLant</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default AddNewProduct;

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
