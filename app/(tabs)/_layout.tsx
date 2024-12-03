import React from 'react';
import { Platform } from 'react-native';
import { Tabs, useSegments } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import Colors from '@/constants/Colors';
import { Colors as Colr } from '@/constants/Colors';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';

const TabLayout = () => {
  const colorScheme = useColorScheme();
  const segments = useSegments();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colr[colorScheme ?? 'light'].tint,
          tabBarInactiveBackgroundColor: Colors.background,
          tabBarActiveBackgroundColor: Colors.background,
          tabBarBackground: TabBarBackground,
          tabBarButton: HapticTab,
          tabBarStyle: Platform.select({
            ios: {
              position: 'absolute', // Transparent background for iOS
            },
            default: { backgroundColor: Colors.background },
          }),
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerShadowVisible: false,
          headerShown: false,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="updates"
          options={{
            title: 'Updates',
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="update" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="calls"
          options={{
            title: 'Calls',
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="phone-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="communities"
          options={{
            title: 'Communities',
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="people" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="chats"
          options={{
            title: 'Chats',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="chatbubbles" size={size} color={color} />
            ),
            tabBarStyle: {
              backgroundColor: Colors.background,
              display: segments[2] === '[id]' ? 'none' : 'flex',
            },
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ size, color }) => <Ionicons name="cog" size={size} color={color} />,
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
};

export default TabLayout;
