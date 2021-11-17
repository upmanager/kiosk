import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import Home from "@screens/Home";
import Overview from "@screens/Overview";

const Stack = createStackNavigator();
const horizontalAnimation = {
  headerShown: false,
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};
export default function Navigation() {
  const _NAVIGATIONS = { Home, Overview }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {Object.entries(_NAVIGATIONS).map(([key, value]) => <Stack.Screen name={key} key={key} component={value} options={horizontalAnimation} />)}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
