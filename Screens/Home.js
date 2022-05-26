import { ProfCircle, PgnImage } from "./Tabs";
import styles from "../Styles";
import {
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  Image,
  View,
} from "react-native";

function SubmitPoints(){
    return(
        <View style = {[styles.submitBox, styles.burntOrange]}>
            <Button
            color={'white'}
            title = 'Submit Points!'>
                {/* <Text>Submit Points!</Text> */}
            </Button>
        </View>
    );
}

function PointBox(props) {
  return (
    <View style = {styles.pointBox}>
      <Text style = {{fontWeight: 'bold', fontFamily: 'Kailasa'}}>{props.title}</Text>
      <Text style = {{fontWeight: 'bold'}}>{props.score} / 6</Text>


    </View>
  );
}

export function HomePage() {
  return (
    <View>
      <View
        style={{
          paddingTop: "17%",
          
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <ProfCircle name = "Akin" pos = 'Active' />
        <PgnImage />
      </View>

        <View style = {{top: '30%'}}>
        {/* View per Row */}
        <View
          style={styles.box}
        >
          <PointBox title = "Professional" score = '0'/>
          
        </View>

        <View style ={styles.box}>
          <PointBox title = "Social" score = '2'/>
        </View>

        <View
          style={styles.box}
          >
            <PointBox title = "Philanthropy" score = "5"/>
          </View>
        <SubmitPoints/>
      </View>
    </View>
  );
}
