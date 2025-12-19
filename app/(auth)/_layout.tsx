
import { Ionicons }from '@expo/vector-icons'
import {Tabs} from 'expo-router'
import React from 'react'

const Layout = () => {
  return (
    <Tabs>
        <Tabs.Screen name='index' options={{
            title: 'Home',
            tabBarIcon: ({size, color}) => (
                <Ionicons name="home-outline" size={size} color={color} />
            ),
        }}
        />

    </Tabs>
  )
}

export default Layout