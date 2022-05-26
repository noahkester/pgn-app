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
        <View style = {styles.submitBox}>
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
    <View style={styles.pointBoxes}>
        {/* space between text and box */}
      <Text
      style = {{padding: '5%',}}> {props.title}</Text>

      <Text
        style={{

          fontWeight: "bold",
          backgroundColor: props.color,
          padding: "7%",
          borderRadius: "10%",
          overflow: "hidden",
        }}
      >
        {" "}
        {props.score} / 6
      </Text>
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
        <ProfCircle />
        <PgnImage />
      </View>

        {/* View per Row */}
      <View
        style={styles.box}
      >
        <PointBox title="Professional" color="#FFC107" score="0" />
      </View>
      <View
        style={styles.box}
      >
        <PointBox title="Social" color="#DC3545" score="5" />
      </View>

      <View
        style={styles.box}
      >
        <PointBox title="Philanthropy" color="#198754" score="3" />
      </View>
      <SubmitPoints/>
    </View>
  );
}
