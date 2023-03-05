import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CreateInvoiceScreen, ListInvoicesScreen} from './Container';
import {Icon} from 'react-native-elements';
import {Image} from 'react-native';

const AppTab = createBottomTabNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <AppTab.Navigator
        screenOptions={{
          // cardStyle: defaultCardStyle,
          // gestureEnabled: false,
          tabBarShowLabel: false,
          headerShown: false,
          // tabBarIcon: ({color, size}) => (
          //   <Ionicons name="home" color={color} size={size} />
          // ),
        }}
        initialRouteName={'CreateInvoiceScreen'}>
        <AppTab.Screen
          name="CreateInvoiceScreen"
          component={CreateInvoiceScreen}
          options={{
            // tabBarShowLabel: false,

            tabBarIcon: ({focused, color, size}) => (
              <Image
                style={{
                  height: 15,
                  width: 15,
                  tintColor: focused ? 'blue' : '#4d4d4ded',
                }}
                source={require('./Assets/create.png')}
              />
            ),
          }}
        />
        <AppTab.Screen
          name="ListInvoicesScreen"
          component={ListInvoicesScreen}
          options={{
            // tabBarShowLabel: false,
            tabBarIcon: ({focused, color, size}) => (
              <Image
                style={{
                  height: 15,
                  width: 15,
                  tintColor: focused ? 'blue' : '#4d4d4ded',
                }}
                source={require('./Assets/list.png')}
              />
            ),
          }}
        />
      </AppTab.Navigator>
    </NavigationContainer>
  );
};

export default App;
