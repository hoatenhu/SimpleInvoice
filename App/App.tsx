import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CreateInvoiceScreen, ListInvoicesScreen} from './Container';
import {Image} from 'react-native';

const AppTab = createBottomTabNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <AppTab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
        }}
        initialRouteName={'CreateInvoiceScreen'}>
        <AppTab.Screen
          name="CreateInvoiceScreen"
          component={CreateInvoiceScreen}
          options={{
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
