import { View, Text, Button } from 'react-native';
import React from 'react';
import { useUpdateProductMutation } from '../app/service/dummyData';

const UpdateProduct = ({ productId }) => {
  const [updateProduct, { data, isError, isLoading }] = useUpdateProductMutation();

  const handleUpdateProduct = async () => {
    try {
      const updatedProductData = {
        title: 'Hello World!!!!',
        description: 'Updated description here',
      };

      await updateProduct({
        id: productId,
        updateProduct: updatedProductData,
      });
    } catch (err) {
      console.error('Cannot update product:', err);
    }
  };

  if (isError) {
    return <Text>Oh no! We got an error!</Text>;
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {data && (
        <>
          <Text>{data?.id}</Text>
          <Text>{data?.title}</Text>
          <Text>{data?.description}</Text>
        </>
      )}
      <Button onPress={handleUpdateProduct} disabled={isLoading} title="Update Product" />
    </View>
  );
};

export default UpdateProduct;
