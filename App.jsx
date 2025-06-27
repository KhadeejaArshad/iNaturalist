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

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { fonts } from './src/utils/font';
import Feather from '@react-native-vector-icons/feather';
import { colors } from './src/utils/color/color';

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
            component={AllProducts}
            options={({ navigation }) => ({
              title: 'Discover Your Plant',
              headerStyle: { backgroundColor:colors.header },
              headerTitleStyle: { fontFamily: fonts.bold, color: colors.dark },
              headerRight: () => (
                <Feather
                  name="plus"
                  color={colors.dark}
                  size={26}
                  onPress={() => navigation.navigate('AddNewProduct')}
                  style={{ marginRight: 16 }}
                />
              ),
            })}
          />

          <Stack.Screen
            name="SpecificProduct"
            options={{
              headerStyle: { backgroundColor: colors.header },
              headerTitleStyle: { fontFamily: fonts.bold, color: colors.dark },
              headerRight: () => (
                <Feather name="heart" color={colors.dark} size={20} />
              ),
            }}
            component={SpecificProduct}
          />
          <Stack.Screen
            name="AddNewProduct"
            component={AddNewProduct}
            options={{
              headerStyle: { backgroundColor: colors.header },
              headerTitleStyle: { fontFamily: fonts.bold, color: colors.dark },
            }}
          />
          <Stack.Screen
            name="UpdateProduct"
            component={UpdateProduct}
            options={{
              headerStyle: { backgroundColor: colors.header },
              headerTitleStyle: { fontFamily: fonts.bold, color: colors.dark },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
});

export default App;
