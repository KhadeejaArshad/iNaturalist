import { View, Text, Button } from 'react-native';
import React from 'react';
import { useAddNewProductMutation } from '../app/service/dummyData';

const AddNewProduct = () => {
  const [addNewProduct, { data, isError, isLoading }] = useAddNewProductMutation();

  const handleAddProduct = async () => {
    try {
      const newProductData = {
        id: 1,
        title: 'Hello World',
        description: 'hellllllllllllo',
      };
      await addNewProduct(newProductData);
    } catch (err) {
      console.error('Cannot add new product:', err);
    }
  };

  if (isError) {
    return <Text>Oh no! We got an error!</Text>;
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {data && (
        <>
          <Text>{data?.id}</Text>
          <Text>{data?.title}</Text>
          <Text>{data?.description}</Text>
        </>
      )}
      <Button onPress={handleAddProduct} disabled={isLoading} title="Add New Product" />
    </View>
  );
};

export default AddNewProduct;
