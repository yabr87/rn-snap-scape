import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import RegisterScreen from './screens/auth/RegisterScreen';
import LoginScreen from './screens/auth/LoginScreen';

import PostsScreen from './screens/mainScrens/PostsScreen';
import CreatePostsScreen from './screens/mainScrens/CreatePostsScreen';
import ProfileScreen from './screens/mainScrens/ProfileScreen';

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

export const router = iaAuth => {
  if (!iaAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Register"
          component={RegisterScreen}
        />
      </AuthStack.Navigator>
    );
  }

  return (
    <MainTab.Navigator>
      <MainTab.Screen name="Posts" component={PostsScreen} />
      <MainTab.Screen name="Create Posts" component={CreatePostsScreen} />
      <MainTab.Screen name="Profile" component={ProfileScreen} />
    </MainTab.Navigator>
  );
};
