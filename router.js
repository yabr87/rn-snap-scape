import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import RegisterScreen from './screens/auth/RegisterScreen';
import LoginScreen from './screens/auth/LoginScreen';

import PostsScreen from './screens/mainScrens/PostsScreen';
import CreatePostsScreen from './screens/mainScrens/CreatePostsScreen';
import ProfileScreen from './screens/mainScrens/ProfileScreen';

import NavPostsIcon from './components/icons/NavPostsIcon';
import NavAddIcon from './components/icons/NavAddIcon';
import NavProfileIcon from './components/icons/NavProfileIcon';

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

export const router = isAuthenticated => {
  if (!isAuthenticated) {
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
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavPostsIcon name="appstore-o" size={24} focused={focused} />
          ),
          headerStyle: { borderBottomWidth: 1, borderBottomColor: '#eee' },
        }}
      />
      <MainTab.Screen
        name="Create Posts"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavAddIcon name="plus" size={24} focused={focused} />
          ),
          headerStyle: { borderBottomWidth: 1, borderBottomColor: '#eee' },
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavProfileIcon name="user" size={24} focused={focused} />
          ),
          headerShown: false,
        }}
      />
    </MainTab.Navigator>
  );
};
