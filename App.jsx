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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from './src/screen/Search';


import Cart from './src/screen/cart';
import More from './src/screen/More';
import Checkout from './src/screen/Checkout';
import Notification from './src/screen/notification';
import Profile from './src/screen/Profile';
import Edit from './src/screen/Edit';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const BottomTabNavigation = ({ navigation }) => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'white',
          height: 100,
          width: 415,
          // elevation: 10,
          position: 'absolute',
        },
        tabBarActiveTintColor: '#007537',
        tabBarInactiveTintColor: 'black',
      }}
    >
      <BottomTab.Screen
        name="home"
        component={Guest}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: 'center', marginTop: 4 }}>
              <Feather name="home" color={color} size={size} />
              {focused && (
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: '#007537',
                    marginTop: 4,
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name="SEARCH"
        component={Search}
        options={{
          headerTitleAlign: 'center',
          headerShadowVisible: false,

          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: 'center', marginTop: 4 }}>
              <Feather name="search" color={color} size={size} />
              {focused && (
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: '#007537',
                    marginTop: 4,
                  }}
                />
              )}
            </View>
          ),
          headerLeft: () => (
            <View style={{ marginHorizontal: 18 }}>
              <Feather
                name="chevron-left"
                color="black"
                size={24}
                onPress={() =>
                  navigation.navigate('Guest', {
                    screen: 'home',
                  })
                }
              />
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name="notification"
        component={Notification}
        options={{
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTitle:'NOTIFICATION',

          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: 'center', marginTop: 4 }}>
              <Feather name="bell" color={color} size={size} />
              {focused && (
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: '#007537',
                    marginTop: 4,
                  }}
                />
              )}
            </View>
          ),
            headerLeft: () => (
            <View style={{ marginHorizontal: 18 }}>
              <Feather
                name="chevron-left"
                color="black"
                size={24}
                onPress={() =>
                  navigation.navigate('Guest', {
                    screen: 'home',
                  })
                }
              />
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name="profile"
        component={ProfileStack}
        options={{
         headerShown:false,

          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: 'center', marginTop: 4 }}>
              <Feather name="user" color={color} size={size} />
              {focused && (
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: '#007537',
                    marginTop: 4,
                  }}
                />
              )}
            </View>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const ProfileStack=()=>{
  return(
    <Stack.Navigator>
       <Stack.Screen name='profile'
      component={Profile}
      options={{
         headerTitle:'PROFILE',
         headerTitleAlign:'center',
         headerShadowVisible:false,
      }}/>
      <Stack.Screen name='Edit'
      component={Edit}
         options={{
         headerTitle:'EDIT INFORMATION',
         headerTitleAlign:'center',
         headerShadowVisible:false,
      }}/>
    </Stack.Navigator>
  )
}

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
        component={BottomTabNavigation}
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
      <Stack.Screen
        name="cart"
        component={Cart}
        options={({ navigation }) => ({
          headerTitleAlign: 'center',
          headerShadowVisible: false,
           headerTitle:'CART',

          headerLeft: () => (
            <Feather
              name="chevron-left"
              color="black"
              size={24}
              onPress={() => navigation.goBack()}
            />
          ),
       
       
        })}
       
      />
       <Stack.Screen
       name='More'
       component={More}
       options={({navigation})=>({
         headerTitleAlign: 'center',
         headerTitle:'PLANTS',
          headerShadowVisible: false,
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
          <Stack.Screen
       name='Checkout'
       component={Checkout}
       options={({navigation})=>({
         headerTitleAlign: 'center',
         headerTitle:'Checkout',
          headerShadowVisible: false,
             headerLeft: () => (
            <Feather
              name="chevron-left"
              color="black"
              size={24}
              onPress={() => navigation.goBack()}
            />
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
