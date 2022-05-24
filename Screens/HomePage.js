import {
    StyleSheet,
    Button,
    TouchableOpacity,
    Text,
    Image,
    View,
  } from "react-native";
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  import styles from "../Styles"

  function Texting(){
      return(
        <View 
        style = {{justifyContent: "center",
        alignItems: "center"}}>
        <Text> Hello</Text>
        </View>
      );
  }
  export function HomePage(){
    const Tab = createBottomTabNavigator();
      return(
        <Tab.Navigator
        
        //background color of the each screen !!! PS: Screen above the tab bar
        sceneContainerStyle={{backgroundColor: '#fff'}}
        
        screenOptions={{
            tabBarStyle: {
                //background color of the tab bar --> BROO setting the colors took me soo long
                //not enough documentation on this ho
                backgroundColor: '#D9D9D9',
            },
            
            //color when the tab is pressed
            tabBarActiveTintColor: '#e91e63',
            headerShown: false,
            tabBarInactiveTintColor: '#5F5F5F'
        }}
        >
            <Tab.Screen
            name = 'Submit Points'
            component={Texting}
            options = {{
                tabBarLabel: "Home",
                tabBarIcon: ({color, size}) => {
                    <Image
                    //style = {styles.colors}
                    resizeMode="contain"
                    source = {require("../images/Login/Home.png")}>
                        
                    </Image>


                } 
            }}
            />
            <Tab.Screen 
                name = "Events"
                component={Texting}
                    options = {{
                tabBarLabel: "Events",
                tabBarIcon: ({color, size}) => {
                    <Image
                    style = {styles.navigation_item}
                    source = {require("../images/Login/Calendar.png")}></Image>


                }}}
                >
            </Tab.Screen>

            <Tab.Screen 
                name = "People"
                component={Texting}
                    options = {{
                tabBarLabel: "People",
                tabBarIcon: ({color, size}) => {
                    <Image
                    style = {styles.navigation_item}
                    source = {require("../images/Login/group1.png")}></Image>

                    
                }}}
                >
            </Tab.Screen>

            <Tab.Screen 
                name = "Points"
                component={Texting}
                    options = {{
                tabBarLabel: "Points",
                tabBarIcon: ({color, size}) => {
                    <Image
                    style = {styles.navigation_item}
                    source = {require("../images/Login/Tick.jpg")}></Image>


                }}}
                >
            </Tab.Screen>

           

        </Tab.Navigator>
      );
  }