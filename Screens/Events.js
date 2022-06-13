import { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Text, Image, View, ScrollView, } from "react-native";
import globalStyles from "../Styles";
import { TopBar } from "./Tabs";
import { db } from "../Firebase"

// After pulling data, need to sort everything here based on the date and time

function EventImage(props) {
  return (
    <View>
      <View style={styles.iconCon}>
        <Image
          source={props.icon}
          resizeMode="contain"
          style={styles.eventImageIcon}
        />
      </View>
    </View>
  );
}
function Event(props) {
  const date = props.month + "/" + props.day;
  var icon;
  if (props.type === "Philanthropy") {
    icon = require("../images/philanthropy.png");
  }
  else if (props.type === "Professional") {
    icon = require("../images/professional.png");
  }
  else if (props.type === "Social") {
    icon = require("../images/social.png");
  }
  else {
    //Uncaught error
  }
  var time;
  if (!(props.time === "")) {
    time = "@" + props.time;
  } else {
    time = "";
  }
  return (
    <View style={[globalStyles.cardContainer, styles.eventCard, globalStyles.cardAlign]}>
      <EventImage icon={icon} />
      <View style={styles.eventText}>
        <Text style={globalStyles.smallSemiBoldText}>{props.title}</Text>
      </View>
      <View>
        <Text style={[globalStyles.smallSemiBoldText, styles.date]}>{date}</Text>
        <Text style={globalStyles.smallBoldText}>{time}</Text>
      </View>
    </View>
  );
}
export function EventSection(props) {
  const events = props.events;
  var noEvents = false;
  const eventsList = events.map((event) =>
    <Event key={event.title} title={event.title} month={event.month} day={event.day} time={event.time} type={event.type}
      completed={event.completed} />
  )
  if (eventsList.length == 0) {
    noEvents = true;
  }
  return (
    <View style={styles.eventSection}>
      <Text style={[globalStyles.smallBoldText, styles.eventTime]}>{props.time}</Text>
      <View>
        {eventsList}
        {noEvents &&
          <Text style={[globalStyles.smallBoldText, styles.noEventsText]}>No Events</Text>
        }
      </View>
    </View>
  )
}

export function EventsPage() {
  const [allEvents, setAllEvents] = useState([]);
  useEffect(() => {
    console.log("(Events) Use Effect called for events read")
    var tempEvents = [];
    db.collection("events")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          var data = doc.data();
          console.log("(Events) Read event " + doc.id);
          // Update Events object
          tempEvents.push(data);
        });
        setAllEvents(tempEvents);
      })
      .catch((error) => {
        console.log("(firebase) Error getting events documents: ", error);
      });
  }, [])
  return (
    <View style={styles.eventScreen}>
      <ScrollView style={globalStyles.scroll}>
        <View style={globalStyles.scrollView}>
          <EventSection time="Today" events={allEvents} />
          <EventSection time="Tomorrow" events={allEvents} />
          <EventSection time="Future" events={allEvents} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  eventScreen: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between"
  },
  eventSection: {
    width: "80%"
  },
  eventCard: {
    marginBottom: 10
  },
  eventTime: {
    marginBottom: 10
  },
  eventImageBackground: {
    position: "absolute",
    width: 50,
    height: 50
  },
  eventImageIcon: {
    width: 50,
    height: 50
  },
  iconCon: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  date: {
    textAlign: "right"
  },
  eventText: {
    width: "60%"
  },
  noEventsText: {
    textAlign: "center",
    marginBottom: 10
  }
})
