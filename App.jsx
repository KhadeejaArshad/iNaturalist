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
import { Provider, useDispatch, useSelector } from 'react-redux';
import SpecificProduct from './src/components/SpecificProduct';
import AddNewProduct from './src/components/AddNewProduct';

import UpdateProduct from './src/components/updateProduct';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { fonts } from './src/utils/font';
import Feather from '@react-native-vector-icons/feather';
import { colors } from './src/utils/color/color';
import Login from './src/components/Login';
import SignUp from './src/screen/SignUp';
import LoginScreen from './src/screen/LoginScreen';
import { logout } from './src/app/service/authSlice';
import Guest from './src/screen/Guest';
import Detail from './src/screen/Detail';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Guest"
        component={Guest}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={Detail}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Feather
              name="chevron-left"
              color="black"
              size={24}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => (
            <Feather name="shopping-cart" color="black" size={24} />
          ),
        })}
      />
    </Stack.Navigator>
  );
};
const AuthenticatedStack = () => {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AllProducts"
        component={AllProducts}
        options={({ navigation }) => ({
          title: 'Discover Your Plant',
          headerStyle: { backgroundColor: colors.header },
          headerTitleStyle: { fontFamily: fonts.bold, color: colors.dark },
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <Feather
                name="plus"
                color={colors.dark}
                size={26}
                onPress={() => navigation.navigate('AddNewProduct')}
                style={{ marginRight: 16 }}
              />
              <Feather
                name="log-out"
                color={colors.dark}
                size={26}
                onPress={() => dispatch(logout())}
                style={{ marginRight: 16 }}
              />
            </View>
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
  );
};

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}

function RootNavigator() {
  const loggedIn = useSelector(state => !!state.auth.token);
  return loggedIn ? <AuthenticatedStack /> : <AuthStack />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
