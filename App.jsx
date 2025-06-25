/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { store } from './src/app/store';
import AllProducts from './src/components/AllProducts';
import { Provider } from 'react-redux';
import SpecificProduct from './src/components/SpecificProduct';
import AddNewProduct from './src/components/AddNewProduct';

import UpdateProduct from './src/components/updateProduct';
import DeleteProduct from './src/components/DeleteProduct';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { fonts } from './src/utils/font';
import Feather from '@react-native-vector-icons/feather';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Stack.Navigator initialRouteName="AllProducts">
          <Stack.Screen
            name="AllProducts"
            options={{
              headerStyle: { backgroundColor: '#D1D8BE' },
              headerTitleStyle: { fontFamily: fonts.bold, color: '#075B5E' },
              headerTitle: 'Discover Your Plant',
               headerRight: () => (
                <Feather name="plus" color="#075B5E" size={20} />
              ),
             
            }}
            component={AllProducts}
          />
          <Stack.Screen
            name="SpecificProduct"
            options={{
              headerStyle: { backgroundColor: '#D1D8BE' },
              headerTitleStyle: { fontFamily: fonts.bold, color: '#075B5E' },
               headerRight: () => (
                <Feather name="heart" color="#075B5E" size={20} />
              ),
            }}
            component={SpecificProduct}
          />
          <Stack.Screen name="AddNewProduct" component={AddNewProduct} />
          <Stack.Screen name="UpdateProduct" component={UpdateProduct} />
          <Stack.Screen name="DeleteProduct" component={DeleteProduct} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AEC8A4',
  },
});

export default App;
