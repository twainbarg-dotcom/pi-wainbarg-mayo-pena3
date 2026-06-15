import { Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import {vectorItems} from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';


import Home from "../screens/Home";
import Profile from "../screens/Profile";

import HomeStack from "./HomeStack";

import NuevosPosts from "../screens/NuevosPost";
const Tab = createBottomTabNavigator();
function HomeMenu (){
    return(
        
     <Tab.Navigator>
        <Tab.Screen name="Home" component={ HomeStack } options={ { headerShown: false, tabBarIcon: () => <AntDesign name="home" size={24} color="black" /> } }/>
        <Tab.Screen name="Profile" component={ Profile } options={ { headerShown: false }, { tabBarIcon: () => <AntDesign name="profile" size={24} color="black" /> }}/>
        
        <Tab.Screen name="Nuevos Posts" component={ NuevosPosts } options={ { headerShown: false }, { tabBarIcon: () => <AntDesign name="plus" size={24} color="black" /> }}/>
     </Tab.Navigator>
   
    )
}

export default HomeMenu