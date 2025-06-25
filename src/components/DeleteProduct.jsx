import { StyleSheet, Text, View,Button } from 'react-native'
import React from 'react'
import { useDeleteProductMutation } from '../app/service/dummyData'

const DeleteProduct = ({productId}) => {
    const [DeleteProduct,{data,isError,isLoading}]=useDeleteProductMutation();

      const handleDeleteProduct = async () => {
    try {
      
      await DeleteProduct(productId);
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
              <Text>{data?.title? `${data.title} deleted successfully` : ""}</Text>
            
            </>
          )}
          <Button onPress={handleDeleteProduct} disabled={isLoading} title="DELETPRODUCT " />
        </View>
  )
}

export default DeleteProduct

const styles = StyleSheet.create({})