import {
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  Image,
  View,
  ScrollView,
} from "react-native";
import styles from "../Styles";
import { ProfCircle, PgnImage } from "./Tabs";

export function EventsPage() {
  return (
    <View>
      <View
        style={{
          paddingTop: "17%",
            paddingBottom: "5%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <ProfCircle name="Akin" pos="Active" />
        <PgnImage />
      </View>

      <ScrollView style = {styles.scrollList}>
        <Text style = {{fontWeight: 'bold', marginBottom: '5%'}}>Today</Text>
          <TouchableOpacity style = {[styles.scrollBox,]}title = 'ff'>
              
              <View style = {styles.pointBox}>
                <Text >Cold Cookie Profit Share</Text>
                <Text style = {{fontWeight: 'bold'}}> 4/6</Text>
              </View>
          </TouchableOpacity>

            {/* Line */}
          <View style = {{
              borderTopColor: '#C57035',
              borderTopWidth: 1,
              marginHorizontal: '10%',
              paddingBottom: '5%',
          }}/>

          <View style = {[styles.scrollBox]}>
              <View style = {styles.pointBox}>
                <Text >Cold Cookie Profit Share</Text>
                <Text style = {{fontWeight: 'bold'}}> 4/6</Text>
              </View>
          </View>

          <View style = {[styles.scrollBox]}>
              <View style = {styles.pointBox}>
                <Text >Cold Cookie Profit Share</Text>
                <Text style = {{fontWeight: 'bold'}}> 4/6</Text>
              </View>
          </View>

          <View style = {[styles.scrollBox]}>
              <View style = {styles.pointBox}>
                <Text >Cold Cookie Profit Share</Text>
                <Text style = {{fontWeight: 'bold'}}> 4/6</Text>
              </View>
          </View>
           
          <View style = {[styles.scrollBox]}>
              <View style = {styles.pointBox}>
                <Text >Cold Cookie Profit Share</Text>
                <Text style = {{fontWeight: 'bold'}}> 4/6</Text>
              </View>
          </View>
           
          <View style = {[styles.scrollBox]}>
              <View style = {styles.pointBox}>
                <Text >Cold Cookie Profit Share</Text>
                <Text style = {{fontWeight: 'bold'}}> 4/6</Text>
              </View>
          </View>
           
          <View style = {[styles.scrollBox]}>
              <View style = {styles.pointBox}>
                <Text >Cold Cookie Profit Share</Text>
                <Text style = {{fontWeight: 'bold'}}> 4/6</Text>
              </View>
          </View>
           
          <View style = {[styles.scrollBox]}>
              <View style = {styles.pointBox}>
                <Text >Cold Cookie Profit Share</Text>
                <Text style = {{fontWeight: 'bold'}}> 4/6</Text>
              </View>
          </View>
           
          <View style = {[styles.scrollBox]}>
              <View style = {styles.pointBox}>
                <Text >Cold Cookie Profit Share</Text>
                <Text style = {{fontWeight: 'bold'}}> 4/6</Text>
              </View>
          </View>
           
          <View style = {[styles.scrollBox]}>
              <View style = {styles.pointBox}>
                <Text >Cold Cookie Profit Share</Text>
                <Text style = {{fontWeight: 'bold'}}> 4/6</Text>
              </View>
          </View>
           
          <View style = {[styles.scrollBox]}>
              <View style = {styles.pointBox}>
                <Text >Cold Cookie Profit Share</Text>
                <Text style = {{fontWeight: 'bold'}}> 4/6</Text>
              </View>
          </View>
           
          <View style = {[styles.scrollBox]}>
              <View style = {styles.pointBox}>
                <Text >Cold Cookie Profit Share</Text>
                <Text style = {{fontWeight: 'bold'}}> 4/6</Text>
              </View>
          </View>
      </ScrollView>
    </View>
  );
}
